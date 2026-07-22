export type RateLimitResult = {
  readonly allowed: boolean;
  readonly retryAfterSeconds: number;
};

type RateLimitOptions = {
  readonly limit: number;
  readonly windowMs: number;
  readonly maxBuckets?: number;
};

type RateLimiter = {
  readonly consume: (key: string, now?: number) => RateLimitResult;
};

type RateBucket = {
  readonly count: number;
  readonly resetAt: number;
};

export function createInMemoryRateLimiter(options: RateLimitOptions): RateLimiter {
  // This limits one server process only; separate serverless instances do not share
  // buckets. Expired buckets are removed on the next request, and the hard cap keeps
  // spoofed IP values from growing this process's memory without bound.
  const buckets = new Map<string, RateBucket>();
  const maxBuckets = options.maxBuckets ?? 10_000;

  return {
    consume: (key, now = Date.now()) => {
      for (const [bucketKey, candidate] of buckets) {
        if (now >= candidate.resetAt) {
          buckets.delete(bucketKey);
        }
      }

      const bucket = buckets.get(key);
      if (bucket === undefined) {
        if (buckets.size >= maxBuckets) {
          const oldestKey = buckets.keys().next().value as string | undefined;
          if (oldestKey !== undefined) {
            buckets.delete(oldestKey);
          }
        }
        buckets.set(key, { count: 1, resetAt: now + options.windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }

      if (bucket.count >= options.limit) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(
            1,
            Math.ceil((bucket.resetAt - now) / 1_000),
          ),
        };
      }

      buckets.set(key, { ...bucket, count: bucket.count + 1 });
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

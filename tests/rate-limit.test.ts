import { describe, expect, it } from "vitest";

import { createInMemoryRateLimiter } from "../lib/registration/rate-limit";

describe("in-memory registration rate limiter", () => {
  it("blocks an IP after the configured number of attempts", () => {
    // Given
    const limiter = createInMemoryRateLimiter({ limit: 2, windowMs: 1_000 });

    // When
    const first = limiter.consume("203.0.113.4", 1_000);
    const second = limiter.consume("203.0.113.4", 1_100);
    const third = limiter.consume("203.0.113.4", 1_200);

    // Then
    expect([first.allowed, second.allowed, third.allowed]).toEqual([
      true,
      true,
      false,
    ]);
  });

  it("starts a new bucket after the window expires", () => {
    // Given
    const limiter = createInMemoryRateLimiter({ limit: 1, windowMs: 1_000 });
    limiter.consume("203.0.113.4", 1_000);

    // When
    const result = limiter.consume("203.0.113.4", 2_001);

    // Then
    expect(result.allowed).toBe(true);
  });

  it("evicts the oldest bucket when the configured memory cap is reached", () => {
    // Given
    const limiter = createInMemoryRateLimiter({
      limit: 1,
      windowMs: 10_000,
      maxBuckets: 2,
    });
    limiter.consume("203.0.113.1", 1_000);
    limiter.consume("203.0.113.2", 1_100);

    // When
    limiter.consume("203.0.113.3", 1_200);
    const previouslyOldest = limiter.consume("203.0.113.1", 1_300);

    // Then
    expect(previouslyOldest.allowed).toBe(true);
  });

  it("removes expired buckets before applying the memory cap", () => {
    // Given
    const limiter = createInMemoryRateLimiter({
      limit: 1,
      windowMs: 100,
      maxBuckets: 1,
    });
    limiter.consume("203.0.113.1", 1_000);

    // When
    const nextAddress = limiter.consume("203.0.113.2", 1_101);
    const expiredAddress = limiter.consume("203.0.113.1", 1_102);

    // Then
    expect(nextAddress.allowed).toBe(true);
    expect(expiredAddress.allowed).toBe(true);
  });
});

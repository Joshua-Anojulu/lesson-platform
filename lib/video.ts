export type VideoSource = {
  readonly host: "youtube" | "vimeo";
  readonly id: string;
};

function assertNever(value: never): never {
  throw new TypeError(`Unsupported video source: ${JSON.stringify(value)}`);
}

export function getVideoEmbedUrl(video: VideoSource): URL {
  switch (video.host) {
    case "youtube":
      return new URL(
        `/embed/${encodeURIComponent(video.id)}`,
        "https://www.youtube-nocookie.com",
      );
    case "vimeo": {
      const url = new URL(
        `/video/${encodeURIComponent(video.id)}`,
        "https://player.vimeo.com",
      );
      url.searchParams.set("dnt", "1");
      return url;
    }
    default:
      return assertNever(video.host);
  }
}

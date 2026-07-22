import { describe, expect, it } from "vitest";

import { getVideoEmbedUrl } from "../lib/video";

describe("getVideoEmbedUrl", () => {
  it("uses YouTube's privacy-enhanced host without autoplay", () => {
    // Given
    const video = { host: "youtube", id: "M7lc1UVf-VE" } as const;

    // When
    const url = getVideoEmbedUrl(video);

    // Then
    expect(url.origin).toBe("https://www.youtube-nocookie.com");
    expect(url.searchParams.has("autoplay")).toBe(false);
  });

  it("enables Vimeo do-not-track without autoplay", () => {
    // Given
    const video = { host: "vimeo", id: "76979871" } as const;

    // When
    const url = getVideoEmbedUrl(video);

    // Then
    expect(url.origin).toBe("https://player.vimeo.com");
    expect(url.searchParams.get("dnt")).toBe("1");
    expect(url.searchParams.has("autoplay")).toBe(false);
  });
});

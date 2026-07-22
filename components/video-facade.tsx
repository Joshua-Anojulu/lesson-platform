"use client";

import { useState } from "react";

import type { TeacherVideo } from "@/content/teachers";
import { getVideoEmbedUrl } from "@/lib/video";

type VideoFacadeProps = {
  readonly teacherName: string;
  readonly teacherInitials: string;
  readonly video: TeacherVideo;
};

export function VideoFacade({
  teacherName,
  teacherInitials,
  video,
}: VideoFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="video-facade video-facade--loaded">
        <iframe
          src={getVideoEmbedUrl(video).toString()}
          title={`${video.title} from ${teacherName}`}
          allow="encrypted-media; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-facade">
      <div className="video-facade__poster" aria-hidden="true">
        <span>{teacherInitials}</span>
        <i />
      </div>
      <div className="video-facade__content">
        <span className="video-facade__duration">{video.duration}</span>
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
        <button
          className="action action--primary"
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Load ${video.host} video: ${video.title}`}
        >
          Load video
        </button>
        <small>
          Connects to {video.host === "youtube" ? "YouTube" : "Vimeo"} only
          after this click.
        </small>
      </div>
    </div>
  );
}

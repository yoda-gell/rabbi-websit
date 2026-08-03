"use client";

import { useState } from "react";

export default function VideoCard({
  youtubeId,
  title,
  duration,
  className = "",
}: {
  youtubeId: string;
  title: string;
  duration?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`נגן: ${title}`}
      className={`group relative block overflow-hidden rounded-2xl text-right ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-deep/10 transition-colors group-hover:bg-ink-deep/30" />
      {duration && (
        <span className="absolute right-3 top-3 rounded-lg bg-black/55 px-2 py-1 text-xs font-semibold">
          {duration}
        </span>
      )}
      <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber/90">
        <span
          className="h-0 w-0"
          style={{
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: "11px solid var(--color-ink)",
          }}
        />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/95 to-transparent px-3 pb-3 pt-9">
        <p className="font-heading text-sm font-semibold leading-tight text-text">{title}</p>
      </div>
    </button>
  );
}

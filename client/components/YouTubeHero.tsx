"use client";

import { useState } from "react";

export default function YouTubeHero({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="h-full w-full rounded-[28px]"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`נגן: ${title}`}
      className="group relative block h-full w-full overflow-hidden rounded-[28px]"
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-deep/25 transition-colors group-hover:bg-ink-deep/10" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber/95 md:h-16 md:w-16">
        <span
          className="mr-[-3px] h-0 w-0"
          style={{
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
            borderRight: "16px solid var(--color-ink)",
          }}
        />
      </span>
      <div className="pointer-events-none absolute bottom-4 right-4 max-w-[85%] truncate rounded-2xl bg-black/70 px-4 py-3 text-right font-heading text-sm font-semibold backdrop-blur">
        {title}
      </div>
    </button>
  );
}

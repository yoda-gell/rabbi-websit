"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import type { PublicVideo } from "@/lib/videos";

export default function ShiurimTabs({
  regular,
  short,
}: {
  regular: PublicVideo[];
  short: PublicVideo[];
}) {
  const [tab, setTab] = useState<"shorts" | "archive">("shorts");

  return (
    <>
      <div className="mt-6 flex max-w-sm gap-1 rounded-2xl bg-card-soft p-1">
        <button
          type="button"
          onClick={() => setTab("shorts")}
          className={`flex-1 rounded-xl py-3 font-heading text-sm font-bold ${
            tab === "shorts" ? "bg-amber text-ink" : "text-text-muted"
          }`}
        >
          לנוער
        </button>
        <button
          type="button"
          onClick={() => setTab("archive")}
          className={`flex-1 rounded-xl py-3 font-heading text-sm font-bold ${
            tab === "archive" ? "bg-amber text-ink" : "text-text-muted"
          }`}
        >
          ארכיון השיעורים
        </button>
      </div>

      {tab === "shorts" &&
        (short.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {short.map((video) => (
              <VideoCard
                key={video.id}
                youtubeId={video.youtubeId}
                title={video.title}
                className="aspect-[9/16]"
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-text-faint">
            אין עדיין שורטים כאן. בקרוב יתווספו סרטונים חדשים.
          </p>
        ))}

      {tab === "archive" &&
        (regular.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {regular.map((video) => (
              <VideoCard
                key={video.id}
                youtubeId={video.youtubeId}
                title={video.title}
                className="aspect-video"
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-text-faint">
            אין עדיין שיעורים בארכיון. בקרוב יתווסף תוכן חדש.
          </p>
        ))}
    </>
  );
}

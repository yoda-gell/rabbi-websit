"use client";

import { useState } from "react";
import AdminVideoCard from "./AdminVideoCard";
import VideoForm from "./VideoForm";
import type { AdminVideo } from "@/lib/admin-videos";

type Filter = "ALL" | "REGULAR" | "SHORT";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "ALL", label: "הכל" },
  { value: "REGULAR", label: "שיעורים רגילים" },
  { value: "SHORT", label: "שורטס" },
];

export default function VideoManager({ videos }: { videos: AdminVideo[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [isCreating, setIsCreating] = useState(false);

  const filteredVideos =
    filter === "ALL" ? videos : videos.filter((video) => video.type === filter);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="shrink-0">
          <h1 className="font-heading text-2xl font-bold">שיעורי וידאו</h1>
          <div className="mt-1 text-sm text-[#8A8175]">{videos.length} סרטונים</div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-white/60 bg-white/60 p-1 shadow-lg shadow-black/[0.03] backdrop-blur-md">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-xl px-4 py-2 font-heading text-[13.5px] font-bold transition-colors ${
                  filter === f.value ? "bg-ink text-text" : "text-[#5C554B] hover:text-[#2A2620]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setIsCreating((open) => !open)}
            className="rounded-xl bg-ink px-[18px] py-2.5 font-heading text-[13.5px] font-bold text-text"
          >
            + סרטון חדש
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="mb-6 rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg shadow-black/[0.03] backdrop-blur-md">
          <VideoForm onDone={() => setIsCreating(false)} />
        </div>
      )}

      {filteredVideos.length === 0 ? (
        <p className="text-sm text-[#8A8175]">
          {videos.length === 0 ? "עדיין לא נוספו סרטונים." : "אין סרטונים בקטגוריה הזו."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <AdminVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import type { AdminVideo } from "@/lib/admin-videos";
import { deleteVideo } from "./actions";
import VideoForm from "./VideoForm";

export default function AdminVideoCard({ video }: { video: AdminVideo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("למחוק את הסרטון הזה? לא ניתן לשחזר.")) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await deleteVideo(video.id);
      } catch (err) {
        console.error("[admin/videos] failed to delete video", err);
        setError("מחיקת הסרטון נכשלה, אנא נסה שנית.");
      }
    });
  }

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg shadow-black/[0.03] backdrop-blur-md">
        <VideoForm initialVideo={video} onDone={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-lg shadow-black/[0.03] backdrop-blur-md">
      <div className="relative aspect-video w-full bg-[#FAF8F4]">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              video.isPublished
                ? "bg-[#E2EAD7] text-[#5C7A3A]"
                : "bg-[#F6E7D2] text-[#B0722E]"
            }`}
          >
            {video.isPublished ? "פורסם" : "טיוטה"}
          </span>
          <span className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs font-semibold text-[#5C554B]">
            {video.type === "SHORT" ? "שורט אנכי" : "שיעור רגיל"}
          </span>
        </div>

        <p className="font-heading text-sm font-semibold leading-snug">{video.title}</p>

        {error && <p className="mt-2 text-xs font-semibold text-[#B0492E]">{error}</p>}

        <div className="mt-3 flex gap-1.5">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isPending}
            className="rounded-lg border border-black/10 bg-white px-3 py-1.5 font-heading text-xs font-bold text-[#5C554B] hover:border-amber/40 hover:text-[#B0722E] disabled:opacity-60"
          >
            ערוך
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg border border-[#F3D9D4] bg-[#FAF8F4] px-3 py-1.5 font-heading text-xs font-bold text-[#B0492E] hover:bg-[#F3D9D4] disabled:opacity-60"
          >
            מחק
          </button>
        </div>
      </div>
    </div>
  );
}

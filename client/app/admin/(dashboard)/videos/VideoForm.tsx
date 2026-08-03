"use client";

import { useState, useTransition } from "react";
import type { AdminVideo } from "@/lib/admin-videos";
import { createVideo, updateVideo } from "./actions";

const textFieldClasses =
  "w-full rounded-xl border border-black/10 bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#2A2620] focus:border-amber focus:outline-none disabled:opacity-60";

export default function VideoForm({
  initialVideo,
  onDone,
}: {
  initialVideo?: AdminVideo;
  onDone: () => void;
}) {
  const isEditMode = !!initialVideo;

  const [title, setTitle] = useState(initialVideo?.title ?? "");
  const [type, setType] = useState<"REGULAR" | "SHORT">(initialVideo?.type ?? "REGULAR");
  const [youtubeUrl, setYoutubeUrl] = useState(
    initialVideo ? `https://www.youtube.com/watch?v=${initialVideo.youtubeId}` : ""
  );
  const [isPublished, setIsPublished] = useState(initialVideo?.isPublished ?? true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedUrl = youtubeUrl.trim();
    if (!trimmedTitle) {
      setError("יש להזין כותרת.");
      return;
    }
    if (!trimmedUrl) {
      setError("יש להזין קישור ליוטיוב.");
      return;
    }

    setError(null);
    const payload = {
      title: trimmedTitle,
      type,
      youtubeUrl: trimmedUrl,
      isPublished,
    };

    startTransition(async () => {
      try {
        if (isEditMode) {
          await updateVideo(initialVideo.id, payload);
        } else {
          await createVideo(payload);
          setTitle("");
          setType("REGULAR");
          setYoutubeUrl("");
          setIsPublished(true);
        }
        onDone();
      } catch (err) {
        console.error("[admin/videos] failed to save video", err);
        setError("קישור היוטיוב אינו תקין, או שהשמירה נכשלה. אנא נסה שנית.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="כותרת הסרטון"
        disabled={isPending}
        className={textFieldClasses}
      />

      <div className="flex gap-1.5">
        {(
          [
            { value: "REGULAR", label: "שיעור רגיל" },
            { value: "SHORT", label: "שורט אנכי" },
          ] as const
        ).map((option) => {
          const selected = type === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setType(option.value)}
              disabled={isPending}
              className={`rounded-full px-3 py-1 font-heading text-xs font-bold disabled:opacity-60 ${
                selected
                  ? "bg-amber text-ink"
                  : "border border-black/10 bg-white text-[#5C554B]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <input
        type="text"
        value={youtubeUrl}
        onChange={(event) => setYoutubeUrl(event.target.value)}
        placeholder="קישור ליוטיוב (watch, youtu.be או shorts)"
        disabled={isPending}
        className={textFieldClasses}
      />

      <div className="flex gap-1.5">
        {(
          [
            { value: false, label: "טיוטה" },
            { value: true, label: "פורסם" },
          ] as const
        ).map((option) => {
          const selected = isPublished === option.value;
          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => setIsPublished(option.value)}
              disabled={isPending}
              className={`rounded-full px-3 py-1 font-heading text-xs font-bold disabled:opacity-60 ${
                selected
                  ? "bg-amber text-ink"
                  : "border border-black/10 bg-white text-[#5C554B]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-semibold text-[#B0492E]">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-amber px-5 py-2.5 font-heading text-[13.5px] font-bold text-ink disabled:opacity-60"
        >
          {isPending ? (isEditMode ? "שומר…" : "מוסיף…") : isEditMode ? "שמור שינויים" : "הוסף סרטון"}
        </button>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          className="rounded-xl border border-black/10 bg-white px-5 py-2.5 font-heading text-[13.5px] font-semibold text-[#5C554B] disabled:opacity-60"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}

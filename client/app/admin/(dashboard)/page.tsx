import Link from "next/link";
import { getAdminQuestions } from "@/lib/admin-questions";
import { getAdminVideos } from "@/lib/admin-videos";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminPage() {
  const [questions, videos] = await Promise.all([getAdminQuestions(), getAdminVideos()]);
  const pendingCount = questions.filter((q) => !q.isPublished).length;
  const publishedVideoCount = videos.filter((v) => v.isPublished).length;
  const pendingPreview = questions.filter((q) => !q.isPublished).slice(0, 5);

  const stats = [
    { label: "סה״כ פניות", value: questions.length, accent: false },
    { label: "ממתינות למענה", value: pendingCount, accent: true },
    { label: "סה״כ סרטונים", value: videos.length, accent: false },
    { label: "סרטונים מפורסמים", value: publishedVideoCount, accent: false },
  ];

  return (
    <div className="p-6 md:p-9">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">לוח בקרה</h1>
          <div className="mt-1 text-sm text-[#8A8175]">
            {pendingCount} פניות ממתינות · {videos.length} סרטונים
          </div>
        </div>
        <Link
          href="/admin/videos"
          className="rounded-xl bg-ink px-[18px] py-2.5 font-heading text-[13.5px] font-bold text-text"
        >
          + סרטון חדש
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-black/[0.07] bg-white p-[18px]"
          >
            <div className="mb-1.5 text-[13px] text-[#8A8175]">{stat.label}</div>
            <div
              className={`font-heading text-[28px] font-bold ${
                stat.accent ? "text-[#B0722E]" : "text-[#2A2620]"
              }`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-lg shadow-black/[0.03] backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <h2 className="font-heading text-lg font-bold">פניות ממתינות למענה</h2>
          <Link
            href="/admin/questions"
            className="rounded-lg bg-ink px-4 py-2 font-heading text-xs font-bold text-text"
          >
            עבור למענה
          </Link>
        </div>

        {pendingPreview.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#8A8175]">אין פניות הממתינות למענה כרגע.</p>
        ) : (
          <div className="divide-y divide-black/5">
            {pendingPreview.map((q) => (
              <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{q.question}</p>
                  <p className="mt-0.5 text-xs text-[#8A8175]">
                    {q.askerName || "אנונימי"} · {formatDate(q.createdAt)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#F6E7D2] px-3 py-1 font-heading text-xs font-bold text-[#B0722E]">
                  ממתינה
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

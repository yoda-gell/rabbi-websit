import Link from "next/link";
import { getAdminQuestions } from "@/lib/admin-questions";
import { getAdminVideos } from "@/lib/admin-videos";
import { logout } from "../actions";
import AdminNav from "./AdminNav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questions, videos] = await Promise.all([getAdminQuestions(), getAdminVideos()]);
  const pendingCount = questions.filter((q) => !q.isPublished).length;

  return (
    <div dir="rtl" className="min-h-screen bg-[#E5DFD1] font-body text-[#2A2620]">
      <header className="flex flex-col gap-3 bg-ink px-5 py-4 text-text md:flex-row md:items-center md:gap-4 md:px-9 md:py-3.5">
        <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber font-heading text-lg font-extrabold text-ink">
            י
          </span>
          <div>
            <div className="font-heading text-sm font-bold">הרב יעקב זיסהולץ</div>
            <div className="text-[11.5px] text-text-faint">אזור ניהול</div>
          </div>
        </Link>

        <AdminNav pendingCount={pendingCount} videoCount={videos.length} />

        <div className="flex shrink-0 items-center justify-between gap-2.5 md:justify-end">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-card-alt font-heading text-sm font-bold text-amber">
              א
            </span>
            <div>
              <div className="font-heading text-sm font-semibold">אליהו כהן</div>
              <div className="text-[11px] text-text-faint">עוזר הרב · מנהל פניות</div>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="font-heading text-xs font-semibold text-text-faint hover:text-amber"
            >
              התנתקות
            </button>
          </form>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

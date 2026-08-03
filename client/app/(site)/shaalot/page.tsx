import Link from "next/link";
import ShaalotFilters from "@/components/ShaalotFilters";
import { getPublishedQuestions } from "@/lib/questions";

export default async function ShaalotPage() {
  const faqs = await getPublishedQuestions();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">שו״ת אנונימי</h1>
      <p className="mt-2 text-text-muted">
        שאלות אמיתיות של בני נוער, ותשובות של הרב. הכל אנונימי.
      </p>

      <ShaalotFilters faqs={faqs} />

      <div className="mt-6 rounded-2xl border border-amber/20 bg-gradient-to-br from-[#2a2117] to-card p-6 text-center">
        <div className="font-heading text-base font-bold">לא מצאת את השאלה שלך?</div>
        <div className="mt-1.5 text-sm text-text-muted">
          שלח אותה עכשיו — אנונימי לגמרי, בלי פרטים.
        </div>
        <Link
          href="/contact"
          className="mt-3.5 inline-block rounded-xl bg-amber px-6 py-3 font-heading text-sm font-bold text-ink"
        >
          לשאלה אנונימית
        </Link>
      </div>
    </div>
  );
}

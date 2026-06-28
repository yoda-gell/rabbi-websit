import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תרומה",
  description: "תמוך בפעילות התורנית של הרב",
};

export default function TmichaPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-10 text-center" aria-labelledby="tmicha-heading">
      <h1 id="tmicha-heading" className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        תרומה ותמיכה
      </h1>
      <p className="text-[var(--color-muted)] mb-8">
        תמיכתך מאפשרת את המשך הפצת התורה
      </p>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
        <p className="text-[var(--color-muted)] mb-6">
          מערכת התרומות תחובר בקרוב
        </p>
        {/* TODO: connect PayPal / credit card */}
        <button
          className="bg-[var(--color-accent)] text-[var(--color-primary)] font-bold px-8 py-3 rounded-lg hover:bg-[var(--color-accent-light)] transition-colors min-h-[44px]"
          disabled
          aria-disabled="true"
        >
          בקרוב...
        </button>
      </div>
    </section>
  );
}

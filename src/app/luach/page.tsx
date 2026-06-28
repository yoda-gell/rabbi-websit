import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "לוח שיעורים",
  description: "לוח השיעורים והאירועים הקרובים",
};

export default function LuachPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10" aria-labelledby="luach-heading">
      <h1 id="luach-heading" className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        לוח שיעורים
      </h1>
      <p className="text-[var(--color-muted)] mb-8">מועדי השיעורים והאירועים הקרובים</p>

      {/* TODO: weekly/monthly schedule */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center text-[var(--color-muted)]">
        לוח השיעורים יתווסף בקרוב...
      </div>
    </section>
  );
}

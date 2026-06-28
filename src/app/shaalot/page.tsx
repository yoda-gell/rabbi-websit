import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "שאלות ותשובות",
  description: "שאל שאלה בהלכה וקבל מענה מהרב",
};

export default function ShaalotPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="shaalot-heading">
      <h1 id="shaalot-heading" className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        שאלות ותשובות
      </h1>
      <p className="text-[var(--color-muted)] mb-8">שאל שאלה בהלכה וקבל מענה</p>

      {/* TODO: chat/question form + published Q&A list */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center text-[var(--color-muted)]">
        מערכת השאלות תהיה זמינה בקרוב...
      </div>
    </section>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אודות",
  description: "היכר את הרב",
};

export default function OdotPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="odot-heading">
      <h1 id="odot-heading" className="text-3xl font-bold text-[var(--color-primary)] mb-6">
        אודות הרב
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Photo placeholder */}
        <div
          className="w-40 h-40 sm:w-48 sm:h-48 shrink-0 bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-2xl flex items-center justify-center text-5xl"
          aria-label="תמונת הרב"
          role="img"
        >
          👤
        </div>

        <div className="flex-1">
          {/* TODO: fill in bio */}
          <p className="text-[var(--color-foreground)] leading-relaxed mb-4">
            ביוגרפיה של הרב תתווסף כאן...
          </p>
          <p className="text-[var(--color-muted)] text-sm">
            תוכן נוסף יתווסף בקרוב.
          </p>
        </div>
      </div>
    </section>
  );
}

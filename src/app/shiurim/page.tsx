import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "שיעורי תורה",
  description: "צפה בשיעורי תורה מהיוטיוב",
};

export default function ShiurimPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10" aria-labelledby="shiurim-heading">
      <h1 id="shiurim-heading" className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        שיעורי תורה
      </h1>
      <p className="text-[var(--color-muted)] mb-8">כל השיעורים מהיוטיוב במקום אחד</p>

      {/* TODO: grid of YouTube embeds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-[var(--color-muted)] col-span-full text-center py-12">
          השיעורים יתווספו בקרוב...
        </p>
      </div>
    </section>
  );
}

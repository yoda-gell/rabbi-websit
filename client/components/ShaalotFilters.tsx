"use client";

import { useMemo, useState } from "react";
import FaqAccordion from "@/components/FaqAccordion";
import type { Faq } from "@/lib/content";

const categories = ["הכל", "אמונה", "נפילות", "חברה", "בית", "תפילה", "הלכה", "השקפה"];

export default function ShaalotFilters({ faqs }: { faqs: Faq[] }) {
  const [category, setCategory] = useState("הכל");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = category === "הכל" || faq.tags.includes(category);
      const matchesSearch =
        search.trim() === "" ||
        faq.question.includes(search) ||
        faq.answer.includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [faqs, category, search]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='מה מעסיק אותך? למשל: "כעס", "תפילה"…'
        className="mt-5 w-full rounded-2xl border border-white/[0.08] bg-card-soft px-[18px] py-3.5 text-sm text-text placeholder:text-text-faint focus:border-amber focus:outline-none"
      />

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-4 py-2 font-heading text-sm font-bold ${
              category === c ? "bg-text text-ink" : "bg-card-alt text-text-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {filtered.length > 0 ? (
          <FaqAccordion items={filtered} />
        ) : (
          <p className="py-8 text-center text-text-faint">לא נמצאו שאלות מתאימות.</p>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

export default function FaqAccordion({
  items,
  defaultOpenId,
}: {
  items: Faq[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId ?? items[0]?.id);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((faq) => {
        const isOpen = faq.id === openId;
        return (
          <button
            key={faq.id}
            type="button"
            onClick={() => setOpenId(isOpen ? undefined : faq.id)}
            className={`rounded-2xl border p-[18px] text-right transition-colors ${
              isOpen ? "border-amber/25 bg-card" : "border-white/5 bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-2.5">
              <div className="font-heading text-[15.5px] font-semibold leading-snug">
                {faq.question}
              </div>
              <span className="font-heading text-lg font-bold text-amber shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </div>
            {isOpen && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
                <div className="mt-2.5 flex gap-2">
                  {faq.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-card-soft px-2.5 py-1 text-[11.5px] font-semibold text-text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

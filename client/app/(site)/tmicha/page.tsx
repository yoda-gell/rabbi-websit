"use client";

import Link from "next/link";
import { useState } from "react";
import { donationLink, donationPresets } from "@/lib/content";

export default function TmichaPage() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState(104);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">שותפים לדרך</h1>
      <p className="mt-2 text-text-muted">
        התרומה שלך מחזיקה את המענה, הסרטונים והליווי האישי — בחינם, לכל נער.
      </p>

      <div className="mt-6 rounded-[20px] border border-amber/20 bg-card p-5">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-card-soft p-1">
          <button
            type="button"
            onClick={() => setFrequency("once")}
            className={`rounded-xl py-2.5 font-heading text-sm font-bold ${
              frequency === "once" ? "bg-card-alt text-text" : "text-text-faint"
            }`}
          >
            חד־פעמי
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`rounded-xl py-2.5 font-heading text-sm font-bold ${
              frequency === "monthly" ? "bg-card-alt text-text" : "text-text-faint"
            }`}
          >
            הוראת קבע
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {donationPresets.map((preset) => (
            <button
              key={preset.amount}
              type="button"
              onClick={() => setAmount(preset.amount)}
              className={`relative rounded-2xl px-4 py-4 text-center ${
                amount === preset.amount
                  ? "border-[1.5px] border-amber bg-[#2a2117]"
                  : "border border-white/[0.08] bg-card-soft"
              }`}
            >
              {preset.featured && (
                <span className="absolute -top-2.5 right-3 rounded-md bg-amber px-2 py-0.5 font-heading text-[10.5px] font-bold text-ink">
                  הכי נבחר
                </span>
              )}
              <div
                className={`font-heading text-xl font-bold ${
                  amount === preset.amount ? "text-amber" : "text-text"
                }`}
              >
                ₪{preset.amount}
              </div>
              <div className="mt-0.5 text-[11.5px] text-text-faint">{preset.label}</div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount(0)}
            className={`rounded-2xl px-4 py-4 text-center ${
              amount === 0
                ? "border-[1.5px] border-amber bg-[#2a2117]"
                : "border border-white/[0.08] bg-card-soft"
            }`}
          >
            <div className="font-heading text-xl font-bold">אחר</div>
            <div className="mt-0.5 text-[11.5px] text-text-faint">סכום חופשי</div>
          </button>
        </div>

        <a
          href={donationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-2xl bg-amber py-4 text-center font-heading text-base font-bold text-ink"
        >
          לתרומה מאובטחת
        </a>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-text-faint">
          <span className="rounded-lg bg-card-soft px-3 py-1.5 font-heading font-bold text-[#a9bc7f]">
            נדרים פלוס
          </span>
          <span>תשלום מאובטח · קבלה במייל</span>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-text-faint">
          התשלום מתבצע ומאובטח במלואו באתר החיצוני של נדרים פלוס — אין באתר זה
          כל שמירה של פרטי אשראי או תשלום. ראו{" "}
          <Link href="/privacy" className="font-semibold text-amber">
            מדיניות פרטיות
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <div className="mx-auto max-w-lg px-5 py-8 md:py-12">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber/30 bg-card-alt">
          <span className="h-[22px] w-[28px] rounded-[9px_9px_9px_2px] bg-amber" />
        </div>
        <h1 className="font-heading text-3xl font-bold">צור קשר עם הרב</h1>
        <p className="mx-auto mt-2.5 max-w-xs text-text-muted">
          אפשר בשם מלא ואפשר בעילום שם. אתה בוחר איך לקבל תשובה — למייל, או בפרסום אנונימי
          בשו״ת.
        </p>
      </div>

      {state.status === "success" ? (
        <div className="mt-8 rounded-2xl border border-amber/25 bg-card p-6 text-center">
          <p className="font-heading text-base font-bold text-amber">{state.message}</p>
        </div>
      ) : (
        <form action={formAction} className="mt-6 flex flex-col gap-3.5">
          <label className="block">
            <div className="mb-1.5 font-heading text-sm font-semibold text-text-muted">
              איך לקרוא לך? <span className="font-normal text-text-faint">(לא חובה)</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder='למשל: "מ׳ מהצפון"'
              className="w-full rounded-2xl border border-white/[0.08] bg-card-soft px-4 py-3.5 text-sm placeholder:text-text-faint focus:border-amber focus:outline-none"
            />
          </label>

          <label className="block">
            <div className="mb-1.5 font-heading text-sm font-semibold text-text-muted">
              המייל שלך
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="you@mail.com"
              className="w-full rounded-2xl border border-white/[0.08] bg-card-soft px-4 py-3.5 text-sm placeholder:text-text-faint focus:border-amber focus:outline-none"
            />
          </label>

          <label className="block">
            <div className="mb-1.5 font-heading text-sm font-semibold text-text-muted">
              מה על הלב?
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="כתוב חופשי. אף אחד לא שופט אותך כאן…"
              className="w-full rounded-2xl border border-white/[0.08] bg-card-soft px-4 py-3.5 text-sm placeholder:text-text-faint focus:border-amber focus:outline-none"
            />
          </label>

          <div>
            <div className="mb-1.5 font-heading text-sm font-semibold text-text-muted">
              לפרסם את השאלה גם בשו״ת?
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-card-soft px-4 py-3.5">
              <input
                type="checkbox"
                name="wantsPublishedAnonymous"
                className="h-5 w-5 accent-amber"
              />
              <span className="font-heading text-sm font-semibold text-text-muted">
                פרסום אנונימי בשו״ת — בלי פרט מזהה
              </span>
            </label>
          </div>

          {state.status === "error" && (
            <p className="text-sm font-semibold text-[#e08a7a]">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1.5 rounded-2xl bg-amber py-4 text-center font-heading text-base font-bold text-ink shadow-[0_8px_24px_rgba(232,168,92,0.25)] disabled:opacity-60"
          >
            {isPending ? "שולח…" : "שליחה"}
          </button>
        </form>
      )}
    </div>
  );
}

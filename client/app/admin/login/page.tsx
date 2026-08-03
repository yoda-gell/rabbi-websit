"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-ink px-5 font-body text-text"
    >
      <div className="w-full max-w-sm rounded-3xl border border-amber/20 bg-card p-8">
        <h1 className="mb-1 font-heading text-2xl font-bold">אזור ניהול</h1>
        <p className="mb-6 text-sm text-text-muted">גישה מורשים בלבד.</p>

        <form action={formAction} className="flex flex-col gap-3.5">
          <label className="block">
            <div className="mb-1.5 font-heading text-sm font-semibold text-text-muted">
              סיסמה
            </div>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-2xl border border-white/[0.08] bg-card-soft px-4 py-3.5 text-sm focus:border-amber focus:outline-none"
            />
          </label>

          {state.status === "error" && (
            <p className="text-sm font-semibold text-[#e08a7a]">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1.5 rounded-2xl bg-amber py-3.5 text-center font-heading text-base font-bold text-ink disabled:opacity-60"
          >
            {isPending ? "מתחבר…" : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { answerQuestion } from "./actions";
import LabelPicker from "./LabelPicker";

export default function AnswerForm({
  questionId,
  initialLabels,
}: {
  questionId: string;
  initialLabels: string[];
}) {
  const [answer, setAnswer] = useState("");
  const [labels, setLabels] = useState<string[]>(initialLabels);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = answer.trim();
    if (!trimmed) {
      setError("יש להזין תשובה לפני השליחה.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await answerQuestion(questionId, trimmed, labels);
      } catch (err) {
        console.error("[admin/questions] failed to submit answer", err);
        setError("שליחת התשובה נכשלה, אנא נסה שנית.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-3">
      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        rows={4}
        placeholder="כתוב תשובה כאן…"
        disabled={isPending}
        className="w-full rounded-xl border border-black/10 bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#2A2620] focus:border-amber focus:outline-none disabled:opacity-60"
      />

      <LabelPicker labels={labels} onChange={setLabels} disabled={isPending} />

      {error && <p className="text-xs font-semibold text-[#B0492E]">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-xl bg-amber px-5 py-2.5 font-heading text-[13.5px] font-bold text-ink disabled:opacity-60"
      >
        {isPending ? "שולח…" : "פרסם תשובה"}
      </button>
    </form>
  );
}

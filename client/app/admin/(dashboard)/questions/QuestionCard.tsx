"use client";

import { useState, useTransition } from "react";
import type { AdminQuestion } from "@/lib/admin-questions";
import { deleteQuestion, editQuestion } from "./actions";
import AnswerForm from "./AnswerForm";
import LabelPicker from "./LabelPicker";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function QuestionCard({ question }: { question: AdminQuestion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer ?? "");
  const [labels, setLabels] = useState<string[]>(question.labels);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleEditClick() {
    setQuestionText(question.question);
    setAnswerText(question.answer ?? "");
    setLabels(question.labels);
    setError(null);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setError(null);
    setIsEditing(false);
  }

  function handleSaveEdit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = questionText.trim();
    if (!trimmedQuestion) {
      setError("טקסט השאלה לא יכול להישאר ריק.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await editQuestion(question.id, {
          question: trimmedQuestion,
          answer: answerText.trim(),
          labels,
        });
        setIsEditing(false);
      } catch (err) {
        console.error("[admin/questions] failed to save edit", err);
        setError("שמירת השינויים נכשלה, אנא נסה שנית.");
      }
    });
  }

  function handleDelete() {
    if (!window.confirm("למחוק את הפנייה הזו? לא ניתן לשחזר.")) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await deleteQuestion(question.id);
      } catch (err) {
        console.error("[admin/questions] failed to delete question", err);
        setError("מחיקת הפנייה נכשלה, אנא נסה שנית.");
      }
    });
  }

  return (
    <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg shadow-black/[0.03] backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`rounded-full px-3 py-1 font-heading text-xs font-bold ${
              question.isPublished
                ? "bg-[#E2EAD7] text-[#5C7A3A]"
                : "bg-[#F6E7D2] text-[#B0722E]"
            }`}
          >
            {question.isPublished ? "פורסמה" : "ממתינה"}
          </span>
          <span className="font-heading text-sm font-semibold">
            {question.askerName || "אנונימי"}
          </span>
          <span className="text-xs text-[#8A8175]">{question.askerEmail}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#8A8175]">{formatDate(question.createdAt)}</span>
          {!isEditing && (
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={handleEditClick}
                disabled={isPending}
                className="rounded-lg border border-black/10 bg-white px-3 py-1.5 font-heading text-xs font-bold text-[#5C554B] hover:border-amber/40 hover:text-[#B0722E] disabled:opacity-60"
              >
                ערוך
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="rounded-lg border border-[#F3D9D4] bg-[#FAF8F4] px-3 py-1.5 font-heading text-xs font-bold text-[#B0492E] hover:bg-[#F3D9D4] disabled:opacity-60"
              >
                מחק
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSaveEdit} className="mt-3.5 flex flex-col gap-3">
          <textarea
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            rows={3}
            placeholder="טקסט השאלה"
            disabled={isPending}
            className="w-full rounded-xl border border-black/10 bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#2A2620] focus:border-amber focus:outline-none disabled:opacity-60"
          />

          <textarea
            value={answerText}
            onChange={(event) => setAnswerText(event.target.value)}
            rows={4}
            placeholder="תשובה"
            disabled={isPending}
            className="w-full rounded-xl border border-black/10 bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#2A2620] focus:border-amber focus:outline-none disabled:opacity-60"
          />

          <LabelPicker labels={labels} onChange={setLabels} disabled={isPending} />

          {error && <p className="text-xs font-semibold text-[#B0492E]">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-amber px-5 py-2.5 font-heading text-[13.5px] font-bold text-ink disabled:opacity-60"
            >
              {isPending ? "שומר…" : "שמור שינויים"}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isPending}
              className="rounded-xl border border-black/10 bg-white px-5 py-2.5 font-heading text-[13.5px] font-semibold text-[#5C554B] disabled:opacity-60"
            >
              ביטול
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed">{question.question}</p>

          {question.isPublished ? (
            <>
              {question.answer && (
                <p className="mt-2.5 rounded-xl bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#5C554B]">
                  {question.answer}
                </p>
              )}
              {question.labels.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {question.labels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-[#F6E7D2] px-2.5 py-0.5 text-xs font-semibold text-[#B0722E]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <AnswerForm questionId={question.id} initialLabels={question.labels} />
          )}

          {error && <p className="mt-2 text-xs font-semibold text-[#B0492E]">{error}</p>}
        </>
      )}
    </div>
  );
}

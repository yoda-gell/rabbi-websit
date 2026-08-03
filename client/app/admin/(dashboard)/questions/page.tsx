import QuestionCard from "./QuestionCard";
import { getAdminQuestions } from "@/lib/admin-questions";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage() {
  const questions = await getAdminQuestions();
  const pending = questions.filter((q) => !q.isPublished);
  const published = questions.filter((q) => q.isPublished);

  return (
    <div className="mx-auto max-w-4xl px-6 py-9 md:px-9">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold">פניות ותשובות</h1>
        <div className="mt-1 text-sm text-[#8A8175]">
          {pending.length} ממתינות למענה · {published.length} פורסמו
        </div>
      </div>

      <section className="mb-9">
        <h2 className="mb-3.5 font-heading text-lg font-bold">ממתינות למענה</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-[#8A8175]">אין פניות הממתינות למענה כרגע.</p>
        ) : (
          <div className="flex flex-col gap-3.5">
            {pending.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3.5 font-heading text-lg font-bold">פורסמו</h2>
        {published.length === 0 ? (
          <p className="text-sm text-[#8A8175]">עדיין לא פורסמו תשובות.</p>
        ) : (
          <div className="flex flex-col gap-3.5">
            {published.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

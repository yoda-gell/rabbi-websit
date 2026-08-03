import type { Faq } from "./content";

type QuestionApiResponse = {
  id: string;
  askerName: string | null;
  wantsPublishedAnonymous: boolean;
  question: string;
  answer: string | null;
  isPublished: boolean;
  status: string;
  labels: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export async function getPublishedQuestions(): Promise<Faq[]> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${baseUrl}/questions`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`[questions] NestJS /questions responded ${response.status}`);
      return [];
    }

    const data: QuestionApiResponse[] = await response.json();

    return data
      .filter((q): q is QuestionApiResponse & { answer: string } => q.answer !== null)
      .map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        tags: q.labels,
      }));
  } catch (error) {
    console.error("[questions] failed to fetch published questions from NestJS", error);
    return [];
  }
}

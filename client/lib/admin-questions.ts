export type AdminQuestion = {
  id: string;
  askerName: string | null;
  askerEmail: string;
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

export async function getAdminQuestions(): Promise<AdminQuestion[]> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    console.error("[admin-questions] ADMIN_API_SECRET is not set — see .env.local.example");
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}/admin/questions`, {
      headers: { "x-admin-secret": secret },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[admin-questions] NestJS /admin/questions responded ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("[admin-questions] failed to fetch questions from NestJS", error);
    return [];
  }
}

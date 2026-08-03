"use server";

import { contactSchema } from "@/lib/contact-schema";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

async function createQuestion(data: {
  name?: string;
  email: string;
  message: string;
  wantsPublishedAnonymous: boolean;
}): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const response = await fetch(`${baseUrl}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      askerName: data.name,
      askerEmail: data.email,
      question: data.message,
      wantsPublishedAnonymous: data.wantsPublishedAnonymous,
    }),
  });

  if (!response.ok) {
    throw new Error(`NestJS /questions responded ${response.status}`);
  }
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: String(formData.get("name") ?? "").trim() || undefined,
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    wantsPublishedAnonymous: formData.get("wantsPublishedAnonymous") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "אנא בדוק/י את הפרטים שהוזנו.",
    };
  }

  try {
    await createQuestion(parsed.data);
  } catch (error) {
    console.error("[contact] failed to save question to NestJS", error);
    return {
      status: "error",
      message: "אירעה שגיאה בשמירת הפנייה, אנא נסה שנית.",
    };
  }

  return { status: "success", message: "הפנייה נשלחה. הרב יחזור אליך בהקדם." };
}

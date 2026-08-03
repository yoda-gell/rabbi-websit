"use server";

import { revalidatePath } from "next/cache";

export async function answerQuestion(
  id: string,
  answer: string,
  labels: string[]
): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    },
    body: JSON.stringify({
      answer,
      status: "ANSWERED",
      isPublished: true,
      labels,
    }),
  });

  if (!response.ok) {
    throw new Error(`NestJS /admin/questions/${id} responded ${response.status}`);
  }

  revalidatePath("/shaalot");
  revalidatePath("/admin/questions");
}

export async function editQuestion(
  id: string,
  data: { question: string; answer: string; labels: string[] }
): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`NestJS /admin/questions/${id} responded ${response.status}`);
  }

  revalidatePath("/shaalot");
  revalidatePath("/admin/questions");
}

export async function deleteQuestion(id: string): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/questions/${id}`, {
    method: "DELETE",
    headers: { "x-admin-secret": secret },
  });

  if (!response.ok) {
    throw new Error(`NestJS DELETE /admin/questions/${id} responded ${response.status}`);
  }

  revalidatePath("/shaalot");
  revalidatePath("/admin/questions");
  revalidatePath("/admin");
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || !process.env.ADMIN_SESSION_SECRET) {
    return {
      status: "error",
      message: "ADMIN_PASSWORD / ADMIN_SESSION_SECRET אינם מוגדרים בשרת.",
    };
  }
  if (password !== expected) {
    return { status: "error", message: "סיסמה שגויה." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

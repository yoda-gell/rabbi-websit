"use server";

import { revalidatePath } from "next/cache";

type VideoInput = {
  title: string;
  type: "REGULAR" | "SHORT";
  youtubeUrl: string;
  isPublished: boolean;
};

function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, "");

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  }

  if (host === "youtube.com") {
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    const shortsMatch = url.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) {
      return shortsMatch[1];
    }
  }

  return null;
}

function buildPayload(data: VideoInput) {
  const youtubeId = extractYoutubeId(data.youtubeUrl);
  if (!youtubeId) {
    throw new Error("Invalid YouTube URL");
  }

  return {
    title: data.title,
    youtubeId,
    type: data.type,
    isPublished: data.isPublished,
  };
}

export async function createVideo(data: VideoInput): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    },
    body: JSON.stringify(buildPayload(data)),
  });

  if (!response.ok) {
    throw new Error(`NestJS /admin/videos responded ${response.status}`);
  }

  revalidatePath("/admin/videos");
  revalidatePath("/shiurim");
}

export async function updateVideo(id: string, data: VideoInput): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/videos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    },
    body: JSON.stringify(buildPayload(data)),
  });

  if (!response.ok) {
    throw new Error(`NestJS /admin/videos/${id} responded ${response.status}`);
  }

  revalidatePath("/admin/videos");
  revalidatePath("/shiurim");
}

export async function deleteVideo(id: string): Promise<void> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set — see .env.local.example");
  }

  const response = await fetch(`${baseUrl}/admin/videos/${id}`, {
    method: "DELETE",
    headers: { "x-admin-secret": secret },
  });

  if (!response.ok) {
    throw new Error(`NestJS DELETE /admin/videos/${id} responded ${response.status}`);
  }

  revalidatePath("/admin/videos");
  revalidatePath("/shiurim");
}

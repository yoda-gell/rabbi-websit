export type AdminVideo = {
  id: string;
  title: string;
  youtubeId: string;
  type: "REGULAR" | "SHORT";
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getAdminVideos(): Promise<AdminVideo[]> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    console.error("[admin-videos] ADMIN_API_SECRET is not set — see .env.local.example");
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}/admin/videos`, {
      headers: { "x-admin-secret": secret },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[admin-videos] NestJS /admin/videos responded ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("[admin-videos] failed to fetch videos from NestJS", error);
    return [];
  }
}

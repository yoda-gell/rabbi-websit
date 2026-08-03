export type PublicVideo = {
  id: string;
  title: string;
  youtubeId: string;
  type: "REGULAR" | "SHORT";
  createdAt: string;
};

export async function getPublishedVideos(): Promise<PublicVideo[]> {
  const baseUrl = process.env.NEST_API_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${baseUrl}/videos`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`[videos] NestJS /videos responded ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("[videos] failed to fetch published videos from NestJS", error);
    return [];
  }
}

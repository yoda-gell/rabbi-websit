import VideoManager from "./VideoManager";
import { getAdminVideos } from "@/lib/admin-videos";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const videos = await getAdminVideos();

  return (
    <div className="mx-auto max-w-5xl px-6 py-9 md:px-9">
      <VideoManager videos={videos} />
    </div>
  );
}

import ShiurimTabs from "@/components/ShiurimTabs";
import { getPublishedVideos } from "@/lib/videos";

export default async function ShiurimPage() {
  const videos = await getPublishedVideos();
  const regular = videos.filter((v) => v.type === "REGULAR");
  const short = videos.filter((v) => v.type === "SHORT");

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-16 md:py-12">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">ספריית הנשמה</h1>

      <ShiurimTabs regular={regular} short={short} />
    </div>
  );
}

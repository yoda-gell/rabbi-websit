import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import FaqAccordion from "@/components/FaqAccordion";
import YouTubeHero from "@/components/YouTubeHero";
import { donationPresets, heroVideo } from "@/lib/content";
import { getPublishedQuestions } from "@/lib/questions";
import { getPublishedVideos } from "@/lib/videos";

export default async function Home() {
  const [faqs, videos] = await Promise.all([getPublishedQuestions(), getPublishedVideos()]);
  const latestShorts = videos.filter((v) => v.type === "SHORT").slice(0, 5);
  const latestRegular = videos.find((v) => v.type === "REGULAR");

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-16">
      {/* Hero */}
      <section className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
        <div>
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
            הרב יעקב זיסהולץ
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-text-muted">
            מקום שקט לדבר עם הרב יעקב זיסהולץ — לשאול, להתייעץ ולקבל כוח. בלי שם, בלי פרטים.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="rounded-2xl bg-amber px-8 py-4 font-heading text-base font-bold text-ink shadow-[0_10px_30px_rgba(232,168,92,0.25)]"
            >
              צור קשר עם הרב — גם אנונימי
            </Link>
            <Link
              href="/shiurim"
              className="rounded-2xl border border-white/[0.14] px-7 py-4 font-heading text-base font-semibold"
            >
              לספריית הנשמה
            </Link>
          </div>
        </div>
        <div className="relative h-[320px] md:h-[440px]">
          <YouTubeHero youtubeId={heroVideo.youtubeId} title={heroVideo.title} />
        </div>
      </section>

      {/* Shorts */}
      {latestShorts.length > 0 && (
        <section className="py-8">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">רגע של חיזוק</h2>
            <Link href="/shiurim" className="font-heading text-sm font-semibold text-amber">
              לכל הסרטונים ←
            </Link>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0">
            {latestShorts.map((video) => (
              <VideoCard
                key={video.id}
                youtubeId={video.youtubeId}
                title={video.title}
                className="aspect-[9/16] h-[236px] w-[150px] shrink-0 lg:h-[330px] lg:w-auto"
              />
            ))}
          </div>
        </section>
      )}

      
      {/* Archive teaser */}
      {latestRegular && (
        <Link
          href="/shiurim"
          className="my-4 flex items-center gap-4 rounded-2xl bg-card p-5 hover:bg-card-alt"
        >
          <img
            src={`https://i.ytimg.com/vi/${latestRegular.youtubeId}/hqdefault.jpg`}
            alt=""
            className="h-16 w-16 shrink-0 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <div className="font-heading text-base font-bold">ארכיון השיעורים המלא</div>
            <div className="mt-0.5 text-sm text-text-muted">
              כל שיעורי הרב מהיוטיוב — אמונה, גאולה ועוד
            </div>
          </div>
          <span className="text-text-faint">‹</span>
        </Link>
      )}

      {/* Q&A + Contact */}
      <section className="py-10">
        <h2 className="mb-6 font-heading text-2xl font-bold md:text-3xl">
          שאלות שקשה לשאול
        </h2>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="lg:col-span-2">
            {faqs.length > 0 ? (
              <>
                <FaqAccordion items={faqs.slice(0, 3)} />
                <Link
                  href="/shaalot"
                  className="mt-4 block text-center font-heading text-sm font-semibold text-amber md:text-right"
                >
                  לכל השאלות והתשובות ←
                </Link>
              </>
            ) : (
              <p className="py-6 text-center text-text-faint">בקרוב יתפרסמו כאן שאלות ותשובות.</p>
            )}
          </div>
          <div className="flex h-full flex-col justify-center gap-5 rounded-3xl border border-amber/25 bg-card p-8 lg:col-span-1">
            <h3 className="whitespace-nowrap font-heading text-2xl font-bold">צור קשר עם הרב</h3>
            <p className="text-base leading-relaxed text-text-muted">
              אפשר בשם מלא ואפשר בעילום שם — אתה בוחר איך לקבל תשובה.
            </p>
            <Link
              href="/contact"
              className="rounded-xl bg-amber px-7 py-4 text-center font-heading text-base font-bold text-ink"
            >
              לפנייה
            </Link>
          </div>
        </div>
      </section>

      {/* Donation band */}
      <section className="my-10 flex flex-col gap-6 rounded-[26px] border border-amber/25 bg-gradient-to-br from-[#2a2117] to-card p-8 md:flex-row md:items-center md:justify-between md:p-14">
        <div>
          <h2 className="mb-2 font-heading text-2xl font-bold md:text-3xl">שותפים לדרך</h2>
          <p className="max-w-md text-sm leading-relaxed text-text-muted md:text-base">
            כל תרומה מחזיקה עוד נער שמצא כאן בית — המענה, הסרטונים והליווי האישי.
          </p>
          <div className="mt-2.5 text-xs text-text-faint">
            תשלום מאובטח באמצעות נדרים פלוס · קבלה במייל
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {donationPresets.map((preset) => (
            <span
              key={preset.amount}
              className={`rounded-xl border px-5 py-3.5 font-heading text-base font-bold ${
                preset.featured
                  ? "border-amber bg-[#2a2117] text-amber"
                  : "border-white/[0.08] bg-card-soft"
              }`}
            >
              ₪{preset.amount}
            </span>
          ))}
          <Link
            href="/tmicha"
            className="rounded-2xl bg-amber px-8 py-4 font-heading text-base font-bold text-ink"
          >
            לתרומה
          </Link>
        </div>
      </section>
    </div>
  );
}

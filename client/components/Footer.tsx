import Link from "next/link";

const socials = ["יוטיוב", "טיקטוק", "אינסטגרם", "וואטסאפ"];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card-soft px-5 py-10 md:px-16 md:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div className="max-w-xs text-sm leading-relaxed text-text-faint">
          בית חם לנוער, מיסודו של הרב יעקב זיסהולץ. כאן מקשיבים.
        </div>
        <div>
          <div className="mb-3 font-heading text-sm font-bold text-text-muted">תוכן</div>
          <div className="flex flex-col gap-2 text-sm text-text-faint">
            <Link href="/shiurim">ספריית הנשמה</Link>
            <Link href="/shaalot">שו״ת אנונימי</Link>
            <Link href="/contact">פנייה</Link>
          </div>
        </div>
        <div>
          <div className="mb-3 font-heading text-sm font-bold text-text-muted">שותפות</div>
          <div className="flex flex-col gap-2 text-sm text-text-faint">
            <Link href="/tmicha">תרומות</Link>
            <Link href="/tmicha">ספרי הרב</Link>
          </div>
        </div>
        <div>
          <div className="mb-3 font-heading text-sm font-bold text-text-muted">עוקבים</div>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <span
                key={s}
                title={s}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-card-alt text-xs text-text-faint"
              >
                {s.slice(0, 2)}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/5 pt-5 text-xs text-text-faint md:flex-row md:justify-between">
        <span>© כל הזכויות שמורות</span>
        <span>הצהרת נגישות · מדיניות פרטיות</span>
      </div>
    </footer>
  );
}

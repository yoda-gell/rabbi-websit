import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";

const socials = [
  {
    name: "יוטיוב",
    href: "https://www.youtube.com/@הרבזיסהולץ",
    Icon: YoutubeIcon,
  },
  {
    name: "טיקטוק",
    href: "https://www.tiktok.com/@user6388215149516",
    Icon: TiktokIcon,
  },
  {
    name: "פייסבוק",
    href: "https://www.facebook.com/people/הרב-יעקב-זיסהולץ/100064563317568/",
    Icon: FacebookIcon,
  },
  {
    name: "אינסטגרם",
    href: "https://www.instagram.com/harav_yaakov_zissholtz/",
    Icon: InstagramIcon,
  },
];

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
          </div>
        </div>
        <div>
          <div className="mb-3 font-heading text-sm font-bold text-text-muted">עוקבים</div>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                aria-label={name}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-card-alt text-text-faint transition-colors hover:text-amber"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/5 pt-5 text-xs text-text-faint md:flex-row md:justify-between">
        <span>© כל הזכויות שמורות</span>
        <span className="flex gap-1">
          <Link href="/accessibility" className="hover:text-text">
            הצהרת נגישות
          </Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-text">
            מדיניות פרטיות
          </Link>
        </span>
      </div>
      <div
        dir="ltr"
        className="mx-auto mt-2 max-w-6xl text-right text-xs text-text-faint"
      >
        Created by: יהודה גלר
      </div>
    </footer>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "דף הבית",
};

const quickLinks = [
  {
    href: "/shiurim",
    title: "שיעורי תורה",
    description: "צפה בשיעורים מהיוטיוב",
    icon: "🎥",
  },
  {
    href: "/shaalot",
    title: "שאלות ותשובות",
    description: "שאל שאלה וקבל מענה",
    icon: "💬",
  },
  {
    href: "/luach",
    title: "לוח שיעורים",
    description: "מועדי השיעורים הקרובים",
    icon: "📅",
  },
  {
    href: "/tmicha",
    title: "תרומה",
    description: "תמוך בפעילות התורנית",
    icon: "🤝",
  },
  {
    href: "/odot",
    title: "אודות",
    description: "היכר את הרב",
    icon: "📖",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-[var(--color-primary)] text-white py-16 px-4 text-center"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-2xl mx-auto">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-accent)]"
          >
            ברוכים הבאים
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8">
            שיעורי תורה, שאלות ותשובות, ולוח שיעורים — הכל במקום אחד
          </p>
          <Link
            href="/shiurim"
            className="inline-block bg-[var(--color-accent)] text-[var(--color-primary)] font-bold px-8 py-3 rounded-lg hover:bg-[var(--color-accent-light)] transition-colors text-lg min-h-[44px]"
          >
            לשיעורים
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section
        className="max-w-5xl mx-auto px-4 py-12"
        aria-labelledby="quick-links-heading"
      >
        <h2
          id="quick-links-heading"
          className="text-2xl font-bold text-center text-[var(--color-primary)] mb-8"
        >
          מה תרצה לעשות?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center text-center p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] hover:shadow-md transition-all group min-h-[44px]"
              >
                <span className="text-4xl mb-3" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-bold text-[var(--color-primary)] text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

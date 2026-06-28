import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary)] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-[var(--color-accent)] font-bold mb-3 text-lg">אתר הרב</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              שיעורי תורה, שאלות ותשובות ועוד לקהילה
            </p>
          </div>

          <nav aria-label="ניווט כותרת תחתונה">
            <h3 className="font-semibold mb-3 text-sm text-gray-200">ניווט מהיר</h3>
            <ul className="space-y-2 list-none p-0">
              {[
                { href: "/shiurim", label: "שיעורים" },
                { href: "/shaalot", label: "שאלות ותשובות" },
                { href: "/luach", label: "לוח שיעורים" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[var(--color-accent-light)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-gray-200">צור קשר</h3>
            <Link
              href="/shaalot"
              className="inline-block text-sm bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 rounded-md font-medium hover:bg-[var(--color-accent-light)] transition-colors min-h-[44px] flex items-center"
            >
              שאל שאלה
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--color-primary-light)] pt-4 text-center text-xs text-gray-400">
          © {year} אתר הרב · כל הזכויות שמורות
        </div>
      </div>
    </footer>
  );
}

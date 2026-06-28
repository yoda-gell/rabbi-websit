"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/shiurim", label: "שיעורים" },
  { href: "/shaalot", label: "שאלות ותשובות" },
  { href: "/luach", label: "לוח שיעורים" },
  { href: "/tmicha", label: "תרומה" },
  { href: "/odot", label: "אודות" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-primary)] text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold font-[var(--font-frank-ruhl)] text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors"
          aria-label="דף הבית - אתר הרב"
        >
          אתר הרב
        </Link>

        {/* Desktop nav */}
        <nav aria-label="ניווט ראשי" className="hidden md:block">
          <ul className="flex gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium hover:text-[var(--color-accent-light)] transition-colors focus-visible:text-[var(--color-accent-light)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-[var(--color-primary-light)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-5 space-y-1">
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="ניווט נייד">
          <ul className="list-none m-0 p-0 border-t border-[var(--color-primary-light)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm hover:bg-[var(--color-primary-light)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

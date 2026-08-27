"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "בית" },
  { href: "/shiurim", label: "ספריית הנשמה" },
  { href: "/shaalot", label: "שו״ת אנונימי" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-16">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/rav-portrait.jpg"
            alt="הרב יעקב זיסהולץ"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-heading text-base font-bold leading-tight">
            הרב יעקב זיסהולץ
          </span>
        </Link>

        <nav className="hidden items-center gap-8 font-heading text-sm font-semibold text-text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tmicha"
            className="hidden rounded-xl bg-amber px-5 py-2.5 font-heading text-sm font-bold text-ink sm:inline-block"
          >
            תרומה
          </Link>
          <button
            type="button"
            aria-label="תפריט"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-xl bg-card-alt md:hidden"
          >
            <span className="h-0.5 w-5 rounded bg-text" />
            <span className="h-0.5 w-5 rounded bg-text" />
            <span className="h-0.5 w-3.5 rounded bg-amber" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 px-5 py-3 font-heading text-sm font-semibold text-text-muted md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 hover:bg-card"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2.5 text-amber hover:bg-card"
          >
            צור קשר עם הרב
          </Link>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({
  pendingCount,
  videoCount,
}: {
  pendingCount: number;
  videoCount: number;
}) {
  const pathname = usePathname();

  const links = [
    { href: "/admin/questions", label: "פניות", count: pendingCount },
    { href: "/admin/videos", label: "שיעורי וידאו", count: videoCount },
  ];

  return (
    <nav className="flex flex-1 items-center justify-center gap-x-8">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 font-heading text-sm font-bold ${
              active
                ? "border-amber/25 bg-[#2a2117] text-amber"
                : "border-transparent text-text-muted hover:text-amber"
            }`}
          >
            <span>{link.label}</span>
            <span className="rounded-lg bg-amber px-2 py-0.5 text-xs text-ink">
              {link.count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

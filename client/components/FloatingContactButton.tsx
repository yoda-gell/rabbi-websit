import Link from "next/link";

export default function FloatingContactButton() {
  return (
    <Link
      href="/contact"
      aria-label="צור קשר עם הרב — גם אנונימי"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber shadow-[0_10px_26px_rgba(232,168,92,0.4)]"
    >
      <span className="h-[20px] w-[26px] rounded-[8px_8px_8px_2px] bg-ink" />
    </Link>
  );
}

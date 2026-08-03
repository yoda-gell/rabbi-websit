import PlaceholderImage from "./PlaceholderImage";
import type { Book } from "@/lib/content";

export default function BookCard({ book, className = "" }: { book: Book; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 rounded-2xl bg-card p-3 ${className}`}>
      <PlaceholderImage label="כריכה" className="h-[170px] rounded-xl" />
      <div className="font-heading text-sm font-bold">{book.title}</div>
      <div className="text-xs text-text-faint">{book.subtitle}</div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-heading text-base font-bold text-amber">₪{book.price}</span>
        <span className="rounded-lg bg-card-alt px-3 py-1.5 font-heading text-xs font-bold">
          לרכישה
        </span>
      </div>
    </div>
  );
}

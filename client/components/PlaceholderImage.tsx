export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`placeholder-stripes flex items-center justify-center text-center text-xs text-text-faint ${className}`}
    >
      [ {label} ]
    </div>
  );
}

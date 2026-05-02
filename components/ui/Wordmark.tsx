import Link from "next/link";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

const sizeMap: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export function Wordmark({ size = "md", href = "/", className = "" }: WordmarkProps) {
  return (
    <Link
      href={href}
      aria-label="Guthub home"
      className={`group inline-flex items-baseline gap-[0.05em] font-display font-black tracking-[-0.04em] leading-none text-ink ${sizeMap[size]} ${className}`}
    >
      <span className="italic">G</span>
      <span>uthub</span>
      <span className="ml-[0.15em] inline-block h-[0.18em] w-[0.18em] translate-y-[-0.55em] rounded-full bg-terracotta transition-transform group-hover:scale-125" />
    </Link>
  );
}

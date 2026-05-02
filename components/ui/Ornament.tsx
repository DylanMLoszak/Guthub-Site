type OrnamentProps = {
  variant?: "rule" | "asterisk" | "leaf" | "heart";
  className?: string;
};

export function Ornament({ variant = "asterisk", className = "" }: OrnamentProps) {
  if (variant === "rule") {
    return (
      <svg
        viewBox="0 0 240 16"
        aria-hidden
        className={`h-3 w-auto ${className}`}
      >
        <path
          d="M0 8 L100 8 M140 8 L240 8"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="120" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (variant === "leaf") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className={`h-6 w-6 ${className}`}>
        <path
          d="M32 4 C 18 22 18 42 32 60 C 46 42 46 22 32 4 Z M32 12 L32 56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (variant === "heart") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className={`h-5 w-5 ${className}`}>
        <path
          d="M32 56 C 16 44 6 32 6 22 A 12 12 0 0 1 32 18 A 12 12 0 0 1 58 22 C 58 32 48 44 32 56 Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className}`}>
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.6" y1="4.6" x2="19.4" y2="19.4" />
        <line x1="19.4" y1="4.6" x2="4.6" y2="19.4" />
      </g>
    </svg>
  );
}

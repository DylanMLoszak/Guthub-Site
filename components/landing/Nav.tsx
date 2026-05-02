"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";

const links = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Stories", href: "#stories" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-cream transition-[border-color] duration-300 ${
        scrolled ? "border-b border-ink/30" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <Wordmark size="md" />

        <nav className="hidden md:flex items-center gap-5">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-5">
              <Link
                href={link.href}
                className="eyebrow text-ink transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
              {i < links.length - 1 && (
                <span
                  aria-hidden
                  className="inline-block h-[3px] w-[3px] rounded-full bg-ink/40"
                />
              )}
            </span>
          ))}
        </nav>

        <Link
          href="/swipe"
          className="eyebrow group inline-flex items-center gap-2 rounded-full border border-terracotta px-4 py-2 text-terracotta transition-colors hover:bg-terracotta hover:text-cream"
        >
          Start swiping
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { Ornament } from "@/components/ui/Ornament";

const linkLists: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    heading: "Safety",
    items: [
      { label: "Community", href: "#" },
      { label: "Reporting", href: "#" },
      { label: "Trust", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-4">
            <Wordmark size="md" />
            <p className="mt-5 max-w-[28ch] text-ink-soft" style={{ lineHeight: 1.5 }}>
              A dating app for the plus-size community. Made with care, written like a letter.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {linkLists.map((list) => (
              <div key={list.heading}>
                <h3 className="eyebrow text-ink">{list.heading}</h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {list.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <h3 className="eyebrow text-ink">Newsletter</h3>
            <p className="mt-3 text-ink-soft text-sm" style={{ lineHeight: 1.5 }}>
              Soft notes from the team. Once a month, never sold.
            </p>
            <form
              className="mt-5 flex items-stretch border border-ink/40 bg-cream-deep"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 bg-transparent px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none"
              />
              <button
                type="submit"
                className="eyebrow border-l border-ink/40 bg-ink px-5 text-cream transition-colors hover:bg-ink-soft"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/30 pt-8 md:flex-row md:items-center">
          <p className="eyebrow text-ink-soft">
            © 2026 Guthub · Made with care in Brooklyn · A demo experience
          </p>
          <div className="text-ink-soft">
            <Ornament variant="rule" />
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";

export function SwipeNav() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-ink/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Wordmark size="sm" />
        <span className="eyebrow hidden text-ink-soft md:inline">
          Brooklyn &middot; 5 mile radius
        </span>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-terracotta"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="eyebrow">Back to home</span>
        </Link>
      </div>
    </header>
  );
}

export default SwipeNav;

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@/lib/profiles";

type MatchModalProps = {
  open: boolean;
  matchProfile: Profile | null;
  onClose: () => void;
};

const SPRING = { type: "spring" as const, stiffness: 220, damping: 22 };

export function MatchModal({ open, matchProfile, onClose }: MatchModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && matchProfile && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="It's a match"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grain fixed inset-0 z-[100] flex items-center justify-center bg-oxblood-deep px-6"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={SPRING}
            className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <p
              className="eyebrow text-cream/60"
              style={{ letterSpacing: "0.3em" }}
            >
              A mutual yes
            </p>

            <h1
              className="mt-4 font-display font-extrabold italic text-cream"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
            >
              It&rsquo;s a match<span className="text-terracotta">.</span>
            </h1>

            <div className="mt-10 flex items-center justify-center">
              <motion.div
                initial={{ rotate: -24, scale: 0.6, opacity: 0 }}
                animate={{ rotate: -12, scale: 1, opacity: 1 }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-cream/70 bg-cream-deep shadow-card md:h-40 md:w-40"
              >
                <span className="font-display text-5xl font-extrabold text-ink md:text-6xl">
                  Y
                </span>
              </motion.div>
              <motion.div
                initial={{ rotate: 24, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 12, scale: 1, opacity: 1 }}
                transition={{ ...SPRING, delay: 0.18 }}
                className="relative -ml-6 h-32 w-32 overflow-hidden rounded-full border border-cream/70 shadow-card md:h-40 md:w-40"
              >
                <Image
                  src={matchProfile.photo}
                  alt={matchProfile.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <p className="mt-10 max-w-md font-display text-lg italic text-cream/80 md:text-xl">
              {matchProfile.name} liked you back. Make the first move when
              you&rsquo;re ready.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3 font-display font-semibold text-cream transition-colors hover:bg-terracotta-deep"
              >
                Send a note
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-cream/60 px-7 py-3 font-display font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Keep swiping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MatchModal;

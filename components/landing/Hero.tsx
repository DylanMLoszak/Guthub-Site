"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-20 pb-20 md:px-12 md:pt-32 md:pb-32">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow text-ink-soft"
            >
              01 — A new gospel of romance
            </motion.p>

            <h1
              className="font-display mt-8 text-ink"
              style={{
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              }}
            >
              {[
                { text: "Dating,", delay: 0.1, italic: false },
                { text: "with all", delay: 0.25, italic: true },
                { text: "of you.", delay: 0.4, italic: false, accent: true },
              ].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: line.delay, ease }}
                  className="block"
                >
                  {line.italic ? (
                    <em className="italic" style={{ fontWeight: 500 }}>
                      {line.text}
                    </em>
                  ) : line.accent ? (
                    <>
                      of <span className="text-terracotta">you.</span>
                    </>
                  ) : (
                    line.text
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="font-body mt-10 text-ink-soft md:col-span-6"
              style={{ fontSize: "1.125rem", maxWidth: "38ch", lineHeight: 1.5 }}
            >
              A dating app for the plus-size community. Soft launches, real connections,
              none of the apologetic energy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/swipe"
                className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-4 text-cream transition-all duration-300 hover:bg-terracotta-deep hover:scale-[1.02]"
                style={{ letterSpacing: "0.03em", fontWeight: 500 }}
              >
                Start swiping
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#manifesto"
                className="text-ink underline-offset-4 hover:underline"
                style={{ fontWeight: 500 }}
              >
                Read the manifesto
              </Link>
            </motion.div>
          </div>

          <div className="relative md:col-span-5 md:col-start-8">
            <motion.div
              initial={{ opacity: 0, y: 32, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5 }}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="relative mx-auto aspect-[4/5] w-full max-w-[560px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85&auto=format&fit=crop"
                alt="A portrait of someone smiling, full of warmth."
                fill
                priority
                sizes="(min-width: 768px) 42vw, 90vw"
                className="object-cover"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 12 }}
                className="absolute -top-6 -right-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-terracotta text-cream shadow-card"
              >
                <div className="font-display text-center leading-tight" style={{ fontWeight: 700 }}>
                  <div className="text-sm italic">est. &rsquo;26</div>
                  <div className="my-1 mx-auto h-px w-8 bg-cream/60" />
                  <div className="text-[0.7rem] tracking-[0.18em] uppercase font-body" style={{ fontWeight: 600 }}>
                    made with
                  </div>
                  <div className="text-[0.7rem] tracking-[0.18em] uppercase font-body" style={{ fontWeight: 600 }}>
                    love
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative mt-24 flex items-center">
          <div className="h-px flex-1 bg-ink/40" />
          <div className="absolute left-1/4 h-[5px] w-[5px] rounded-full bg-ink" />
          <div className="absolute left-1/2 h-[5px] w-[5px] rounded-full bg-ink" />
          <div className="absolute left-3/4 h-[5px] w-[5px] rounded-full bg-ink" />
        </div>
      </div>
    </section>
  );
}

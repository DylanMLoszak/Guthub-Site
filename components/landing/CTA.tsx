import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full bg-cream-deep">
      <div className="mx-auto w-full max-w-[60rem] px-6 py-24 md:py-32 text-center">
        <p className="eyebrow text-ink-soft">Ready when you are.</p>

        <h2
          className="font-display mt-8 text-ink mx-auto"
          style={{
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            maxWidth: "20ch",
          }}
        >
          Come find someone who already likes how you look in this light.
        </h2>

        <div className="mt-12 flex justify-center">
          <Link
            href="/swipe"
            className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-8 py-4 text-cream transition-all duration-300 hover:bg-terracotta-deep hover:scale-[1.02]"
            style={{ letterSpacing: "0.03em", fontWeight: 500 }}
          >
            Start swiping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="eyebrow mt-8 text-ink-soft">
          Free during soft launch · Never sold.
        </p>
      </div>
    </section>
  );
}

import { Ornament } from "@/components/ui/Ornament";

const stats = [
  { stat: "1.2M", label: "members in soft-launch" },
  { stat: "63%", label: "match within their first week" },
  { stat: "Zero", label: "filters that erase you" },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-oxblood text-cream grain"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-28 md:px-12 md:py-36">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-cream/60">02 — Manifesto</p>

            <blockquote
              className="font-display mt-10 italic text-cream"
              style={{
                fontWeight: 700,
                lineHeight: 1.05,
                maxWidth: "22ch",
                fontSize: "clamp(2.5rem, 6vw, 5.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              &ldquo;We were tired of being a niche. So we built our own front door.&rdquo;
            </blockquote>

            <div className="mt-12 text-terracotta">
              <Ornament variant="leaf" />
            </div>
          </div>

          <div className="md:col-span-4 md:pt-10">
            <ul className="flex flex-col gap-6">
              {stats.map((s) => (
                <li
                  key={s.stat}
                  className="border border-cream/20 bg-cream/5 p-6"
                >
                  <div
                    className="font-display text-cream"
                    style={{ fontWeight: 700, fontSize: "2.75rem", lineHeight: 1 }}
                  >
                    {s.stat}
                  </div>
                  <div className="eyebrow mt-3 text-cream/70">{s.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

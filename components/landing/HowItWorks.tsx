type Step = {
  num: string;
  title: string;
  body: string;
  colSpan: string;
  offset: string;
};

const steps: Step[] = [
  {
    num: "01.",
    title: "Make a real profile",
    body: "Three photos that look like you on a Tuesday. Two prompts that say something true. We don't measure you in inches.",
    colSpan: "md:col-span-4 md:col-start-1",
    offset: "",
  },
  {
    num: "02.",
    title: "Swipe with intention",
    body: "No infinite scroll, no juiced algorithms. Forty profiles a day, hand-curated, then we leave you alone.",
    colSpan: "md:col-span-4 md:col-start-5",
    offset: "md:mt-24",
  },
  {
    num: "03.",
    title: "Meet on purpose",
    body: "When you match, we nudge you toward a date in your city — not a six-week chat marathon.",
    colSpan: "md:col-span-4 md:col-start-9",
    offset: "",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-soft">03 — How it works</p>
            <h2
              className="font-display mt-6 text-ink"
              style={{
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
              }}
            >
              Three small acts of confidence.
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-8">
          {steps.map((s) => (
            <article
              key={s.num}
              className={`${s.colSpan} ${s.offset} flex flex-col border-t border-ink pt-8`}
            >
              <span
                className="font-display italic text-terracotta text-7xl leading-none"
                style={{ fontWeight: 700 }}
              >
                {s.num}
              </span>
              <h3
                className="font-display mt-8 text-ink"
                style={{ fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.15 }}
              >
                {s.title}
              </h3>
              <p
                className="mt-4 text-ink-soft"
                style={{ fontSize: "1.0625rem", lineHeight: 1.55 }}
              >
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

type Story = {
  photoId: string;
  alt: string;
  rotate: string;
  quote: React.ReactNode;
  body: string;
  attribution: string;
  reverse: boolean;
};

const stories: Story[] = [
  {
    photoId: "photo-1502823403499-6ccfcf4fb453",
    alt: "Portrait of Nadia, smiling softly.",
    rotate: "-rotate-[1.5deg]",
    quote: (
      <>He read me a poem on our second date and I cried in a <em className="italic">good</em> way.</>
    ),
    body: "I'd been on every app. I'd been a punchline on most of them. Guthub was the first place where my photos didn't feel like a confession. We met for coffee, then walked along the river until the cafés closed.",
    attribution: "Nadia, 32 — Lisbon",
    reverse: false,
  },
  {
    photoId: "photo-1517841905240-472988babdf9",
    alt: "Portrait of Andre, looking off to the side.",
    rotate: "rotate-[2deg]",
    quote: (
      <>She showed up wearing the dress from her profile. I told her she looked like a Sunday.</>
    ),
    body: "I'd stopped expecting much. The other apps had taught me to apologize before I'd even said hello. Here, the people felt unhurried. Less performance, more conversation. We're three months in and she still texts in full sentences.",
    attribution: "Andre, 38 — Brooklyn",
    reverse: true,
  },
];

function StorySpread({ story }: { story: Story }) {
  const photoUrl = `https://images.unsplash.com/${story.photoId}?w=900&q=85&auto=format&fit=crop`;

  return (
    <article className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-8 md:items-center">
      <div
        className={`md:col-span-5 ${
          story.reverse ? "md:col-start-8 md:row-start-1" : "md:col-start-1"
        }`}
      >
        <div className={`relative mx-auto aspect-[4/5] w-full max-w-[440px] ${story.rotate}`}>
          <Image
            src={photoUrl}
            alt={story.alt}
            fill
            sizes="(min-width: 768px) 36vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      <div
        className={`md:col-span-6 ${
          story.reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7"
        }`}
      >
        <div className="border-t border-ink pt-8">
          <blockquote
            className="font-display italic text-oxblood"
            style={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.3 }}
          >
            &ldquo;{story.quote}&rdquo;
          </blockquote>

          <div className="my-8 h-px w-full bg-ink/30" />

          <p className="text-ink-soft" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            {story.body}
          </p>

          <div className="my-8 h-px w-full bg-ink/30" />

          <p className="eyebrow text-ink">{story.attribution}</p>
        </div>
      </div>
    </article>
  );
}

export default function Stories() {
  return (
    <section id="stories" className="w-full bg-cream-pale">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-ink-soft">04 — Stories</p>
            <h2
              className="font-display mt-6 text-ink"
              style={{
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
              }}
            >
              Real members. Real punctuation.
            </h2>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-24">
          {stories.map((s) => (
            <StorySpread key={s.attribution} story={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

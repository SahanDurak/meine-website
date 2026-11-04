import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { DuotoneFilters } from "@/components/duotone-filters";
import { LoopVideo } from "@/components/loop-video";
import { PencilStroke } from "@/components/pencil-stroke";
import { creativeEntries } from "@/content/creative/entries";

export const metadata: Metadata = pageMetadata({
  title: "Creative Outlet",
  description:
    "Drawings, animations and other things made for fun, newest first.",
  path: "/creative",
});

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function CreativePage() {
  const entries = [...creativeEntries].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    // Creative Outlet writes in sea (brief, section 2).
    <section className="flex flex-col gap-12 [--pen:var(--sea)]">
      <DuotoneFilters />
      <header className="flex flex-col gap-3">
        {/* Large handwritten heading: Creative Outlet only, 32 px and up, own
            letter spacing kept (no tracking), no faux bold. */}
        <h1 className="font-hand text-4xl leading-tight uppercase sm:text-5xl">
          <PencilStroke tone="sea">Creative</PencilStroke> Outlet
        </h1>
        <p className="text-pencil">
          Drawings, animations and other things made for fun, newest first.
        </p>
      </header>

      <ol className="flex flex-col gap-16">
        {entries.map((entry, index) => (
          <li key={entry.slug}>
            <article
              aria-labelledby={`${entry.slug}-title`}
              className="flex flex-col gap-4"
            >
              {/* Loose sheet: slightly tilted, alternating per entry. The
                  sheet has its own paper background behind the duotone
                  video. */}
              <div
                className={`relative border border-line bg-paper p-3 sm:p-4 ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
              >
                <LoopVideo
                  src={entry.video}
                  still={entry.still}
                  width={entry.width}
                  height={entry.height}
                  label={`${entry.title}, hand-drawn animation`}
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-3 right-4 bg-paper px-2 font-mono text-xs tracking-wider text-pencil uppercase"
                >
                  FIG. {String(entries.length - index).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs tracking-wider text-pencil uppercase">
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  {" · "}
                  {entry.type}
                </p>
                <h2
                  id={`${entry.slug}-title`}
                  className="text-xl font-semibold tracking-[-0.02em]"
                >
                  {entry.title}
                </h2>
                <p className="max-w-prose leading-relaxed text-pencil">
                  {entry.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

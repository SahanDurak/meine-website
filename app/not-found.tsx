import type { Metadata } from "next";
import Link from "next/link";
import { DuotoneFilters } from "@/components/duotone-filters";
import { LoopVideo } from "@/components/loop-video";
import { creativeEntries } from "@/content/creative/entries";

// Next.js adds noindex to not-found responses itself.
export const metadata: Metadata = {
  title: "Page not found",
};

// The Ball from the Creative Outlet ends here: its last frame is the still,
// "THE END!" the punchline. Large handwriting is otherwise reserved for the
// Creative Outlet; this page is the deliberate exception.
export default function NotFound() {
  const ball = creativeEntries.find((entry) => entry.slug === "the-ball");
  return (
    <section className="flex flex-col gap-8 [--pen:var(--sea)]">
      <DuotoneFilters />
      <p className="font-mono text-xs tracking-wider text-pencil uppercase">
        404 · page not found
      </p>
      <h1 className="-mt-2 font-hand text-5xl leading-tight uppercase sm:text-7xl">
        The end!
      </h1>
      {ball && (
        <div className="my-2 w-full max-w-xl -rotate-1 border border-line bg-paper p-3 sm:p-4">
          <LoopVideo
            src={ball.video}
            still={ball.still}
            width={ball.width}
            height={ball.height}
            label={`${ball.title}, hand-drawn animation`}
          />
        </div>
      )}
      <p className="text-pencil">This page does not exist (anymore).</p>
      <Link
        href="/"
        className="-ml-2 inline-flex min-h-11 w-fit items-center gap-2 px-2 font-mono text-xs tracking-wider text-ink uppercase underline decoration-pencil underline-offset-4 fine:hover:decoration-pen"
      >
        <span aria-hidden="true">←</span> Back to the start
      </Link>
    </section>
  );
}

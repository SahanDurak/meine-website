import type { Metadata } from "next";
import { SectionLink } from "@/components/section-link";

export const metadata: Metadata = {
  title: { absolute: "Sahan – Engineering, Robotics and AI" },
  description:
    "Personal website of Sahan, an industrial engineering student interested in robotics and AI. Read the blog or explore the creative outlet.",
};

const sections = [
  {
    href: "/about",
    label: "About",
    description:
      "A bit more about what I study, what I work on and what keeps me curious.",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Articles and thoughts, written down properly.",
  },
  {
    href: "/creative",
    label: "Creative Outlet",
    description: "A playful corner for texts, images and videos, newest first.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      <section className="flex flex-col">
        <p className="font-mono text-xs tracking-wide text-muted motion-safe:animate-rise">
          Lübeck · Industrial Engineering · Product · AI
        </p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.02] font-normal tracking-[-0.03em] text-balance motion-safe:animate-rise motion-safe:[animation-delay:80ms] sm:text-7xl">
          Hi, I&apos;m Sahan.
        </h1>
        <p className="mt-4 font-serif text-2xl leading-snug text-accent italic motion-safe:animate-rise motion-safe:[animation-delay:160ms] sm:text-3xl">
          Where <em className="font-semibold">robotics and AI</em> meet.
        </p>
        <p className="mt-10 max-w-xl text-lg leading-8 text-muted motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
          I study Industrial Engineering with a focus on Mechanical Engineering,
          and I work on software and AI solutions as a working student in
          product management. I&apos;m most curious about the place where
          robotics and AI meet. This site is where I write, collect and try
          things out.
        </p>
      </section>

      <nav
        aria-label="Sections"
        className="flex flex-col divide-y divide-foreground/15 border-y border-foreground/15 motion-safe:animate-rise motion-safe:[animation-delay:320ms]"
      >
        {sections.map((section, i) => (
          <SectionLink key={section.href} {...section} index={i + 1} />
        ))}
      </nav>
    </div>
  );
}

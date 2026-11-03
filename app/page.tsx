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
    index: "A",
    description:
      "A bit more about what I study, what I work on and what keeps me curious.",
  },
  {
    href: "/blog",
    label: "Blog",
    index: "B",
    description: "Articles and thoughts, written down properly.",
  },
  {
    href: "/creative",
    label: "Creative Outlet",
    index: "C",
    description: "A playful corner for texts, images and videos, newest first.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <section className="relative flex flex-col gap-6 pb-8">
        <div
          aria-hidden="true"
          className="bp-grid pointer-events-none absolute -top-16 -right-6 bottom-0 -left-6 -z-10"
        />
        <p
          aria-hidden="true"
          className="font-mono text-xs tracking-widest text-accent uppercase"
        >
          FIG. 01 / SAHAN
        </p>
        <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
          Hi, I&apos;m Sahan.
        </h1>
        <p className="font-display text-xl leading-snug text-accent">
          Robotics × AI, seen through an engineer&apos;s eyes.
        </p>
        <p className="max-w-xl text-lg leading-8 text-muted">
          I study Industrial Engineering with a focus on Mechanical Engineering,
          and I work on software and AI solutions as a working student in
          product management. I&apos;m most curious about the place where
          robotics and AI meet. This site is where I write, collect and try
          things out.
        </p>
      </section>

      <nav
        aria-label="Sections"
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {sections.map((section) => (
          <SectionLink key={section.href} {...section} />
        ))}
      </nav>
    </div>
  );
}

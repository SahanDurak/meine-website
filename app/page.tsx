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
    <div className="flex flex-col gap-16 sm:gap-20">
      <section className="flex flex-col gap-6">
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
          Hi, I&apos;m Sahan.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I study Industrial Engineering with a focus on Mechanical Engineering,
          and I work on software and AI solutions as a working student in
          product management. I&apos;m most curious about the place where
          robotics and AI meet. This site is where I write, collect and try
          things out.
        </p>
      </section>

      <nav
        aria-label="Sections"
        className="flex flex-col divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10"
      >
        {sections.map((section) => (
          <SectionLink key={section.href} {...section} />
        ))}
      </nav>
    </div>
  );
}

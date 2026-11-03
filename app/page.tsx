import type { Metadata } from "next";
import { Blob } from "@/components/blob";
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
      <section className="relative flex flex-col gap-6">
        <Blob className="absolute -top-16 -right-6 -z-10 size-64 sm:-top-24 sm:size-96" />
        <h1 className="font-serif text-5xl leading-[1.05] font-normal tracking-tight text-balance sm:text-7xl">
          Hi, I&apos;m <em>Sahan</em>.
        </h1>
        <p className="font-medium text-accent">
          Engineering, robotics, a bit of nature and good books.
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
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {sections.map((section) => (
          <SectionLink key={section.href} {...section} />
        ))}
      </nav>
    </div>
  );
}

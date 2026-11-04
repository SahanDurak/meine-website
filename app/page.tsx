import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { DimensionLine } from "@/components/dimension-line";
import { PencilStroke } from "@/components/pencil-stroke";
import { SectionLink } from "@/components/section-link";
import { TapedPhoto } from "@/components/taped-photo";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Sahan – Engineering, Robotics and AI" },
  description:
    "Personal website of Sahan, an industrial engineering student interested in robotics and AI. Read the blog or explore the creative outlet.",
  path: "/",
});

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

// Starts the underline after the hero drawing has mostly finished (see globals.css).
const underlineDelay = { "--i": 12 } as CSSProperties;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <section className="grid gap-x-10 gap-y-8 sm:grid-cols-[1fr_15rem]">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
            Hi, I&apos;m <PencilStroke tone="moss">Sahan.</PencilStroke>
          </h1>
          <p className="max-w-xl text-lg leading-8">
            I study Industrial Engineering and I&apos;ve been into tech since I
            was a kid, which pretty much shows in everything I{" "}
            {/* nowrap: the face never ends up alone on its own line. */}
            <span className="whitespace-nowrap">
              do.
              <svg
                aria-hidden="true"
                viewBox="0 0 40 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sketch-draw ml-2 inline-block h-7 w-11 -rotate-6 align-middle text-pencil"
              >
                <path
                  pathLength={1}
                  d="M9.5 5 C 11.5 4.6, 12 7.4, 10 7.6 S 8.2 5.6, 9.8 5.4"
                />
                <path
                  pathLength={1}
                  d="M29.8 4.6 C 31.8 4.4, 32 7.2, 30.2 7.3 S 28.6 5.2, 30 5"
                />
                <path
                  pathLength={1}
                  d="M8 17 C 14 18.2, 19 15.8, 25 17.4 S 32 17, 34 16.2"
                />
              </svg>
            </span>
          </p>
          <p className="max-w-xl text-lg leading-8">
            I love working on projects that cross disciplines, like{" "}
            {/* leading-none: the underline follows the word's letters, not the
                32 px line box, so it sits right under "robotics" wherever the
                line wraps (the word itself never breaks). */}
            <span className="relative inline-block leading-none">
              robotics
              <svg
                aria-hidden="true"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sketch-draw pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 w-full text-pencil"
              >
                <path
                  pathLength={1}
                  d="M1 5 C 18 1, 34 7, 52 3 S 84 5, 99 2"
                  style={underlineDelay}
                />
              </svg>
            </span>{" "}
            &amp; AI. Outside of that: nature (mountains and the sea most of
            all), travelling and sports.
          </p>
          <p className="max-w-xl text-lg leading-8">
            This is where I share my thoughts and the cool projects I build in
            my &quot;free time&quot;, if I still have any, haha.
          </p>
        </div>

        <div className="flex items-start gap-3 sm:flex-col sm:gap-2">
          <TapedPhoto className="w-44 flex-none sm:w-full" />
          {/* The only margin note on this screen. */}
          <p
            aria-hidden="true"
            className="flex items-start gap-1 pt-4 font-hand text-xl leading-tight text-red uppercase sm:pt-0 sm:pl-4"
          >
            <svg
              viewBox="0 0 28 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1 h-7 w-6 flex-none -rotate-12 sm:rotate-0"
            >
              <path d="M22 30 C 8 28, 4 16, 6 4" />
              <path d="M1 10 L6 3 L12 9" />
            </svg>
            <span className="pt-2">still sketching</span>
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-2">
        <DimensionLine />
        <nav
          aria-label="Sections"
          className="flex flex-col divide-y divide-line border-y border-line"
        >
          {sections.map((section, index) => (
            <SectionLink key={section.href} index={index} {...section} />
          ))}
        </nav>
      </div>
    </div>
  );
}

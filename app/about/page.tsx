import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/about/copy-email-button";
import { MarginNote } from "@/components/about/margin-note";
import { ProjectCard } from "@/components/about/project-card";
import { Section } from "@/components/about/section";
import { TextLink } from "@/components/about/text-link";
import { Timeline, TimelineItem } from "@/components/about/timeline";
import {
  career,
  contact,
  contactEmail,
  education,
  interests,
  intro,
  introNote,
  projects,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sahan: projects, career, education, interests and how to get in touch.",
};

// Fixed label column; the value wraps inside its own column on small screens.
const rowClass = "grid min-h-11 grid-cols-[4.5rem_1fr] items-center gap-x-4";

export default function AboutPage() {
  return (
    // About writes in moss (brief, section 2).
    <div className="flex flex-col gap-14 [--pen:var(--moss)] sm:gap-16">
      <section className="flex flex-col gap-6">
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
          About
        </h1>
        <div className="flex flex-col gap-4">
          {intro.map((paragraph) => (
            <p key={paragraph} className="max-w-xl text-lg leading-8">
              {paragraph}
            </p>
          ))}
        </div>
        {/* The only red margin note on this page. */}
        <MarginNote>{introNote}</MarginNote>
      </section>

      <Section id="projects" title="Projects">
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ul>
      </Section>

      <Section id="career" title="Career">
        <Timeline>
          {career.map((role) => (
            <TimelineItem key={role.company} period={role.period}>
              <h3 className="text-lg font-medium tracking-[-0.01em]">
                {role.company}
                <span className="font-normal text-pencil">
                  {" "}
                  · {role.location}
                </span>
              </h3>
              <p>{role.title}</p>
              <p className="text-sm leading-6 text-pencil">
                {role.companyNote}
              </p>
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 marker:text-pencil">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="max-w-xl leading-7">
                    {highlight}
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section id="education" title="Education">
        <Timeline>
          {education.map((entry) => (
            <TimelineItem key={entry.degree} period={entry.period}>
              <h3 className="font-medium">{entry.degree}</h3>
              <p className="text-sm text-pencil">{entry.school}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section id="interests" title="Interests">
        <ul className="flex flex-wrap gap-2">
          {interests.map(({ label, detail }) => (
            <li
              key={label}
              className="flex items-baseline gap-2 border border-line px-3 py-1.5"
            >
              <span>{label}</span>
              {detail && (
                <span className="font-mono text-xs tracking-wider text-pencil uppercase">
                  {detail}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <ul className="flex flex-col divide-y divide-line border-b border-line">
          {contact.map((item) => (
            <li key={item.label} className={rowClass}>
              <span className="font-mono text-xs tracking-wider text-pencil uppercase">
                {item.label}
              </span>
              <div className="flex flex-wrap items-center gap-x-3">
                {item.kind === "external" && (
                  <TextLink kind="external" href={item.href}>
                    {item.display}
                  </TextLink>
                )}
                {item.kind === "email" && (
                  <>
                    <a
                      href={`mailto:${item.address}`}
                      className="inline-flex min-h-11 items-center underline decoration-pencil decoration-1 underline-offset-4 fine:hover:decoration-pen"
                    >
                      {item.address}
                    </a>
                    <CopyEmailButton address={contactEmail} />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

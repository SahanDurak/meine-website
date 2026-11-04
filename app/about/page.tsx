import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/about/copy-email-button";
import { MarginNote } from "@/components/about/margin-note";
import { ProjectCard } from "@/components/about/project-card";
import { Section } from "@/components/about/section";
import { TextLink } from "@/components/about/text-link";
import { Timeline, TimelineItem } from "@/components/about/timeline";
import {
  books,
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

const rowClass = "flex min-h-11 flex-wrap items-center gap-x-4 gap-y-1";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-14 sm:gap-16">
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
        {/* The only accent margin note on this page. */}
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

      <Section id="books" title="Books">
        <MarginNote tone="pencil">on my desk</MarginNote>
        <ul className="flex flex-col divide-y divide-line border-b border-line">
          {books.map(({ title, author }, index) => (
            <li key={index} className="py-3">
              {title} – <span className="text-pencil">{author}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <ul className="flex flex-col divide-y divide-line border-b border-line">
          {contact.map((item) => (
            <li key={item.label} className={rowClass}>
              <span className="w-20 font-mono text-xs tracking-wider text-pencil uppercase">
                {item.label}
              </span>
              {item.kind === "external" && (
                <TextLink kind="external" href={item.href}>
                  {item.display}
                </TextLink>
              )}
              {item.kind === "todo" && (
                <span className="text-pencil">{item.display}</span>
              )}
              {item.kind === "email" && (
                <>
                  <a
                    href={`mailto:${item.address}`}
                    className="inline-flex min-h-11 items-center underline decoration-pencil decoration-1 underline-offset-4 fine:hover:decoration-accent"
                  >
                    {item.address}
                  </a>
                  <CopyEmailButton address={contactEmail} />
                </>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

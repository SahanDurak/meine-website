import type { LegalPage } from "@/content/legal";

type LegalPageViewProps = {
  page: LegalPage;
};

// German legal text (Impressum, Datenschutz): plain and readable, technical
// layer only. lang="de" because the rest of the site is English.
export function LegalPageView({ page }: LegalPageViewProps) {
  return (
    <article lang="de" className="flex max-w-prose flex-col gap-10 break-words">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance hyphens-auto sm:text-5xl">
          {page.title}
        </h1>
        {page.intro && <p className="leading-7 text-pencil">{page.intro}</p>}
      </header>
      {page.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.01em]">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-7 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}

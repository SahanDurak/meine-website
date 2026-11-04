import type { LegalBlock, LegalPage } from "@/content/legal";

type LegalPageViewProps = {
  page: LegalPage;
};

const headingClass = {
  2: "mt-6 text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance hyphens-auto",
  3: "mt-3 text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-balance hyphens-auto",
  4: "mt-1 font-semibold leading-7",
} as const;

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as const;
      return <Tag className={headingClass[block.level]}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="leading-7 whitespace-pre-line">{block.text}</p>;
    case "list":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-6 leading-7 marker:text-pencil">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "source":
      return (
        <p className="leading-7">
          {block.label}{" "}
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-pencil decoration-1 underline-offset-4 fine:hover:decoration-pen"
          >
            {block.text}
            <span aria-hidden="true" className="font-mono text-xs">
              {" "}
              ↗
            </span>
            <span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </p>
      );
  }
}

// German legal text (Impressum, Datenschutz): plain and readable, technical
// layer only. lang="de" because the rest of the site is English.
export function LegalPageView({ page }: LegalPageViewProps) {
  return (
    <article lang="de" className="flex max-w-prose flex-col gap-4 break-words">
      <h1 className="mb-4 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance hyphens-auto sm:text-5xl">
        {page.title}
      </h1>
      {/* Static text that is never reordered, so the index is a stable key. */}
      {page.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </article>
  );
}

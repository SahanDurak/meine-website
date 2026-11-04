import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { isValidElement } from "react";

// Article typography (brief, section 3): Geist for running text with
// leading 1.75 and about 65 characters per line, Geist Mono for code and
// labels, ink on paper, pencil for the technical layer.

const linkClass =
  "underline decoration-pencil decoration-1 underline-offset-4 fine:hover:decoration-pen";

function MdxLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link {...props} href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
      <span aria-hidden="true" className="font-mono text-xs">
        {" "}
        ↗
      </span>
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

// Reads the language from the class MDX puts on the inner <code>
// ("language-ts") and shows it as a mono label on the drawing-sheet frame.
function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const code = isValidElement(children)
    ? (children as ReactElement<{ className?: string }>)
    : null;
  const language = code?.props.className?.match(/language-(\S+)/)?.[1];

  return (
    <figure className="relative my-6 border border-line">
      {/* Corner ticks, like a drawing sheet. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px size-2 border-t border-l border-pencil"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -bottom-px size-2 border-r border-b border-pencil"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -right-px size-2 border-t border-r border-pencil"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -left-px size-2 border-b border-l border-pencil"
      />
      {language && (
        <figcaption className="border-b border-line px-4 py-1.5 font-mono text-xs tracking-wider text-pencil uppercase">
          {language}
        </figcaption>
      )}
      <pre
        {...props}
        // Focusable so long lines can be scrolled with the keyboard.
        tabIndex={0}
        role="region"
        aria-label={language ? `Code (${language})` : "Code"}
        className="overflow-x-auto px-4 py-3 font-mono text-sm leading-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm"
      >
        {children}
      </pre>
    </figure>
  );
}

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-3 text-2xl leading-[1.1] font-semibold tracking-[-0.02em]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-2 text-lg leading-[1.2] font-semibold tracking-[-0.01em]"
      {...props}
    />
  ),
  p: (props) => <p className="my-3 text-lg leading-[1.75]" {...props} />,
  a: MdxLink,
  ul: (props) => (
    <ul
      className="my-3 flex list-disc flex-col gap-1.5 pl-6 text-lg leading-[1.75] marker:text-pencil"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-3 flex list-decimal flex-col gap-1.5 pl-6 text-lg leading-[1.75] marker:font-mono marker:text-sm marker:text-pencil"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l border-pencil pl-5 text-pencil [&_p]:text-lg"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  code: (props) => (
    <code
      className="rounded-sm border border-line px-1 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

import type { Project } from "@/content/about";
import { TextLink } from "./text-link";

const corners = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

// Drawing-sheet card: 1 px line border plus small corner ticks.
export function ProjectCard({ title, summary, stack, link }: Project) {
  return (
    <li className="relative flex flex-col gap-3 border border-line p-5">
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`pointer-events-none absolute size-2 border-pencil ${position}`}
        />
      ))}
      <h3 className="text-lg font-medium tracking-[-0.01em]">{title}</h3>
      <p className="leading-7">{summary}</p>
      <ul
        aria-label="Stack"
        className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs tracking-wider text-pencil uppercase"
      >
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {link && (
        <TextLink kind={link.kind} href={link.href}>
          {link.label}
        </TextLink>
      )}
    </li>
  );
}

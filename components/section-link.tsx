import Link from "next/link";

type SectionLinkProps = {
  href: string;
  label: string;
  description: string;
  index: string;
};

const corners = [
  "-top-px -left-px border-t border-l",
  "-top-px -right-px border-t border-r",
  "-bottom-px -left-px border-b border-l",
  "-right-px -bottom-px border-r border-b",
] as const;

export function SectionLink({
  href,
  label,
  description,
  index,
}: SectionLinkProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col gap-4 border border-foreground/15 bg-background p-5 outline-none hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-colors motion-safe:duration-200"
    >
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute size-2 border-accent ${position}`}
        />
      ))}
      <span className="flex flex-col gap-2">
        <span className="font-display text-xl font-medium tracking-tight">
          {label}
        </span>
        {/* Dimension line: static when motion is reduced, grows on hover otherwise. */}
        <span
          aria-hidden="true"
          className="flex h-2 items-center text-muted group-hover:text-accent group-focus-visible:text-accent motion-safe:text-accent"
        >
          <span className="h-px w-full origin-left bg-current opacity-60 motion-safe:scale-x-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-x-100 motion-safe:group-focus-visible:scale-x-100" />
        </span>
      </span>
      <span className="text-sm leading-6 text-muted">{description}</span>
      <span
        aria-hidden="true"
        className="mt-auto pt-2 font-mono text-xs tracking-widest text-muted uppercase"
      >
        {index} / {label}
      </span>
    </Link>
  );
}

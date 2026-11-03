import Link from "next/link";

type SectionLinkProps = {
  href: string;
  label: string;
  description: string;
  index: number;
};

export function SectionLink({
  href,
  label,
  description,
  index,
}: SectionLinkProps) {
  return (
    <Link
      href={href}
      className="group -mx-3 grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-2 rounded-sm px-3 py-6 outline-none hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent motion-safe:transition-colors motion-safe:duration-200 sm:grid-cols-[3.5rem_1fr_auto]"
    >
      <span
        aria-hidden="true"
        className="font-mono text-xs text-muted tabular-nums"
      >
        {String(index).padStart(2, "0")}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
          {label}
        </span>
        <span className="text-sm leading-6 text-muted">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className="text-muted group-hover:text-accent motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

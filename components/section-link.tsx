import Link from "next/link";

type SectionLinkProps = {
  href: string;
  label: string;
  description: string;
};

export function SectionLink({ href, label, description }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between gap-6 rounded-3xl bg-surface p-6 outline-none hover:ring-1 hover:ring-accent/40 focus-visible:ring-2 focus-visible:ring-accent motion-safe:transition-shadow motion-safe:duration-200"
    >
      <span className="flex flex-col gap-2">
        <span className="text-lg font-medium tracking-tight">{label}</span>
        <span className="text-sm leading-6 text-muted">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className="text-accent motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

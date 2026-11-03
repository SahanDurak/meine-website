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
      className="group -mx-3 flex items-baseline justify-between gap-6 rounded-lg px-3 py-5 outline-none hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-zinc-900 motion-safe:transition-colors motion-safe:duration-200 dark:hover:bg-white/[0.05] dark:focus-visible:ring-zinc-100"
    >
      <span className="flex flex-col gap-1">
        <span className="text-lg font-medium tracking-tight">{label}</span>
        <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-zinc-400 group-hover:text-foreground motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 dark:text-zinc-500"
      >
        →
      </span>
    </Link>
  );
}

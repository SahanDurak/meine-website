import Link from "next/link";

type SectionLinkProps = {
  href: string;
  label: string;
  description: string;
  index: number;
};

// 12 teeth, 30 degrees apart: one tick turns the gear by exactly one tooth.
const teeth = Array.from({ length: 12 }, (_, i) => i * 30);

export function SectionLink({
  href,
  label,
  description,
  index,
}: SectionLinkProps) {
  return (
    <Link
      href={href}
      className="group grid min-h-11 grid-cols-[1.75rem_1fr_auto] items-start gap-x-3 py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-4"
    >
      <span
        aria-hidden="true"
        className="pt-1.5 font-mono text-xs tracking-wider text-pencil"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-lg font-medium tracking-[-0.01em]">
          <span className="relative inline-block">
            {label}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 fine:group-hover:scale-x-100"
            />
          </span>
        </span>
        <span className="text-sm leading-6 text-pencil">{description}</span>
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-7 text-pencil ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:fine:group-hover:rotate-30"
      >
        <circle cx="14" cy="14" r="8" />
        <circle cx="14" cy="14" r="2.5" />
        {teeth.map((angle) => (
          <path
            key={angle}
            d="M21.9 12.9 L24.5 13.1 L24.5 14.9 L21.9 15.1"
            transform={`rotate(${angle} 14 14)`}
          />
        ))}
      </svg>
    </Link>
  );
}

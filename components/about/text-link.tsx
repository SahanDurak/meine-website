import Link from "next/link";

// Ink text, always-visible pencil underline, the area's pencil (--pen) only on fine-pointer hover.
// min-h-11 keeps the target at 44 px.
const linkClass =
  "inline-flex min-h-11 items-center gap-1 underline decoration-pencil decoration-1 underline-offset-4 fine:hover:decoration-pen";

type TextLinkProps = {
  kind: "external" | "internal";
  href: string;
  children: string;
};

export function TextLink({ kind, href, children }: TextLinkProps) {
  if (kind === "internal") {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
      <span aria-hidden="true" className="font-mono text-xs">
        ↗
      </span>
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
}

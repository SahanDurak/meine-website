import Link from "next/link";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

// Quiet footer on every page: a hairline and two mono links (German, like
// the pages they lead to).
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 px-6">
        <p className="py-3 font-mono text-xs tracking-wider text-pencil uppercase">
          © Sahan Durak
        </p>
        <nav aria-label="Legal" className="-mr-2 flex flex-wrap">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              lang="de"
              className="group flex min-h-11 items-center px-2 font-mono text-xs tracking-wider text-pencil uppercase fine:hover:text-ink"
            >
              <span className="relative py-1">
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-pen ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 fine:group-hover:scale-x-100"
                />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

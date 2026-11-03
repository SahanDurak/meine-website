import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Über mich" },
  { href: "/blog", label: "Blog" },
  { href: "/creative", label: "Creative" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

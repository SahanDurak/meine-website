import { NavLink } from "@/components/nav-link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/creative", label: "Creative" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 px-6">
        <nav aria-label="Main navigation" className="-ml-2 flex flex-wrap">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* Decorative only: nothing is measured, so the label states no status. */}
        <div
          aria-hidden="true"
          className="-mr-2 ml-auto flex items-center gap-2 px-2 font-mono text-xs tracking-wider text-pencil uppercase"
        >
          <span className="size-2 rounded-full bg-led motion-safe:animate-led" />
          home lab
        </div>
      </div>
    </header>
  );
}

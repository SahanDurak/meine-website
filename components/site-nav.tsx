import { Suspense } from "react";
import { NavLink, NavLinkView } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";

// Each area has its own coloured pencil (brief, section 2), used for the
// heading stroke and the current-page loop.
const navItems = [
  { href: "/", label: "Home", tone: "moss" },
  { href: "/about", label: "About", tone: "moss" },
  { href: "/blog", label: "Blog", tone: "sea" },
  { href: "/creative", label: "Creative", tone: "sea" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 px-6">
        <nav aria-label="Main navigation" className="-ml-2 flex flex-wrap">
          {navItems.map((item) => (
            // usePathname can suspend while prerendering a route whose params
            // are only known at request time (Cache Components). The fallback
            // is the same link without the current-page marker (issue #14).
            <Suspense
              key={item.href}
              fallback={
                <NavLinkView
                  href={item.href}
                  tone={item.tone}
                  isCurrent={false}
                >
                  {item.label}
                </NavLinkView>
              }
            >
              <NavLink href={item.href} tone={item.tone}>
                {item.label}
              </NavLink>
            </Suspense>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {/* Decorative only: nothing is measured, so the label states no status. */}
          <div
            aria-hidden="true"
            className="flex items-center gap-2 px-2 font-mono text-xs tracking-wider text-pencil uppercase"
          >
            <span className="size-2 rounded-full bg-moss motion-safe:animate-led" />
            home lab
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

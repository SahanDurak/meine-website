"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

// Client component only for the current-page state; the rest of the nav stays on the server.
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className="group flex min-h-11 items-center px-2 font-mono text-xs tracking-wider text-ink uppercase"
    >
      <span className="relative py-1">
        {children}
        {/* Solid ink underline marks the current page. */}
        {isCurrent && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-ink"
          />
        )}
        {/* Red pencil redraws the underline on hover (fine pointers only). */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 fine:group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

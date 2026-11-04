"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { PencilTone } from "@/components/pencil-stroke";

const loopColor: Record<PencilTone, string> = {
  moss: "text-moss",
  sea: "text-sea",
};

type NavLinkProps = {
  href: string;
  tone: PencilTone;
  children: ReactNode;
};

// Client component only for the current-page state; the rest of the nav stays on the server.
export function NavLink({ href, tone, children }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className="group flex min-h-11 items-center px-2 font-mono text-xs tracking-wider text-ink uppercase even:[--pen:var(--sea)]"
    >
      <span className="relative py-1">
        {children}
        {/* A hand-drawn loop in the area's pencil marks the current page.
            Its shape carries the meaning (with aria-current), not the colour.
            It draws itself after each navigation; instantly under reduced
            motion. */}
        {isCurrent && (
          <svg
            aria-hidden="true"
            data-current-loop={tone}
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            // viewBox units: about 1.5 px on screen at nav size.
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`sketch-draw pointer-events-none absolute -inset-x-2.5 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.25rem)] overflow-visible ${loopColor[tone]}`}
          >
            <path
              pathLength={1}
              d="M62 4 C 30 1, 4 8, 3 21 C 2 33, 30 38, 56 37 C 84 36, 98 28, 97 18 C 96 8, 74 2, 44 5 C 34 6, 26 9, 22 12"
            />
          </svg>
        )}
        {/* Other items: a coloured pencil redraws the underline on hover
            (fine pointers only); moss and sea alternate between items. */}
        {!isCurrent && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-pen ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 fine:group-hover:scale-x-100"
          />
        )}
      </span>
    </Link>
  );
}

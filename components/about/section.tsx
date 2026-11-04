import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

// One page section: mono hairline label row plus a real h2.
export function Section({ id, title, children }: SectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <h2
        id={id}
        className="border-t border-line pt-3 font-mono text-xs tracking-wider text-pencil uppercase"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

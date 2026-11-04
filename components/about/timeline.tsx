import type { ReactNode } from "react";

// Vertical hairline with a tick mark per entry. Newest entry first.
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="ml-1 flex flex-col gap-8 border-l border-line">
      {children}
    </ol>
  );
}

type TimelineItemProps = {
  period: string;
  children: ReactNode;
};

export function TimelineItem({ period, children }: TimelineItemProps) {
  return (
    <li className="relative flex flex-col gap-1 pl-6">
      <span
        aria-hidden="true"
        className="absolute top-2.5 -left-px h-px w-3.5 bg-pencil"
      />
      <p className="font-mono text-xs tracking-wider text-pencil uppercase">
        {period}
      </p>
      {children}
    </li>
  );
}

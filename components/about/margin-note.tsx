type MarginNoteProps = {
  children: string;
  /** "accent" = red margin note (max one per screen), "pencil" = quiet note. */
  tone?: "accent" | "pencil";
  className?: string;
};

// Decorative Caveat note with a small hand-drawn arrow. Never the only carrier
// of information, so it is hidden from assistive tech.
export function MarginNote({
  children,
  tone = "accent",
  className = "",
}: MarginNoteProps) {
  const color = tone === "accent" ? "text-accent" : "text-pencil";
  return (
    <p
      aria-hidden="true"
      className={`flex items-start gap-1 font-hand text-xl leading-tight ${color} ${className}`}
    >
      <svg
        viewBox="0 0 28 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-1 h-7 w-6 flex-none -rotate-12"
      >
        <path d="M22 30 C 8 28, 4 16, 6 4" />
        <path d="M1 10 L6 3 L12 9" />
      </svg>
      <span className="pt-2">{children}</span>
    </p>
  );
}

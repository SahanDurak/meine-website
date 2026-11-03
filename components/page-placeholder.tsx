type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-3xl font-semibold tracking-[-0.02em]">{title}</h1>
      <p className="text-pencil">{description}</p>
    </section>
  );
}

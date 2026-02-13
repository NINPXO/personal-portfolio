interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col justify-center py-20 px-4 md:px-8 max-w-6xl mx-auto w-full"
    >
      {title && <h2 className="text-4xl font-bold mb-12">{title}</h2>}
      {children}
    </section>
  );
}

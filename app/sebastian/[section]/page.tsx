import { notFound } from "next/navigation";
import Gallery from "../Gallery";
import { sections } from "../data";

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const data = sections.find((s) => s.slug === section);
  if (!data) notFound();

  return (
    <div>
      <h2
        className="mb-8 text-3xl"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        {data.title}
      </h2>
      <Gallery photos={data.photos} />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProducerScreen } from "@/components/producer/producer-screen";
import { getProducerBySlug, producers } from "@/lib/mock/producers";

export function generateStaticParams() {
  return producers.map((producer) => ({ slug: producer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producer = getProducerBySlug(slug);
  if (!producer) return { title: "Producteur introuvable" };
  return {
    title: producer.name,
    description: producer.story,
  };
}

export default async function ProducerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producer = getProducerBySlug(slug);
  if (!producer) notFound();
  return <ProducerScreen producer={producer} />;
}

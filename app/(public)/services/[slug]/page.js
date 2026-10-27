import { notFound } from "next/navigation";
import PageTemplate from "@/components/public/PageTemplate";
import { SERVICES } from "@/lib/content/pages";

// Unknown slugs return a real 404 instead of a soft-200 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = SERVICES[slug];
  return { title: page ? page.title : "Services" };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const page = SERVICES[slug];
  if (!page) notFound();
  return <PageTemplate page={page} />;
}

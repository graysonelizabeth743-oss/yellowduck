import PageTemplate from "@/components/public/PageTemplate";
import { PAGES } from "@/lib/content/pages";

export const metadata = { title: "Documentation" };

export default function Page() {
  return <PageTemplate page={PAGES.docs} />;
}

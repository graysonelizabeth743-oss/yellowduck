import PageTemplate from "@/components/public/PageTemplate";
import { PAGES } from "@/lib/content/pages";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return <PageTemplate page={PAGES.privacy} />;
}

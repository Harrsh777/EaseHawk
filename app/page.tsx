import { TitanPage, titanPageMetadata } from "@/components/pages/TitanPage";

export const metadata = titanPageMetadata("home");

export default function HomePage() {
  return <TitanPage slug="home" isHome />;
}

import { LegalPage, legalPageMetadata } from "@/components/pages/LegalPage";

export const metadata = legalPageMetadata("cookie-policy");

export default function CookiePolicyPage() {
  return <LegalPage slug="cookie-policy" />;
}

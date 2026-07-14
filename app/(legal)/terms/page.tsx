import { LegalPage, legalPageMetadata } from "@/components/pages/LegalPage";

export const metadata = legalPageMetadata("terms");

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}

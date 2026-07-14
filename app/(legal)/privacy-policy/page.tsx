import { LegalPage, legalPageMetadata } from "@/components/pages/LegalPage";

export const metadata = legalPageMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />;
}

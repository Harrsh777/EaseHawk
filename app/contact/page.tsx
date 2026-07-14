import { ContactPageEffects } from "@/components/behaviors/PageEffects";
import { TitanPage, titanPageMetadata } from "@/components/pages/TitanPage";

export const metadata = titanPageMetadata("contact");

export default function ContactPage() {
  return (
    <TitanPage slug="contact">
      <ContactPageEffects />
    </TitanPage>
  );
}

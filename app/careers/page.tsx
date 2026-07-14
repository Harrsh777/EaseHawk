import { CareersPageEffects } from "@/components/behaviors/PageEffects";
import { TitanPage, titanPageMetadata } from "@/components/pages/TitanPage";

export const metadata = titanPageMetadata("careers");

export default function CareersPage() {
  return (
    <TitanPage slug="careers">
      <CareersPageEffects />
    </TitanPage>
  );
}

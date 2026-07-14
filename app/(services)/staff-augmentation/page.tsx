import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("embedded-talent");

export const metadata = capabilityMetadata(config);

export default function StaffAugmentationPage() {
  return <CapabilityPage config={config} />;
}

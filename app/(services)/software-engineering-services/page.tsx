import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("software-engineering");

export const metadata = capabilityMetadata(config);

export default function SoftwareEngineeringPage() {
  return <CapabilityPage config={config} />;
}

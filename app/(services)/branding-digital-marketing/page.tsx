import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("brand-video");

export const metadata = capabilityMetadata(config);

export default function BrandVideoPage() {
  return <CapabilityPage config={config} />;
}

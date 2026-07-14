import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("data-bi");

export const metadata = capabilityMetadata(config);

export default function DataBiPage() {
  return <CapabilityPage config={config} />;
}

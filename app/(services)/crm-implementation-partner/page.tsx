import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("crm-enterprise");

export const metadata = capabilityMetadata(config);

export default function CrmPage() {
  return <CapabilityPage config={config} />;
}

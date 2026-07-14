import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/pages/CapabilityPage";
import { loadCapabilityPage } from "@/lib/page-content";

const config = loadCapabilityPage("ai-automation");

export const metadata = capabilityMetadata(config);

export default function AiAutomationPage() {
  return <CapabilityPage config={config} />;
}

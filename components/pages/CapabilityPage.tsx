import {
  CapabilitySections,
  JsonLd,
} from "@/components/content/PageContent";
import {
  LandingPageForm,
  type LandingFormConfig,
} from "@/components/forms/LandingPageForm";
import { CapabilityShell } from "@/components/layout/CapabilityShell";
import { pageMetadata } from "@/lib/metadata";

export type CapabilityPageConfig = {
  contentHtml: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  accent: string;
  jsonLd?: string[];
  form: LandingFormConfig;
};

export function capabilityMetadata(
  config: Pick<
    CapabilityPageConfig,
    "title" | "description" | "ogTitle" | "ogDescription"
  >,
) {
  return pageMetadata(config.title, config.description, {
    openGraph: {
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
    },
  });
}

type CapabilityPageProps = {
  config: CapabilityPageConfig;
};

export function CapabilityPage({ config }: CapabilityPageProps) {
  return (
    <CapabilityShell accent={config.accent}>
      {config.jsonLd?.length ? <JsonLd data={config.jsonLd} /> : null}
      <CapabilitySections
        html={config.contentHtml}
        formSlot={<LandingPageForm config={config.form} />}
      />
    </CapabilityShell>
  );
}

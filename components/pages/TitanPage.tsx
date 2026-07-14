import type { ReactNode } from "react";
import { TitanShell } from "@/components/layout/TitanShell";
import { TitanSections, JsonLd } from "@/components/content/PageContent";
import { pageMetadata } from "@/lib/metadata";
import { getPageMeta, loadTitanSections } from "@/lib/page-content";
import { getTitanPageOptions } from "@/lib/titan-page-config";

type TitanPageProps = {
  slug: string;
  isHome?: boolean;
  children?: ReactNode;
};

export function titanPageMetadata(slug: string) {
  const meta = getPageMeta(slug);
  return pageMetadata(meta.title, meta.description);
}

export function TitanPage({ slug, isHome = false, children }: TitanPageProps) {
  const sections = loadTitanSections(slug);
  const meta = getPageMeta(slug);
  const options = getTitanPageOptions(slug);

  return (
    <TitanShell
      isHome={isHome}
      showLoader={options.showLoader}
      enableUniverse={options.enableUniverse}
      heroSectionId={options.heroSectionId}
      progressSections={options.progressSections}
    >
      {meta.jsonLd?.length ? <JsonLd data={meta.jsonLd} /> : null}
      <TitanSections sections={sections} />
      {children}
    </TitanShell>
  );
}

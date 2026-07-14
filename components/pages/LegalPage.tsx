import { HtmlContent } from "@/components/content/PageContent";
import { LegalHeader } from "@/components/layout/LegalHeader";
import { pageMetadata } from "@/lib/metadata";
import { getPageMeta, loadLegalHtml } from "@/lib/page-content";

type LegalPageProps = {
  slug: string;
};

export function legalPageMetadata(slug: string) {
  const meta = getPageMeta(slug);
  return pageMetadata(meta.title, meta.description, { noindex: meta.noindex });
}

export function LegalPage({ slug }: LegalPageProps) {
  const html = loadLegalHtml(slug);

  return (
    <>
      <LegalHeader />
      <main>
        <HtmlContent html={html} />
      </main>
    </>
  );
}

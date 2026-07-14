import fs from "fs";
import path from "path";
import type { CapabilityPageConfig } from "@/components/pages/CapabilityPage";
import pageMeta from "@/lib/page-meta.json";

type PageMetaEntry = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex: boolean;
  jsonLd: string[];
  accent: string;
  type: string;
  file: string;
  form?: {
    email?: string;
    subjectPrefix: string;
    source: string;
  };
};

const contentDir = path.join(process.cwd(), "content", "pages");

const slugToRouteKey: Record<
  string,
  keyof typeof import("@/lib/routes").routes
> = {
  "software-engineering": "softwareEngineering",
  "ai-automation": "aiAutomation",
  "crm-enterprise": "crm",
  "data-bi": "dataBi",
  "brand-video": "branding",
  "embedded-talent": "staffAugmentation",
};

export function loadCapabilityPage(slug: string): CapabilityPageConfig {
  const meta = pageMeta[slug as keyof typeof pageMeta] as PageMetaEntry | undefined;
  if (!meta || meta.type !== "capability") {
    throw new Error(`Unknown capability page: ${slug}`);
  }

  const html = fs.readFileSync(path.join(contentDir, `${slug}.html`), "utf8");
  const form = meta.form ?? {
    subjectPrefix: `EaseHawk enquiry — `,
    source: `${slug} landing page`,
  };

  return {
    contentHtml: html,
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    accent: meta.accent,
    jsonLd: meta.jsonLd,
    form: {
      subjectPrefix: form.subjectPrefix,
      source: form.source,
      email: form.email,
    },
  };
}

export function loadTitanSections(slug: string): string[] {
  const file = path.join(contentDir, `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as string[];
}

export function loadLegalHtml(slug: string): string {
  return fs.readFileSync(path.join(contentDir, `${slug}.html`), "utf8");
}

export function getPageMeta(slug: string): PageMetaEntry {
  const meta = pageMeta[slug as keyof typeof pageMeta] as PageMetaEntry | undefined;
  if (!meta) throw new Error(`Unknown page: ${slug}`);
  return meta;
}

export function loadCapabilityFooter(): string {
  const file = path.join(contentDir, "capability-footer.html");
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

export { slugToRouteKey };

import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://easehawk.com";

const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: routes.home, priority: 1.0, changeFrequency: "weekly" },
  { path: routes.capabilities, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.industries, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.successStories, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.moxsuite, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.careers, priority: 0.7, changeFrequency: "weekly" },
  { path: routes.contact, priority: 0.8, changeFrequency: "yearly" },
  { path: routes.videoPortfolio, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.softwareEngineering, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.aiAutomation, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.crm, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.dataBi, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.branding, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.staffAugmentation, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.privacyPolicy, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.cookiePolicy, priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    priority,
    changeFrequency,
  }));
}

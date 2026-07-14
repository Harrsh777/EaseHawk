import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://easehawk.com";

export const siteConfig = {
  name: "EaseHawk Technologies",
  description:
    "EaseHawk is a global AI Transformation company helping governments, enterprises and high-growth organisations modernise with AI, enterprise platforms, cloud engineering, and data intelligence.",
  url: siteUrl,
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EaseHawk Technologies | Engineering Intelligent Enterprises",
    template: "%s | EaseHawk Technologies",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
  },
};

export function pageMetadata(
  title: string,
  description?: string,
  options?: {
    noindex?: boolean;
    openGraph?: { title?: string; description?: string };
  },
): Metadata {
  const desc = description ?? siteConfig.description;
  const ogTitle = options?.openGraph?.title ?? title;
  const ogDesc = options?.openGraph?.description ?? desc;
  return {
    title,
    description: desc,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "website",
    },
    ...(options?.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

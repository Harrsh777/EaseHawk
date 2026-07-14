export const routes = {
  home: "/",
  capabilities: "/capabilities",
  industries: "/industries",
  successStories: "/success-stories",
  moxsuite: "/moxsuite",
  careers: "/careers",
  contact: "/contact",
  videoPortfolio: "/video-portfolio",
  softwareEngineering: "/software-engineering-services",
  aiAutomation: "/ai-automation-services",
  crm: "/crm-implementation-partner",
  dataBi: "/data-bi-services",
  branding: "/branding-digital-marketing",
  staffAugmentation: "/staff-augmentation",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  cookiePolicy: "/cookie-policy",
} as const;

export type RouteKey = keyof typeof routes;

export const mainNav: { href: string; label: string }[] = [
  { href: routes.home, label: "Home" },
  { href: routes.capabilities, label: "Capabilities" },
  { href: routes.industries, label: "Industries" },
  { href: routes.successStories, label: "Success Stories" },
  { href: routes.moxsuite, label: "MoxSuite" },
  { href: routes.careers, label: "Careers" },
  { href: routes.contact, label: "Contact Us" },
];

export const mobileNav: { href: string; label: string }[] = [
  ...mainNav,
  { href: routes.videoPortfolio, label: "Video Portfolio" },
];

export const footerLegal: { href: string; label: string }[] = [
  { href: routes.privacyPolicy, label: "Privacy Policy" },
  { href: routes.terms, label: "Terms & Conditions" },
  { href: routes.cookiePolicy, label: "Cookie Policy" },
];

export const footerServices: { href: string; label: string }[] = [
  { href: routes.softwareEngineering, label: "Software Engineering" },
  { href: routes.aiAutomation, label: "AI & Automation" },
  { href: routes.crm, label: "CRM & Enterprise" },
  { href: routes.dataBi, label: "Data & BI" },
  { href: routes.branding, label: "Brand & Video" },
  { href: routes.staffAugmentation, label: "Embedded Talent" },
  { href: routes.videoPortfolio, label: "Video Portfolio" },
];

/** Legacy .html paths → clean App Router paths (bookmarks / SEO) */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/EaseHawk_TITAN_Website.html", destination: routes.home },
  { source: "/EaseHawk_Capabilities.html", destination: routes.capabilities },
  { source: "/EaseHawk_Industries.html", destination: routes.industries },
  { source: "/EaseHawk_Success_Stories.html", destination: routes.successStories },
  { source: "/MoxSuite_Page.html", destination: routes.moxsuite },
  { source: "/EaseHawk_Careers.html", destination: routes.careers },
  { source: "/EaseHawk_Contact.html", destination: routes.contact },
  { source: "/EaseHawk_Video_Portfolio.html", destination: routes.videoPortfolio },
  {
    source: "/EaseHawk_Software_Engineering.html",
    destination: routes.softwareEngineering,
  },
  { source: "/EaseHawk_AI_Automation.html", destination: routes.aiAutomation },
  { source: "/EaseHawk_CRM_Enterprise.html", destination: routes.crm },
  { source: "/EaseHawk_Data_BI.html", destination: routes.dataBi },
  { source: "/EaseHawk_Brand_Video.html", destination: routes.branding },
  { source: "/EaseHawk_Embedded_Talent.html", destination: routes.staffAugmentation },
  { source: "/EaseHawk_Privacy_Policy.html", destination: routes.privacyPolicy },
  { source: "/EaseHawk_Terms.html", destination: routes.terms },
  { source: "/EaseHawk_Cookie_Policy.html", destination: routes.cookiePolicy },
];

export const CALENDLY_URL = "https://calendly.com/easehawk";
export const CONTACT_EMAIL = "info@easehawk.com";
export const COMPANY_PROFILE_PATH = "/EaseHawk_Company_Profile.pdf";

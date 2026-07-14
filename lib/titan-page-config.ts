import { TITAN_SCROLL_SECTIONS } from "@/lib/titan-sections";

export type TitanPageOptions = {
  heroSectionId: string;
  showLoader: boolean;
  enableUniverse: boolean;
  progressSections: string[];
};

export const titanPageConfig: Record<string, TitanPageOptions> = {
  home: {
    heroSectionId: "hero",
    showLoader: true,
    enableUniverse: true,
    progressSections: [...TITAN_SCROLL_SECTIONS],
  },
  capabilities: {
    heroSectionId: "caphero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["caphero", "proof", "caps", "models", "capcontact"],
  },
  industries: {
    heroSectionId: "indhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["indhero", "sectors", "indcontact"],
  },
  "success-stories": {
    heroSectionId: "sshero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["sshero", "stories", "sscontact"],
  },
  moxsuite: {
    heroSectionId: "mxhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["mxhero", "fabric", "suite", "platforms", "roadmap", "mxcontact"],
  },
  careers: {
    heroSectionId: "crhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["crhero", "why", "roles", "process", "crcontact"],
  },
  contact: {
    heroSectionId: "cthero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["cthero", "routes", "presence", "faq", "ctform"],
  },
  "video-portfolio": {
    heroSectionId: "vphero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["vphero", "films", "vpcta"],
  },
};

export function getTitanPageOptions(slug: string): TitanPageOptions {
  return (
    titanPageConfig[slug] ?? {
      heroSectionId: "hero",
      showLoader: false,
      enableUniverse: true,
      progressSections: [...TITAN_SCROLL_SECTIONS],
    }
  );
}

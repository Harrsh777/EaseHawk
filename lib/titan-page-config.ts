import { TITAN_SCROLL_SECTIONS } from "@/lib/titan-sections";
import {
  UNIVERSE_PROFILES,
  type UniverseProfileKey,
} from "@/lib/titan-universe/profiles";

export type TitanPageOptions = {
  heroSectionId: string;
  showLoader: boolean;
  enableUniverse: boolean;
  progressSections: string[];
  universeProfile: UniverseProfileKey;
};

export const titanPageConfig: Record<string, TitanPageOptions> = {
  home: {
    heroSectionId: "hero",
    showLoader: true,
    enableUniverse: true,
    progressSections: [...TITAN_SCROLL_SECTIONS],
    universeProfile: "home",
  },
  capabilities: {
    heroSectionId: "caphero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["caphero", "proof", "caps", "models", "capcontact"],
    universeProfile: "fiveSection",
  },
  industries: {
    heroSectionId: "indhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["indhero", "sectors", "indcontact"],
    universeProfile: "threeSection",
  },
  "success-stories": {
    heroSectionId: "sshero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["sshero", "stories", "sscontact"],
    universeProfile: "threeSection",
  },
  moxsuite: {
    heroSectionId: "mxhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["mxhero", "fabric", "suite", "platforms", "roadmap", "mxcontact"],
    universeProfile: "moxsuite",
  },
  careers: {
    heroSectionId: "crhero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["crhero", "why", "roles", "process", "crcontact"],
    universeProfile: "fiveSection",
  },
  contact: {
    heroSectionId: "cthero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["cthero", "routes", "presence", "faq", "ctform"],
    universeProfile: "fiveSection",
  },
  "video-portfolio": {
    heroSectionId: "vphero",
    showLoader: false,
    enableUniverse: true,
    progressSections: ["vphero", "films", "vpcta"],
    universeProfile: "threeSection",
  },
};

export function getTitanPageOptions(slug: string): TitanPageOptions {
  return (
    titanPageConfig[slug] ?? {
      heroSectionId: "hero",
      showLoader: false,
      enableUniverse: true,
      progressSections: [...TITAN_SCROLL_SECTIONS],
      universeProfile: "home",
    }
  );
}

export function getUniverseProfile(slug: string) {
  const { universeProfile } = getTitanPageOptions(slug);
  return UNIVERSE_PROFILES[universeProfile];
}

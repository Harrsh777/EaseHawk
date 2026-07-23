"use client";

import { useEffect } from "react";
import { getIntroStart } from "@/lib/intro";
import { runTitanUniverse } from "@/lib/titan-universe/runtime";
import { TITAN_SCROLL_SECTIONS } from "@/lib/titan-sections";

type TitanUniverseProps = {
  sectionIds?: readonly string[];
  dimArr?: readonly number[];
  coreScale?: readonly number[];
};

export default function TitanUniverse({
  sectionIds = TITAN_SCROLL_SECTIONS,
  dimArr,
  coreScale,
}: TitanUniverseProps) {
  useEffect(() => {
    const container = document.getElementById("stage");
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    if (reduced) {
      container.style.display = "none";
      return;
    }

    return runTitanUniverse({
      container,
      sectionIds: [...sectionIds],
      isMobile,
      reduced,
      getIntroStart,
      dimArr,
      coreScale,
    });
  }, [sectionIds, dimArr, coreScale]);

  return null;
}

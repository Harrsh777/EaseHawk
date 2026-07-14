"use client";

import { useMoxConstellation } from "@/hooks/useMoxConstellation";
import { useOrbitSatellites } from "@/hooks/useOrbitSatellites";
import { useReveal } from "@/hooks/useReveal";
import { useStoryAccordion } from "@/hooks/useStoryAccordion";
import { useTilt } from "@/hooks/useTilt";
import { useWorkflowSteps } from "@/hooks/useWorkflowSteps";

export function TitanClientEffects() {
  useReveal();
  useTilt(".glass");
  useTilt(".prod, .bro");
  useWorkflowSteps();
  useOrbitSatellites();
  useMoxConstellation();
  useStoryAccordion();

  return null;
}

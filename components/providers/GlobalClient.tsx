"use client";

import { TitanClientEffects } from "@/components/behaviors/TitanClientEffects";
import { EaseHawkAssistant } from "@/components/chat/EaseHawkAssistant";
import { useHawkCursor } from "@/hooks/useHawkCursor";

export function GlobalClient() {
  useHawkCursor();

  return (
    <>
      <TitanClientEffects />
      <EaseHawkAssistant />
    </>
  );
}

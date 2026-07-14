"use client";

import { TitanClientEffects } from "@/components/behaviors/TitanClientEffects";
import { EaseHawkAssistant } from "@/components/chat/EaseHawkAssistant";

export function GlobalClient() {
  return (
    <>
      <TitanClientEffects />
      <EaseHawkAssistant />
    </>
  );
}

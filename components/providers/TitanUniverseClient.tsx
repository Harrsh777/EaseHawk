"use client";

import dynamic from "next/dynamic";

const TitanUniverse = dynamic(
  () => import("@/components/three/TitanUniverse"),
  { ssr: false },
);

type TitanUniverseClientProps = {
  enabled?: boolean;
  sectionIds?: readonly string[];
};

export function TitanUniverseClient({
  enabled = true,
  sectionIds,
}: TitanUniverseClientProps) {
  if (!enabled) return null;
  return <TitanUniverse sectionIds={sectionIds} />;
}

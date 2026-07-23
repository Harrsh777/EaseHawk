"use client";

import dynamic from "next/dynamic";

const TitanUniverse = dynamic(
  () => import("@/components/three/TitanUniverse"),
  { ssr: false },
);

type TitanUniverseClientProps = {
  enabled?: boolean;
  sectionIds?: readonly string[];
  dimArr?: readonly number[];
  coreScale?: readonly number[];
};

export function TitanUniverseClient({
  enabled = true,
  sectionIds,
  dimArr,
  coreScale,
}: TitanUniverseClientProps) {
  if (!enabled) return null;
  return (
    <TitanUniverse sectionIds={sectionIds} dimArr={dimArr} coreScale={coreScale} />
  );
}

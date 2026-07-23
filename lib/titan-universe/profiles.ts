export type UniverseProfile = {
  dimArr: readonly number[];
  coreScale: readonly number[];
};

/** Matches dimArr / coreScale from each reference HTML file. */
export const UNIVERSE_PROFILES = {
  home: {
    dimArr: [1, 0.66, 0.68, 0.66, 0.7, 0.68, 0.66, 0.7, 0.95, 0.66, 0.62, 0.9, 0.68, 0.95],
    coreScale: [1, 0, 0.35, 0, 0, 0.55, 0, 0, 0, 0, 0, 0.8, 0, 0.55],
  },
  fiveSection: {
    dimArr: [1, 0.68, 0.6, 0.72, 0.95],
    coreScale: [1, 0.4, 0.7, 0.5, 0.55],
  },
  threeSection: {
    dimArr: [1, 0.62, 0.95],
    coreScale: [1, 0.55, 0.6],
  },
  moxsuite: {
    dimArr: [1, 0.66, 0.62, 0.64, 0.72, 0.95],
    coreScale: [1, 0.35, 0.85, 0, 0.4, 0.55],
  },
} as const satisfies Record<string, UniverseProfile>;

export type UniverseProfileKey = keyof typeof UNIVERSE_PROFILES;

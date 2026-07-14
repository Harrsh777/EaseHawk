"use client";

import { useEffect } from "react";

export function useOrbitSatellites(stageSelector = ".orbit-stage") {
  useEffect(() => {
    const stage = document.querySelector(stageSelector);
    if (!stage) return;

    const sats = stage.querySelectorAll(".sat");
    if (!sats.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const t0 = performance.now();
    let frame = 0;

    const place = () => {
      const now = (performance.now() - t0) / 1000;
      sats.forEach((sat) => {
        if (!(sat instanceof HTMLElement)) return;
        const base = (parseFloat(sat.dataset.a ?? "0") * Math.PI) / 180;
        const a = base + now * 0.12;
        const r = 50;
        sat.style.left = `${50 + Math.cos(a) * r * 0.92}%`;
        sat.style.top = `${50 + Math.sin(a) * r * 0.92}%`;
      });
      frame = requestAnimationFrame(place);
    };

    place();
    return () => cancelAnimationFrame(frame);
  }, [stageSelector]);
}

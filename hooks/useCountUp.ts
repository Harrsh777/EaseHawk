"use client";

import { useEffect } from "react";

export function useCountUp() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".cnt[data-n]");
    if (!els.length || !("IntersectionObserver" in window)) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.n ?? "0");
          if (reduced || Number.isNaN(target)) {
            el.textContent = String(target);
            return;
          }

          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 1100);
            const eased = 1 - (1 - p) ** 3;
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>(".cnt[data-n]:not([data-counted])")
        .forEach((el) => io.observe(el));
    };

    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

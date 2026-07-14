"use client";

import { useEffect } from "react";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.01,
  rootMargin: "0px 0px 12% 0px",
};

export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    const observe = () => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    };

    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [enabled]);
}

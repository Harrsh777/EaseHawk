"use client";

import { useEffect } from "react";

export function useTilt(selector = ".glass, .prod, .bro", enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    if (reduced || isMobile) return;

    const bound = new WeakSet<Element>();
    const cleanups: (() => void)[] = [];

    const bind = (card: Element) => {
      if (!(card instanceof HTMLElement) || bound.has(card)) return;
      bound.add(card);
      let raf: number | null = null;

      const onMove = (e: PointerEvent) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.classList.add("tilt-on");
          card.style.transform = `perspective(1100px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg) translateZ(6px)`;
        });
      };

      const onLeave = () => {
        card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };

    const scan = () => {
      document.querySelectorAll(selector).forEach(bind);
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [enabled, selector]);
}

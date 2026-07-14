"use client";

import { useEffect } from "react";

export function useStoryAccordion() {
  useEffect(() => {
    const bound = new WeakSet<Element>();
    const cleanups: (() => void)[] = [];

    const bind = (btn: Element) => {
      if (!(btn instanceof HTMLButtonElement) || bound.has(btn)) return;
      bound.add(btn);
      const handler = () => {
        const story = btn.closest(".story");
        if (!story) return;
        const open = story.classList.toggle("open");
        const label = btn.firstChild;
        if (label) {
          label.textContent = open
            ? "Close case study "
            : "View case study ";
        }
      };
      btn.addEventListener("click", handler);
      cleanups.push(() => btn.removeEventListener("click", handler));
    };

    const scan = () => {
      document.querySelectorAll(".more-btn").forEach(bind);
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
}

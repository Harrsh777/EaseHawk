"use client";

import { useEffect } from "react";

export function useIndustryAccordion() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const bind = () => {
      document.querySelectorAll<HTMLButtonElement>(".ind-head").forEach((hd) => {
        if (hd.dataset.bound === "1") return;
        hd.dataset.bound = "1";

        const onClick = () => {
          const row = hd.closest(".ind");
          if (!(row instanceof HTMLElement)) return;
          const wasOpen = row.classList.contains("open");
          document.querySelectorAll(".ind.open").forEach((r) => r.classList.remove("open"));
          if (!wasOpen) {
            row.classList.add("open");
            hd.setAttribute("aria-expanded", "true");
            window.setTimeout(() => {
              const rect = row.getBoundingClientRect();
              if (rect.top < 96) {
                window.scrollBy({ top: rect.top - 104, behavior: "smooth" });
              }
            }, 380);
          } else {
            hd.setAttribute("aria-expanded", "false");
          }
        };

        hd.addEventListener("click", onClick);
        cleanups.push(() => {
          hd.removeEventListener("click", onClick);
          delete hd.dataset.bound;
        });
      });
    };

    bind();
    const first = document.querySelector(".ind");
    first?.classList.add("open");
    const firstHead = first?.querySelector<HTMLButtonElement>(".ind-head");
    firstHead?.setAttribute("aria-expanded", "true");

    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
}

"use client";

import { useEffect } from "react";

function formatClock(tz: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    }).format(new Date());
  } catch {
    return "";
  }
}

export function useDeliveryClocks() {
  useEffect(() => {
    const tick = () => {
      document.querySelectorAll<HTMLElement>(".clock[data-tz]").forEach((el) => {
        const tz = el.dataset.tz;
        if (tz) el.textContent = formatClock(tz);
      });
    };

    tick();
    const timer = window.setInterval(tick, 20000);
    return () => window.clearInterval(timer);
  }, []);
}

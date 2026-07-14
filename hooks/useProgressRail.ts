"use client";

import { useEffect } from "react";

export function useProgressRail(sectionIds: string[]) {
  useEffect(() => {
    const rail = document.getElementById("rail");
    if (!rail || !sectionIds.length) return;

    rail.innerHTML = "";
    sectionIds.forEach((id) => {
      const a = document.createElement("a");
      a.href = `#${id}`;
      a.title = id;
      rail.appendChild(a);
    });

    const dots = rail.querySelectorAll("a");

    const update = () => {
      const p = window.scrollY + window.innerHeight * 0.5;
      let cur = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= p) cur = i;
      });
      dots.forEach((dot, i) => dot.classList.toggle("on", i === cur));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, [sectionIds]);
}

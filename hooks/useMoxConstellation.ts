"use client";

import { useEffect } from "react";

export function useMoxConstellation(
  svgId = "moxSvg",
  nodeSelector = ".mox-node",
) {
  useEffect(() => {
    const build = () => {
      const svg = document.getElementById(svgId);
      if (!svg) return;

      const nodes = document.querySelectorAll(nodeSelector);
      if (!nodes.length) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const C = 340;
      const R = 262;

      let links =
        '<defs><linearGradient id="mlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFDD00" stop-opacity=".55"/><stop offset="1" stop-color="#7D7DDD" stop-opacity=".3"/></linearGradient></defs>';
      const pts: [number, number][] = [];

      nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const a = (parseFloat(node.dataset.a ?? "0") * Math.PI) / 180;
        const x = 50 + Math.cos(a) * 38.5;
        const y = 50 + Math.sin(a) * 38.5;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        const sx = C + Math.cos(a) * R;
        const sy = C + Math.sin(a) * R;
        pts.push([sx, sy]);
        links += `<line class="mox-link mox-spoke" style="stroke:url(#mlg);stroke-width:1.3" x1="${C}" y1="${C}" x2="${sx}" y2="${sy}"/>`;
      });

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        links += `<line class="mox-link mox-ring" style="stroke:rgba(255,255,255,.07)" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
      }

      let pulses = "";
      if (!reduced) {
        pts.forEach((p, i) => {
          const d = 2.2 + i * 0.3;
          pulses += `<circle class="mox-pulse" r="2.8"><animate attributeName="cx" values="${C};${p[0]}" dur="${d}s" repeatCount="indefinite"/><animate attributeName="cy" values="${C};${p[1]}" dur="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="${d}s" repeatCount="indefinite"/></circle>`;
          pulses += `<circle r="2.2" fill="#7D7DDD"><animate attributeName="cx" values="${p[0]};${C}" dur="${d + 1}s" repeatCount="indefinite"/><animate attributeName="cy" values="${p[1]};${C}" dur="${d + 1}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="${d + 1}s" repeatCount="indefinite"/></circle>`;
        });
      }

      svg.innerHTML = links + pulses;
    };

    build();
    const mo = new MutationObserver(build);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [svgId, nodeSelector]);
}

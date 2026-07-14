"use client";

import { useEffect, useMemo } from "react";
import videos from "@/lib/video-portfolio-data.json";
import { VideoLightbox, type VideoItem } from "@/components/video/VideoLightbox";

const categoryNames: Record<string, string> = {
  promo: "Promotional",
  x2d: "2D Explainer",
  char: "Character Animation",
  tut: "Tutorial",
};

const categoryColors: Record<string, string> = {
  promo: "#FFDD00",
  x2d: "#FF810F",
  char: "#7D7DDD",
  tut: "#FFDD00",
};

function tileHtml(v: VideoItem, i: number) {
  let bg = `<span class="vt-mono" aria-hidden="true">${v.client.charAt(0)}</span>`;
  if (v.thumb) {
    bg += `<img class="vt-img" loading="lazy" src="${v.thumb}" alt="" onerror="if(this.nextElementSibling)this.nextElementSibling.remove();this.remove();"><span class="vt-shade"></span>`;
  }
  return `<article class="vt" data-slug="${v.slug}" style="--pacc:${categoryColors[v.cat] ?? "#FFDD00"};--i:${i}" tabindex="0" role="button" aria-label="Play: ${v.client}"><div class="vt-stage">${bg}<span class="vt-play"><i>▶</i></span></div><div class="vt-foot"><span class="vt-client">${v.client}</span><span class="vt-cat">${categoryNames[v.cat] ?? v.cat}</span></div></article>`;
}

export function VideoPortfolioClient() {
  const list = useMemo(() => videos as VideoItem[], []);

  useEffect(() => {
    const vgrid = document.getElementById("vgrid");
    if (!vgrid) return;

    let filter = "all";
    let currentList = list.slice();

    const render = () => {
      currentList =
        filter === "all" ? list.slice() : list.filter((v) => v.cat === filter);
      vgrid.style.opacity = "0";
      window.setTimeout(() => {
        vgrid.innerHTML = currentList.map((v, i) => tileHtml(v, i)).join("");
        vgrid.style.opacity = "1";
        vgrid.querySelectorAll<HTMLElement>(".vt").forEach((el) => {
          const slug = el.dataset.slug;
          if (!slug) return;
          const open = () =>
            (
              window as Window & { easehawkOpenFilm?: (s: string) => void }
            ).easehawkOpenFilm?.(slug);
          el.addEventListener("click", open);
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          });
        });
      }, 200);
    };

    const tabCleanups: (() => void)[] = [];
    document.querySelectorAll(".sstab").forEach((tab) => {
      const onClick = () => {
        document.querySelectorAll(".sstab").forEach((x) => x.classList.remove("on"));
        tab.classList.add("on");
        filter = (tab as HTMLElement).dataset.f ?? "all";
        render();
      };
      tab.addEventListener("click", onClick);
      tabCleanups.push(() => tab.removeEventListener("click", onClick));
    });

    render();

    if (window.location.hash.startsWith("#film-")) {
      const slug = window.location.hash.slice(6);
      const hashTimer = window.setTimeout(() => {
        (
          window as Window & { easehawkOpenFilm?: (s: string) => void }
        ).easehawkOpenFilm?.(slug);
      }, 900);
      tabCleanups.push(() => window.clearTimeout(hashTimer));
    }

    return () => tabCleanups.forEach((fn) => fn());
  }, [list]);

  return (
    <VideoLightbox
      videos={list}
      categoryNames={categoryNames}
      categoryColors={categoryColors}
    />
  );
}

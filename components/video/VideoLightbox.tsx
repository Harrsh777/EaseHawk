"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { routes } from "@/lib/routes";

export type VideoItem = {
  slug: string;
  client: string;
  cat: string;
  note: string;
  src?: string;
  thumb?: string;
};

type VideoLightboxProps = {
  videos: VideoItem[];
  categoryNames: Record<string, string>;
  categoryColors: Record<string, string>;
  initialSlug?: string;
};

function embedMarkup(src?: string) {
  if (!src) return null;
  const yt = src.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/,
  );
  if (yt) {
    return `<iframe src="https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }
  const vimeo = src.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return `<iframe src="https://player.vimeo.com/video/${vimeo[1]}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }
  return `<video src="${src}" controls autoplay playsinline></video>`;
}

export function VideoLightbox({
  videos,
  categoryNames,
  categoryColors,
  initialSlug,
}: VideoLightboxProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(videos);

  const fill = useCallback(
    (i: number) => {
      const v = list[i];
      if (!v) return;
      const client = document.getElementById("lbClient");
      const cat = document.getElementById("lbCat");
      const count = document.getElementById("lbCount");
      const stage = document.getElementById("lbStage");
      const root = document.getElementById("lightbox");
      if (client) client.textContent = v.client;
      if (cat)
        cat.textContent = `${categoryNames[v.cat] ?? v.cat} · ${v.note}`;
      if (count) count.textContent = `${i + 1} / ${list.length}`;
      if (root) root.style.setProperty("--pacc", categoryColors[v.cat] ?? "#FFDD00");
      if (stage) {
        const em = embedMarkup(v.src);
        stage.innerHTML =
          em ??
          `<div class="lb-pending"><b>◆</b><p>This film is screened on request.</p><a class="cta" href="${routes.branding}#lead"><span>Request the reel</span></a></div>`;
      }
      window.history.replaceState(null, "", `#film-${v.slug}`);
    },
    [categoryColors, categoryNames, list],
  );

  const openFilm = useCallback(
    (slug: string, sourceList = list) => {
      const i = sourceList.findIndex((v) => v.slug === slug);
      if (i < 0) return;
      setList(sourceList);
      setIndex(i);
      setOpen(true);
      document.body.style.overflow = "hidden";
      fill(i);
    },
    [fill, list],
  );

  const closeFilm = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    const stage = document.getElementById("lbStage");
    if (stage) stage.innerHTML = "";
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }, []);

  const stepFilm = useCallback(
    (delta: number) => {
      setIndex((prev) => {
        const next = (prev + delta + list.length) % list.length;
        fill(next);
        return next;
      });
    },
    [fill, list.length],
  );

  useEffect(() => {
    if (!initialSlug) return;
    const timer = window.setTimeout(() => openFilm(initialSlug), 900);
    return () => window.clearTimeout(timer);
  }, [initialSlug, openFilm]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") closeFilm();
      if (e.key === "ArrowRight") stepFilm(1);
      if (e.key === "ArrowLeft") stepFilm(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeFilm, open, stepFilm]);

  useEffect(() => {
    (window as Window & { easehawkOpenFilm?: typeof openFilm }).easehawkOpenFilm =
      openFilm;
    return () => {
      delete (window as Window & { easehawkOpenFilm?: typeof openFilm })
        .easehawkOpenFilm;
    };
  }, [openFilm]);

  return (
    <div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Film player"
      className={open ? "open" : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeFilm();
      }}
    >
      <div className="lb-panel">
        <div className="lb-meta">
          <div>
            <div id="lbClient" />
            <div id="lbCat" />
          </div>
          <div id="lbCount" />
        </div>
        <div id="lbStage" />
        <div className="lb-nav">
          <button type="button" id="lbPrev" onClick={() => stepFilm(-1)}>
            ← Prev
          </button>
          <button type="button" id="lbClose" onClick={closeFilm}>
            Close
          </button>
          <button type="button" id="lbNext" onClick={() => stepFilm(1)}>
            Next →
          </button>
        </div>
        <p className="lb-hint">
          Or browse{" "}
          <Link href={routes.branding}>Brand &amp; Video services</Link>
        </p>
      </div>
    </div>
  );
}

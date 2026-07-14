"use client";

import { useEffect, useState, type ReactNode } from "react";
import { setIntroStart } from "@/lib/intro";
import { useProgressRail } from "@/hooks/useProgressRail";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProfileFab } from "./ProfileFab";
import { TitanUniverseClient } from "@/components/providers/TitanUniverseClient";

type TitanShellProps = {
  children: ReactNode;
  isHome?: boolean;
  showLoader?: boolean;
  enableUniverse?: boolean;
  heroSectionId?: string;
  progressSections?: string[];
};

export function TitanShell({
  children,
  isHome = false,
  showLoader = true,
  enableUniverse = true,
  heroSectionId = "hero",
  progressSections = [],
}: TitanShellProps) {
  const [loaderDone, setLoaderDone] = useState(!showLoader);
  useProgressRail(progressSections);

  useEffect(() => {
    if (!showLoader) {
      setIntroStart();
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setLoaderDone(true);
      setIntroStart();
      return;
    }

    const bar = document.getElementById("loadbar");
    let progress = 0;
    const tick = window.setInterval(() => {
      progress = Math.min(1, progress + 0.06 + Math.random() * 0.07);
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (progress >= 1) {
        window.clearInterval(tick);
        setLoaderDone(true);
        setIntroStart();
      }
    }, 90);

    return () => window.clearInterval(tick);
  }, [showLoader]);

  useEffect(() => {
    if (!loaderDone) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timer = window.setTimeout(
      () => {
        const head = document.getElementById("heroHead");
        const hero = document.getElementById(heroSectionId);
        if (head) {
          head.style.transition =
            "opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)";
          head.style.opacity = "1";
          head.style.transform = "none";
        }
        hero?.classList.add("title-in");
      },
      reduced ? 50 : 350,
    );

    return () => window.clearTimeout(timer);
  }, [loaderDone, heroSectionId]);

  return (
    <>
      {showLoader && (
        <div id="loader" className={loaderDone ? "done" : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/logo-mark.png" alt="" />
          <div className="bar">
            <i id="loadbar" />
          </div>
          <div className="tag">Initialising Enterprise Core</div>
        </div>
      )}

      <div id="stage" />
      <div className="vignette" />
      <div className="grain" />

      <Header isHome={isHome} />
      <div className="rail" id="rail" />
      <ProfileFab />

      <main>{children}</main>

      <Footer />

      <TitanUniverseClient
        enabled={enableUniverse}
        sectionIds={progressSections}
      />
    </>
  );
}

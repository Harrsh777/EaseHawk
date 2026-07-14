"use client";

import { useEffect } from "react";
import cases from "@/lib/success-stories-data.json";

type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  country: string;
  industry: string;
  dur: string;
  model: string;
  via: string;
  tags: string[];
  acc: string;
  impact: string;
  context: string;
  build: string[];
  scope: string[];
  outcome: string[];
  fact: { v: string; l: string };
  aiin: string;
};

const CAPNAME: Record<string, string> = {
  eng: "Engineering & Transformation",
  ai: "AI & Automation",
  crm: "CRM & Enterprise",
  bi: "Data & BI",
  brand: "Brand & Video",
  talent: "Embedded Talent",
};

const CHIPNAME: Record<string, string> = {
  eng: "Software Engineering",
  ai: "AI & Automation",
  crm: "CRM & Enterprise",
  bi: "Data & BI",
  brand: "Brand & Video",
  talent: "Embedded Talent",
};

type SuccessStoriesClientProps = {
  modalHtml: string;
};

function cardHtml(c: CaseStudy, i: number) {
  const caps = c.tags.map((t) => `<span class="sc-cap">${CAPNAME[t]}</span>`).join("");
  return `<article class="story" data-slug="${c.slug}" data-tags="${c.tags.join(" ")}" style="--pacc:${c.acc};--i:${i}" tabindex="0" role="button" aria-label="Open case study: ${c.client}"><div class="sc-top"><span class="sc-client">${c.client}</span><span class="sc-dur">${c.dur}</span></div><h3 class="sc-title">${c.title}</h3><p class="sc-impact">${c.impact}</p><ul class="sc-points"><li>${c.outcome[0]}</li><li>${c.via}</li></ul><div class="sc-meta"><span>${c.country}</span><span>${c.industry}</span><span>${c.model}</span></div><div class="sc-caps">${caps}</div><span class="sc-read">Read the full case <b class="ar">→</b></span></article>`;
}

export function SuccessStoriesClient({ modalHtml }: SuccessStoriesClientProps) {
  useEffect(() => {
    const list = cases as CaseStudy[];
    const grid = document.getElementById("ssgrid");
    if (!grid) return;

    if (!document.getElementById("caseModal")) {
      const wrap = document.createElement("div");
      wrap.innerHTML = modalHtml;
      document.body.appendChild(wrap.firstElementChild!);
    }

    const modal = document.getElementById("caseModal")!;
    const panel = modal.querySelector(".cm-panel") as HTMLElement;
    let curFilter = "all";
    let curList = list.slice();
    let curIdx = 0;

    const fill = (c: CaseStudy) => {
      panel.style.setProperty("--pacc", c.acc);
      const set = (id: string, html: string) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };
      set("cmKick", `${c.tags.map((t) => CAPNAME[t]).join(" · ")} · ${c.country}`);
      const client = document.getElementById("cmClient");
      if (client) client.textContent = c.client;
      set("cmTitle", c.title);
      set(
        "cmMeta",
        `<span><b>Industry</b>${c.industry}</span><span><b>Duration</b>${c.dur}</span><span><b>Model</b>${c.model}</span><span><b>Channel</b>${c.via}</span>`,
      );
      const context = document.getElementById("cmContext");
      if (context) context.textContent = c.context;
      set("cmBuild", c.build.map((b) => `<li>${b}</li>`).join(""));
      set("cmScope", c.scope.map((s) => `<span>${s}</span>`).join(""));
      set("cmOutcome", c.outcome.map((o) => `<li>${o}</li>`).join(""));
      const factV = document.getElementById("cmFactV");
      const factL = document.getElementById("cmFactL");
      if (factV) factV.textContent = c.fact.v;
      if (factL) factL.textContent = c.fact.l;
      const ai = document.getElementById("cmAI");
      if (ai) ai.textContent = c.aiin;
      const cta = document.getElementById("cmCta") as HTMLElement;
      if (cta) cta.dataset.chip = CHIPNAME[c.tags[0]];
      const count = document.getElementById("cmCount");
      if (count) count.textContent = `${curIdx + 1} / ${curList.length}`;
    };

    const openCase = (slug: string) => {
      const i = curList.findIndex((c) => c.slug === slug);
      if (i < 0) {
        curFilter = "all";
        document.querySelectorAll(".sstab").forEach((x) =>
          x.classList.toggle("on", (x as HTMLElement).dataset.f === "all"),
        );
        render();
        window.setTimeout(() => openCase(slug), 300);
        return;
      }
      curIdx = i;
      fill(curList[i]);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      panel.scrollTop = 0;
      window.history.replaceState(null, "", `#case-${slug}`);
    };

    const closeCase = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      window.history.replaceState(null, "", window.location.pathname);
    };

    const step = (d: number) => {
      curIdx = (curIdx + d + curList.length) % curList.length;
      fill(curList[curIdx]);
      panel.scrollTop = 0;
      window.history.replaceState(null, "", `#case-${curList[curIdx].slug}`);
    };

    const render = () => {
      curList =
        curFilter === "all"
          ? list.slice()
          : list.filter((c) => c.tags.includes(curFilter));
      grid.style.opacity = "0";
      window.setTimeout(() => {
        grid.innerHTML = curList.map((c, i) => cardHtml(c, i)).join("");
        grid.style.opacity = "1";
        grid.querySelectorAll<HTMLElement>(".story").forEach((el) => {
          const slug = el.dataset.slug;
          if (!slug) return;
          const open = () => openCase(slug);
          el.addEventListener("click", open);
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          });
        });
      }, 220);
    };

    const cleanups: (() => void)[] = [];

    document.querySelectorAll(".sstab").forEach((tab) => {
      const onClick = () => {
        document.querySelectorAll(".sstab").forEach((x) => x.classList.remove("on"));
        tab.classList.add("on");
        curFilter = (tab as HTMLElement).dataset.f ?? "all";
        render();
      };
      tab.addEventListener("click", onClick);
      cleanups.push(() => tab.removeEventListener("click", onClick));
    });

    const onModalClick = (e: Event) => {
      if (e.target === modal) closeCase();
    };
    modal.addEventListener("click", onModalClick);
    cleanups.push(() => modal.removeEventListener("click", onModalClick));

    const bind = (id: string, fn: () => void) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", fn);
      cleanups.push(() => el.removeEventListener("click", fn));
    };

    bind("cmClose", closeCase);
    bind("cmPrev", () => step(-1));
    bind("cmNext", () => step(1));

    const cta = document.getElementById("cmCta");
    if (cta) {
      const onCta = () => {
        const chip = (cta as HTMLElement).dataset.chip;
        closeCase();
        if (!chip) return;
        document.querySelectorAll("#needChips button").forEach((c) => {
          if (c.textContent?.trim() === chip) c.classList.add("on");
        });
      };
      cta.addEventListener("click", onCta);
      cleanups.push(() => cta.removeEventListener("click", onCta));
    }

    const onKey = (e: KeyboardEvent) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") closeCase();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    cleanups.push(() => window.removeEventListener("keydown", onKey));

    render();

    if (window.location.hash.startsWith("#case-")) {
      const slug = window.location.hash.slice(6);
      const timer = window.setTimeout(() => openCase(slug), 900);
      cleanups.push(() => window.clearTimeout(timer));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [modalHtml]);

  return null;
}

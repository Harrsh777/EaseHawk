"use client";

import { useEffect } from "react";
import { CONTACT_EMAIL } from "@/lib/routes";

function bindReqForm(subjectPrefix: string, bodyBuilder: (d: FormData, chips: HTMLButtonElement[]) => string) {
  const form = document.getElementById("reqForm");
  if (!(form instanceof HTMLFormElement)) return;

  const chips = form.querySelectorAll<HTMLButtonElement>("#needChips button");
  const cleanups: (() => void)[] = [];

  chips.forEach((chip) => {
    const onClick = () => chip.classList.toggle("on");
    chip.addEventListener("click", onClick);
    cleanups.push(() => chip.removeEventListener("click", onClick));
  });

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const note = document.getElementById("formNote");
    if (!name || !email || !/.+@.+\..+/.test(email)) {
      if (note) {
        note.textContent = "Please add your name and a valid work email.";
        note.style.color = "#FF810F";
      }
      return;
    }
    const body = bodyBuilder(data, [...chips]);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${subjectPrefix}${name}`)}&body=${body}`;
    form.classList.add("sent");
    if (note) {
      note.style.color = "";
      note.textContent =
        "Request prepared — sending via your email client. We reply within one business day.";
    }
  };

  form.addEventListener("submit", onSubmit);
  cleanups.push(() => form.removeEventListener("submit", onSubmit));

  return () => cleanups.forEach((fn) => fn());
}

export function ContactPageEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll("[data-route]").forEach((btn) => {
      const onClick = () => {
        const name = (btn as HTMLElement).dataset.route;
        document.querySelectorAll("#needChips button").forEach((chip) => {
          if (chip.textContent?.trim() === name) chip.classList.add("on");
        });
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    document.querySelectorAll(".faq-q").forEach((q) => {
      const onClick = () => q.closest(".faq")?.classList.toggle("open");
      q.addEventListener("click", onClick);
      cleanups.push(() => q.removeEventListener("click", onClick));
    });

    const hubs: [string, string][] = [
      ["clkGGN", "Asia/Kolkata"],
      ["clkRUH", "Asia/Riyadh"],
      ["clkDXB", "Asia/Dubai"],
      ["clkLON", "Europe/London"],
    ];
    const tickClocks = () => {
      hubs.forEach(([id, tz]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        }).format(new Date());
      });
    };
    tickClocks();
    const clockTimer = window.setInterval(tickClocks, 15000);
    cleanups.push(() => window.clearInterval(clockTimer));

    const formCleanup = bindReqForm("EaseHawk enquiry — ", (d, chips) => {
      const needs =
        chips
          .filter((c) => c.classList.contains("on"))
          .map((c) => c.textContent)
          .join(", ") || "Not specified";
      return encodeURIComponent(
        [
          `Name: ${d.get("name")}`,
          `Company: ${d.get("company") || "-"}`,
          `Email: ${d.get("email")}`,
          `Region: ${d.get("region")}`,
          `Reason: ${needs}`,
          `Preferred first step: ${d.get("timeline")}`,
          `Timeline: ${d.get("budget")}`,
          "",
          "Notes:",
          d.get("message") || "-",
        ].join("\n"),
      );
    });
    if (formCleanup) cleanups.push(formCleanup);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

export function CareersPageEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll(".role-head").forEach((hd) => {
      const onClick = () => {
        const row = hd.closest(".role");
        if (!(row instanceof HTMLElement)) return;
        const wasOpen = row.classList.contains("open");
        document.querySelectorAll(".role.open").forEach((r) => r.classList.remove("open"));
        if (!wasOpen) {
          row.classList.add("open");
          window.setTimeout(() => {
            const rect = row.getBoundingClientRect();
            if (rect.top < 96) window.scrollBy({ top: rect.top - 104, behavior: "smooth" });
          }, 380);
        }
      };
      hd.addEventListener("click", onClick);
      cleanups.push(() => hd.removeEventListener("click", onClick));
    });

    const firstRole = document.querySelector(".role");
    firstRole?.classList.add("open");

    document.querySelectorAll("[data-apply]").forEach((btn) => {
      const onClick = () => {
        const name = (btn as HTMLElement).dataset.apply;
        document.querySelectorAll("#needChips button").forEach((chip) => {
          if (chip.textContent?.trim() === name) chip.classList.add("on");
        });
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    const formCleanup = bindReqForm("EaseHawk application — ", (d, chips) => {
      const needs =
        chips
          .filter((c) => c.classList.contains("on"))
          .map((c) => c.textContent)
          .join(", ") || "Not specified";
      return encodeURIComponent(
        [
          `Name: ${d.get("name")}`,
          `Company: ${d.get("company") || "-"}`,
          `Email: ${d.get("email")}`,
          `Location: ${d.get("region")}`,
          `Roles applying for: ${needs}`,
          `Portfolio / LinkedIn: ${d.get("portfolio") || "-"}`,
          `Notice period: ${d.get("timeline")}`,
          `Experience: ${d.get("budget")}`,
          "",
          "Notes:",
          d.get("message") || "-",
        ].join("\n"),
      );
    });
    if (formCleanup) cleanups.push(formCleanup);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

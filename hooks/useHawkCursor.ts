"use client";

import { useEffect } from "react";

const HEX_SVG =
  '<svg viewBox="0 0 44 44"><polygon points="22,3 39,12.5 39,31.5 22,41 5,31.5 5,12.5" fill="none" stroke="#FFDD00" stroke-width="1.2" opacity=".9"/><line x1="22" y1="0" x2="22" y2="5" stroke="#FFDD00" stroke-width="1.2"/><line x1="22" y1="39" x2="22" y2="44" stroke="#FFDD00" stroke-width="1.2"/><line x1="3" y1="22" x2="8" y2="22" stroke="#FFDD00" stroke-width="1.2" opacity=".55"/><line x1="36" y1="22" x2="41" y2="22" stroke="#FFDD00" stroke-width="1.2" opacity=".55"/></svg>';

export function useHawkCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const dot = document.createElement("div");
    dot.id = "cur-dot";

    const hex = document.createElement("div");
    hex.id = "cur-hex";
    hex.innerHTML = HEX_SVG;

    const lock = document.createElement("div");
    lock.id = "cur-lock";
    lock.innerHTML =
      '<i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i>';

    document.body.append(dot, hex, lock);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hxx = x;
    let hxy = y;
    let seen = false;
    let target: Element | null = null;
    let frame = 0;

    const setLock = (el: Element | null) => {
      if (el === target) return;
      target = el;
      hex.classList.toggle("locked", !!el);
      lock.classList.toggle("on", !!el);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        hxx = x;
        hxy = y;
        document.body.classList.add("cur-on");
      }

      const t = e.target;
      const txt =
        t instanceof Element
          ? t.closest("input,textarea,select")
          : null;
      const inter =
        !txt && t instanceof Element
          ? t.closest('a,button,[role="button"],summary')
          : null;

      dot.classList.toggle("txt", !!txt);
      hex.classList.toggle("txt", !!txt);
      setLock(inter);
    };

    const onDown = () => {
      lock.classList.add("dn");
      hex.classList.add("dn");
    };

    const onUp = () => {
      lock.classList.remove("dn");
      hex.classList.remove("dn");
    };

    const onLeave = () => document.body.classList.remove("cur-on");
    const onEnter = () => {
      if (seen) document.body.classList.add("cur-on");
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      hxx += (x - hxx) * 0.16;
      hxy += (y - hxy) * 0.16;
      dot.style.transform = `translate(${hxx - 3}px,${hxy - 3}px)`;
      hex.style.transform = `translate(${hxx - 22}px,${hxy - 22}px)`;

      if (target) {
        if (!document.contains(target)) {
          setLock(null);
        } else {
          const rc = target.getBoundingClientRect();
          const p = 7;
          lock.style.left = `${rc.left - p}px`;
          lock.style.top = `${rc.top - p}px`;
          lock.style.width = `${rc.width + p * 2}px`;
          lock.style.height = `${rc.height + p * 2}px`;
        }
      } else {
        lock.style.left = `${x - 20}px`;
        lock.style.top = `${y - 20}px`;
        lock.style.width = "40px";
        lock.style.height = "40px";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cur-on");
      dot.remove();
      hex.remove();
      lock.remove();
    };
  }, []);
}

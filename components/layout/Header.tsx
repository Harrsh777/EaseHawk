"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav, routes } from "@/lib/routes";
import { siteLogo } from "@/lib/site-logo";
import { MobileNav } from "./MobileNav";

type HeaderProps = {
  isHome?: boolean;
};

export function Header({ isHome = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const homeHref = isHome ? "#hero" : routes.home;
  const contactCta = isHome ? "#contact" : routes.contact;

  return (
    <>
      <header id="hdr" className={scrolled ? "scrolled" : undefined}>
        <Link className="logo" href={homeHref}>
          <Image
            className="site-logo"
            src="/logo.png"
            alt="EaseHawk Technologies"
            width={siteLogo.titanHeader.width}
            height={siteLogo.titanHeader.height}
            priority
          />
        </Link>
        <nav>
          {mainNav.map((item) => {
            const href =
              item.href === routes.home ? homeHref : item.href;
            return (
              <Link key={item.href} className="link" href={href}>
                {item.label}
              </Link>
            );
          })}
          <Link className="cta" href={contactCta}>
            <span>Start a Conversation</span>
          </Link>
        </nav>
        <button
          id="mnavBtn"
          type="button"
          aria-label="Menu"
          aria-controls="mnav"
          aria-expanded={menuOpen}
          className={menuOpen ? "on" : undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
          <i />
        </button>
      </header>
      <MobileNav
        isHome={isHome}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

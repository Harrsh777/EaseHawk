"use client";

import Link from "next/link";
import { mobileNav, routes } from "@/lib/routes";

type MobileNavProps = {
  isHome?: boolean;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ isHome = false, open, onClose }: MobileNavProps) {
  const homeHref = isHome ? routes.home : routes.home;

  return (
    <nav
      id="mnav"
      aria-label="Mobile menu"
      className={open ? "open" : undefined}
    >
      {mobileNav.map((item) => {
        const isActive = isHome && item.href === routes.home;
        const href = item.href === routes.home ? homeHref : item.href;
        return (
          <Link
            key={item.href}
            href={href}
            className={isActive ? "mactive" : undefined}
            onClick={onClose}
          >
            {item.label}
          </Link>
        );
      })}
      <Link className="mcta" href={routes.contact} onClick={onClose}>
        Start the Conversation
      </Link>
    </nav>
  );
}

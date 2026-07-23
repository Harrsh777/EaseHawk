import Image from "next/image";
import Link from "next/link";
import { footerLegal } from "@/lib/routes";
import { siteLogo } from "@/lib/site-logo";

export function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <Image
          className="foot-logo"
          src="/logo.png"
          alt="EaseHawk Technologies"
          width={siteLogo.footer.width}
          height={siteLogo.footer.height}
        />
        <nav className="foot-links">
          {footerLegal.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="rights">
        EaseHawk Technologies © 2026 · All Rights Reserved · Est. 2022 ·
        Engineering Intelligent Enterprises
      </p>
    </footer>
  );
}

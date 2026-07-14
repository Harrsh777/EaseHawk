import Image from "next/image";
import Link from "next/link";
import { footerLegal, footerServices } from "@/lib/routes";

export function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <Image
          src="/logo.png"
          alt="EaseHawk Technologies"
          width={800}
          height={246}
        />
        <nav className="foot-links">
          {footerLegal.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="foot-links foot-svcs">
          {footerServices.map((item) => (
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

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { siteLogo } from "@/lib/site-logo";

export function LegalHeader() {
  return (
    <header id="hdr" className="legal-hdr">
      <Link className="logo" href={routes.home}>
        <Image
          className="site-logo"
          src="/logo.png"
          alt="EaseHawk Technologies"
          width={siteLogo.legalHeader.width}
          height={siteLogo.legalHeader.height}
          priority
        />
      </Link>
      <Link className="back" href={routes.home}>
        ← Back to Site
      </Link>
    </header>
  );
}
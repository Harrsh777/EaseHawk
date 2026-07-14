import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

export function LegalHeader() {
  return (
    <header id="hdr" className="legal-hdr">
      <Link className="logo" href={routes.home}>
        <Image
          src="/logo.png"
          alt="EaseHawk Technologies"
          width={800}
          height={246}
          priority
        />
      </Link>
      <Link className="back" href={routes.home}>
        ← Back to Site
      </Link>
    </header>
  );
}
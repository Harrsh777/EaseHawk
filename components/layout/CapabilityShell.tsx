import { HtmlContent } from "@/components/content/PageContent";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { loadCapabilityFooter } from "@/lib/page-content";
import { routes } from "@/lib/routes";

type CapabilityShellProps = {
  children: ReactNode;
  accent?: string;
};

export function CapabilityShell({
  children,
  accent = "#FF810F",
}: CapabilityShellProps) {
  const footerHtml = loadCapabilityFooter();

  return (
    <div style={{ "--pacc": accent } as React.CSSProperties}>
      <header id="hdr">
        <Link href={routes.home}>
          <Image
            src="/logo.png"
            alt="EaseHawk Technologies"
            width={800}
            height={246}
            priority
          />
        </Link>
        <div className="hr">
          <a className="tel" href="tel:+919958478569">
            +91 99584 78569
          </a>
          <a
            className="ghost"
            href="https://calendly.com/easehawk"
            target="_blank"
            rel="noopener"
            style={{ padding: "11px 20px" }}
          >
            Book a Call
          </a>
          <a className="cta" href="#lead">
            <span>Get a Scoped Reply</span>
          </a>
        </div>
      </header>

      <main>{children}</main>

      {footerHtml ? <HtmlContent html={footerHtml} /> : null}

      <div id="mbar">
        <a className="cta" href="#lead">
          Get a scoped reply — 1 business day
        </a>
      </div>
    </div>
  );
}

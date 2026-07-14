import type { Metadata } from "next";
import { Jost, Poppins } from "next/font/google";
import { GlobalClient } from "@/components/providers/GlobalClient";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";
import "../styles/chat.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${poppins.variable}`}>
      <body
        style={
          {
            "--display": "var(--font-jost), sans-serif",
            "--body": "var(--font-poppins), sans-serif",
          } as React.CSSProperties
        }
      >
        {children}
        <GlobalClient />
      </body>
    </html>
  );
}

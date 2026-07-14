import type { Metadata } from "next";
import "../../styles/capability.css";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";
import { siteSubtitle, siteTitle } from "@/lib/siteConfig";
import "./globals.css";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return {
    title: siteTitle(),
    description: siteSubtitle(),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Mono, Outfit } from "next/font/google";

import { PublicFooter } from "@/components/public-footer";
import { SiteHeader } from "@/components/site-header";
import { siteName } from "@/lib/site";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "A director's personal recommendation roster for private music lesson teachers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${ibmPlexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <PublicFooter />
      </body>
    </html>
  );
}

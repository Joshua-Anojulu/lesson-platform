import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PublicFooter } from "@/components/public-footer";
import { SiteHeader } from "@/components/site-header";
import { siteName } from "@/lib/site";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "optional",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
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

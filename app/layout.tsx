import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Handwriting accent: margin notes and button labels only, never body text.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: {
    default: "Sahan",
    template: "%s · Sahan",
  },
  description:
    "Personal website of Sahan: a blog and a creative outlet for texts, images and videos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only rounded-sm bg-paper px-4 py-3 font-mono text-xs tracking-wider text-ink uppercase focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 focus:outline-none sm:py-16"
        >
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThemeScript } from "@/components/theme-script";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sahan's own handwriting: margin notes, button labels and large Creative
// Outlet headings only, never body text (brief, section 3). No adjusted
// Arial fallback, so glyphs the font lacks (umlauts, @, #) fall back to the
// text font through --font-hand in globals.css instead. Always set in
// uppercase for now: the lowercase glyphs are drawn too small to read at
// margin-note sizes (x-height about 16% of the em, Geist about 53%).
const sahanHand = localFont({
  src: "../public/fonts/sahan-hand.ttf",
  variable: "--font-sahan-hand",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  // Large preview; the image falls back to og:image.
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline theme script may set data-theme before React hydrates.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sahanHand.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
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
        <SiteFooter />
      </body>
    </html>
  );
}

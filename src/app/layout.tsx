import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import Provider from "../providers/ios-pwa-splash";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "امضا",
  description: "امضا",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-startup-image"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/android-chrome-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4b8cde" />

        <meta property="og:title" content="امضا" />
        <meta property="og:description" content="امضا" />
        <meta property="og:type" content="website" />
        <meta content="logo" property="og:image" />
        <meta content="" property="og:image:secure_url" />
        <meta name="apple-mobile-web-app-title" content="امضا" />
        <meta name="application-name" content="امضا" />
        <meta name="msapplication-TileColor" content="#4b8cde" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#4b8cde" />
        <meta name="author" content="Mohammadreza Zare" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider />
        {children}
      </body>
    </html>
  );
}

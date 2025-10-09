import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les 8 intelligences",
  description: "Decouvre tes 8 intelligences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-dvh gap-4">
          <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b shadow-sm p-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-center">
                Les 8 intelligences
              </h1>
            </Link>
          </header>
          <main className="w-sm max-w-dvw sm:max-w-sm m-auto overflow-hidden flex items-center justify-center p-4">
            {children}
          </main>
          <footer className="flex flex-wrap items-center justify-center max-w-full p-4 sm:pb-10">
            <div>
              <a
                href="https://artsetmetiers.fr"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  priority={true}
                  src="/logo-AM-trans-322x84.png"
                  alt="Arts et Métiers"
                  width={322 / 2}
                  height={84 / 2}
                />
              </a>
            </div>
          </footer>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}

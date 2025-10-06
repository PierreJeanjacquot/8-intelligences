import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <div className="font-sans w-sm max-w-dvw sm:max-w-sm m-auto grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-2 gap-4 sm:pb-20 sm:pt-20">
          <header className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center">
              Les 8 intelligences
            </h1>
          </header>
          <main className="w-full overflow-hidden flex items-center justify-center">
            {children}
          </main>
          <footer className="flex flex-wrap items-center justify-center max-w-full">
            <div>la Fête de la science & Arts&Métiers</div>
          </footer>
        </div>
      </body>
    </html>
  );
}

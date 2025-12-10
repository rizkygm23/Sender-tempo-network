import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tempo Wallet - Manage Your Crypto",
  description: "Manage your wallet and send payments on Tempo network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>

        {/* Watermark */}
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none select-none">
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-medium text-gray-400">@RizzDroop23</span>
          </div>
        </div>
      </body>
    </html>
  );
}

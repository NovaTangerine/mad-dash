import type { Metadata } from "next";
import { Inter, Nunito, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DevToolsPanel } from "@/components/ui/DevToolsPanel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WRC Prototype",
  description: "Worldwide Run Club Interactive Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col font-sans">
        {children}
        <DevToolsPanel />
      </body>
    </html>
  );
}

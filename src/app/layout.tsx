import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AEDI — Automated Electronic Design Initiative",
  description:
    "Empowering India's hardware ecosystem through high-powered computing and AI-enabled Electronic Design Automation toolkits.",
  keywords: ["AEDI", "Electronic Design Automation", "EDA", "AI India", "Deep Tech", "NVIDIA Inception"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "AEDI — Automated Electronic Design Initiative",
    description: "Empowering India's hardware ecosystem through AI-enabled Electronic Design Automation.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1E1B1B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

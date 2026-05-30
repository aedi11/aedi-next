import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEDI — Concept Demo",
  description: "AI-powered battery pack design generator",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

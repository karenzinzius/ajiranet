"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

type SiteFrameProps = {
  children: React.ReactNode;
};

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
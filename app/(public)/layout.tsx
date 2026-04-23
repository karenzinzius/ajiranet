import { SiteFrame } from "@/components/ui/SiteFrame";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
import { EmployerFrame } from "@/components/employer/EmployerFrame";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <EmployerFrame>{children}</EmployerFrame>;
}
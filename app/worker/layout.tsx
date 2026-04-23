import { WorkerFrame } from "@/components/worker/WorkerFrame";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return <WorkerFrame>{children}</WorkerFrame>;
}
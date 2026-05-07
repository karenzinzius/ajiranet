"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Message = {
  id: string;
  from: string;
  fromRole: "employer" | "worker" | "system";
  to: "employer" | "worker";
  subject: string;
  body: string;
  time: string;
  read: boolean;
};

export type EscrowItem = {
  id: string;
  workerName: string;
  workerJob: string;
  amount: string;
  status: "secured" | "pending_release" | "released";
};

export type InvitedApplicant = {
  id: string;
  name: string;
  role: string;
  rating: number;
  wage: string;
  reviews: number;
  skills: string[];
  availability: string;
  invitedAt: string;
};

export type SavedJob = {
  id: string;
  title: string;
  employer: string;
  location: string;
  wage: string;
  tags: string[];
  description?: string;
  savedAt: string;
};

export type WorkerApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  employer: string;
  location: string;
  wage: string;
  tags: string[];
  description?: string;
  appliedAt: string;
  status: "pending" | "shortlisted" | "hired" | "rejected";
  workerName: string;
  workerRating: number;
  workerReviews: number;
  workerSkills: string[];
};

export type BoostPlan = "week" | "month";

export type ActiveBoost = {
  plan: BoostPlan;
  expiresAt: string;
};

const BOOST_COST: Record<BoostPlan, number> = { week: 2000, month: 7000 };

type Store = {
  employerMessages: Message[];
  workerMessages: Message[];
  escrowItems: EscrowItem[];
  invitedApplicants: InvitedApplicant[];
  workerApplications: WorkerApplication[];
  savedJobs: SavedJob[];
  employerWalletBalance: number;
  workerWalletBalance: number;
  workerBoost: ActiveBoost | null;
  addMessage: (msg: Omit<Message, "id" | "time" | "read">) => void;
  markMessageRead: (id: string, to: "employer" | "worker") => void;
  addEscrowItem: (item: Omit<EscrowItem, "id">) => void;
  updateEscrowStatus: (id: string, status: EscrowItem["status"]) => void;
  addInvitedApplicant: (applicant: Omit<InvitedApplicant, "invitedAt">) => void;
  removeInvitedApplicant: (id: string) => void;
  addWorkerApplication: (app: Omit<WorkerApplication, "id" | "appliedAt" | "status">) => void;
  removeWorkerApplication: (id: string) => void;
  toggleSavedJob: (job: Omit<SavedJob, "savedAt">) => void;
  deductEmployerWallet: (amount: number) => boolean;
  activateWorkerBoost: (plan: BoostPlan) => boolean;
};

const StoreContext = createContext<Store>({
  employerMessages: [],
  workerMessages: [],
  escrowItems: [],
  invitedApplicants: [],
  workerApplications: [],
  savedJobs: [],
  employerWalletBalance: 45000,
  workerWalletBalance: 12000,
  workerBoost: null,
  addMessage: () => {},
  markMessageRead: () => {},
  addEscrowItem: () => {},
  updateEscrowStatus: () => {},
  addInvitedApplicant: () => {},
  removeInvitedApplicant: () => {},
  addWorkerApplication: () => {},
  removeWorkerApplication: () => {},
  toggleSavedJob: () => {},
  deductEmployerWallet: () => false,
  activateWorkerBoost: () => false,
});

const initialEmployerMessages: Message[] = [
  {
    id: "em-1",
    from: "AjiraNet",
    fromRole: "system",
    to: "employer",
    subject: "Welcome to AjiraNet!",
    body: "Your employer account is ready. Start browsing workers and posting jobs today.",
    time: "25 Apr 2026",
    read: true,
  },
];

const initialWorkerMessages: Message[] = [
  {
    id: "wm-1",
    from: "AjiraNet",
    fromRole: "system",
    to: "worker",
    subject: "Welcome to AjiraNet!",
    body: "Your worker profile is live. Start browsing jobs and applying today. Make sure your profile and gallery are complete — employers notice!",
    time: "25 Apr 2026",
    read: true,
  },
];

const initialEscrowItems: EscrowItem[] = [
  {
    id: "esc-1",
    workerName: "Anna Mary",
    workerJob: "Gardening",
    amount: "35,000",
    status: "secured",
  },
];

function boostExpiry(plan: BoostPlan): string {
  const days = plan === "week" ? 7 : 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [employerMessages, setEmployerMessages] = useState<Message[]>(initialEmployerMessages);
  const [workerMessages, setWorkerMessages] = useState<Message[]>(initialWorkerMessages);
  const [escrowItems, setEscrowItems] = useState<EscrowItem[]>(initialEscrowItems);
  const [invitedApplicants, setInvitedApplicants] = useState<InvitedApplicant[]>([]);
  const [workerApplications, setWorkerApplications] = useState<WorkerApplication[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [employerWalletBalance, setEmployerWalletBalance] = useState(45000);
  const [workerWalletBalance, setWorkerWalletBalance] = useState(12000);
  const [workerBoost, setWorkerBoost] = useState<ActiveBoost | null>(null);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const apps = localStorage.getItem("ajiranet_applications");
      if (apps) setWorkerApplications(JSON.parse(apps));
      const saved = localStorage.getItem("ajiranet_saved_jobs");
      if (saved) setSavedJobs(JSON.parse(saved));
      const ewb = localStorage.getItem("ajiranet_employer_wallet");
      if (ewb) setEmployerWalletBalance(JSON.parse(ewb));
      const wwb = localStorage.getItem("ajiranet_worker_wallet");
      if (wwb) setWorkerWalletBalance(JSON.parse(wwb));
      const wb = localStorage.getItem("ajiranet_worker_boost");
      if (wb) setWorkerBoost(JSON.parse(wb));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("ajiranet_applications", JSON.stringify(workerApplications)); } catch {}
  }, [workerApplications]);

  useEffect(() => {
    try { localStorage.setItem("ajiranet_saved_jobs", JSON.stringify(savedJobs)); } catch {}
  }, [savedJobs]);

  useEffect(() => {
    try { localStorage.setItem("ajiranet_employer_wallet", JSON.stringify(employerWalletBalance)); } catch {}
  }, [employerWalletBalance]);

  useEffect(() => {
    try { localStorage.setItem("ajiranet_worker_wallet", JSON.stringify(workerWalletBalance)); } catch {}
  }, [workerWalletBalance]);

  useEffect(() => {
    try { localStorage.setItem("ajiranet_worker_boost", JSON.stringify(workerBoost)); } catch {}
  }, [workerBoost]);

  const addMessage = (msg: Omit<Message, "id" | "time" | "read">) => {
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      time: "Just now",
      read: false,
    };
    if (msg.to === "employer") {
      setEmployerMessages((prev) => [newMsg, ...prev]);
    } else {
      setWorkerMessages((prev) => [newMsg, ...prev]);
    }
  };

  const markMessageRead = (id: string, to: "employer" | "worker") => {
    if (to === "employer") {
      setEmployerMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } else {
      setWorkerMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    }
  };

  const addEscrowItem = (item: Omit<EscrowItem, "id">) => {
    setEscrowItems((prev) => [...prev, { ...item, id: `esc-${Date.now()}` }]);
  };

  const updateEscrowStatus = (id: string, status: EscrowItem["status"]) => {
    setEscrowItems((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const addInvitedApplicant = (applicant: Omit<InvitedApplicant, "invitedAt">) => {
    const already = invitedApplicants.some((a) => a.id === applicant.id);
    if (already) return;
    setInvitedApplicants((prev) => [
      ...prev,
      { ...applicant, invitedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
    ]);
  };

  const removeInvitedApplicant = (id: string) => {
    setInvitedApplicants((prev) => prev.filter((a) => a.id !== id));
  };

  const addWorkerApplication = (app: Omit<WorkerApplication, "id" | "appliedAt" | "status">) => {
    const already = workerApplications.some((a) => a.jobId === app.jobId);
    if (already) return;
    setWorkerApplications((prev) => [
      ...prev,
      {
        ...app,
        id: `wapp-${Date.now()}`,
        appliedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        status: "pending",
      },
    ]);
  };

  const removeWorkerApplication = (id: string) => {
    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleSavedJob = (job: Omit<SavedJob, "savedAt">) => {
    const exists = savedJobs.some((j) => j.id === job.id);
    if (exists) {
      setSavedJobs((prev) => prev.filter((j) => j.id !== job.id));
    } else {
      setSavedJobs((prev) => [
        { ...job, savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
        ...prev,
      ]);
    }
  };

  const deductEmployerWallet = (amount: number): boolean => {
    if (employerWalletBalance < amount) return false;
    setEmployerWalletBalance((prev) => prev - amount);
    return true;
  };

  const activateWorkerBoost = (plan: BoostPlan): boolean => {
    const cost = BOOST_COST[plan];
    if (workerWalletBalance < cost) return false;
    setWorkerWalletBalance((prev) => prev - cost);
    setWorkerBoost({ plan, expiresAt: boostExpiry(plan) });
    return true;
  };

  return (
    <StoreContext.Provider value={{
      employerMessages, workerMessages, escrowItems, invitedApplicants, workerApplications, savedJobs,
      employerWalletBalance, workerWalletBalance, workerBoost,
      addMessage, markMessageRead, addEscrowItem, updateEscrowStatus,
      addInvitedApplicant, removeInvitedApplicant, addWorkerApplication, removeWorkerApplication,
      toggleSavedJob, deductEmployerWallet, activateWorkerBoost,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export { BOOST_COST };

export type SubscriberStatus = "pending" | "contacted" | "recovered" | "lost";

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  cancelledAt: string;
  reason: string;
  reasonCategory: "quality" | "price" | "usage" | "competitor" | "other";
  status: SubscriberStatus;
  emailsSent: number;
  lastTouch: string | null;
  tenureMonths: number;
};

export const mockSubscribers: Subscriber[] = [
  {
    id: "sub_01",
    name: "Sarah Kowalski",
    email: "sarah.k@gmail.com",
    plan: "Pro",
    mrr: 24.99,
    cancelledAt: "2026-04-01",
    reason: "Small issues added up",
    reasonCategory: "quality",
    status: "recovered",
    emailsSent: 1,
    lastTouch: "2026-04-02",
    tenureMonths: 14,
  },
  {
    id: "sub_02",
    name: "Marcus Chen",
    email: "m.chen@studio.co",
    plan: "Team",
    mrr: 79.0,
    cancelledAt: "2026-04-05",
    reason: "Too expensive for our stage",
    reasonCategory: "price",
    status: "contacted",
    emailsSent: 2,
    lastTouch: "2026-04-07",
    tenureMonths: 8,
  },
  {
    id: "sub_03",
    name: "Priya Ramanathan",
    email: "priya@makeit.dev",
    plan: "Pro",
    mrr: 24.99,
    cancelledAt: "2026-04-06",
    reason: "Didn't use it enough",
    reasonCategory: "usage",
    status: "contacted",
    emailsSent: 1,
    lastTouch: "2026-04-06",
    tenureMonths: 3,
  },
  {
    id: "sub_04",
    name: "Tom Ødegaard",
    email: "tom@northlab.no",
    plan: "Pro",
    mrr: 24.99,
    cancelledAt: "2026-04-07",
    reason: "Switched to a competitor",
    reasonCategory: "competitor",
    status: "pending",
    emailsSent: 0,
    lastTouch: null,
    tenureMonths: 22,
  },
  {
    id: "sub_05",
    name: "Aisha Bello",
    email: "aisha@flowstate.app",
    plan: "Team",
    mrr: 79.0,
    cancelledAt: "2026-04-08",
    reason: "Sync was unreliable",
    reasonCategory: "quality",
    status: "pending",
    emailsSent: 0,
    lastTouch: null,
    tenureMonths: 6,
  },
  {
    id: "sub_06",
    name: "Daniel Rivera",
    email: "drivera@indielabs.com",
    plan: "Pro",
    mrr: 24.99,
    cancelledAt: "2026-03-29",
    reason: "Project ended",
    reasonCategory: "other",
    status: "lost",
    emailsSent: 2,
    lastTouch: "2026-04-03",
    tenureMonths: 11,
  },
  {
    id: "sub_07",
    name: "Lena Fischer",
    email: "lena.f@berlintech.de",
    plan: "Pro",
    mrr: 24.99,
    cancelledAt: "2026-04-02",
    reason: "Speed was frustrating",
    reasonCategory: "quality",
    status: "contacted",
    emailsSent: 1,
    lastTouch: "2026-04-04",
    tenureMonths: 9,
  },
];

export function subscriberStats(subs: Subscriber[]) {
  const recovered = subs.filter((s) => s.status === "recovered");
  const atRisk = subs.filter((s) => s.status === "pending" || s.status === "contacted");
  const mrrRecovered = recovered.reduce((acc, s) => acc + s.mrr, 0);
  const mrrAtRisk = atRisk.reduce((acc, s) => acc + s.mrr, 0);
  return {
    recoveredCount: recovered.length,
    atRiskCount: atRisk.length,
    mrrRecovered,
    mrrAtRisk,
    recoveryRate: subs.length ? Math.round((recovered.length / subs.length) * 100) : 0,
  };
}

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, Clock, Mail, AlertCircle, TrendingUp, Users, DollarSign } from "lucide-react";
import { mockSubscribers, subscriberStats, type Subscriber, type SubscriberStatus } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubscriberDetail from "@/components/SubscriberDetail";
import BillingBanner from "@/components/BillingBanner";

const FILTERS: { key: "all" | SubscriberStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "contacted", label: "Contacted" },
  { key: "recovered", label: "Recovered" },
  { key: "lost", label: "Lost" },
];

const statusMeta: Record<SubscriberStatus, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  contacted: { label: "Contacted", color: "bg-blue-100 text-blue-700", icon: Mail },
  recovered: { label: "Recovered", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-slate-100 text-slate-600", icon: AlertCircle },
};

function StatusPill({ status }: { status: SubscriberStatus }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.color}`}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

function MetricCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card className="rounded-[1.75rem]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-xl p-2.5 ${accent}`}>{icon}</div>
        </div>
        <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
        <div className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-400">{label}</div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [filter, setFilter] = useState<"all" | SubscriberStatus>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Subscriber | null>(null);

  const stats = useMemo(() => subscriberStats(subscribers), [subscribers]);

  const latestRecovered = useMemo(() => {
    const recovered = subscribers.filter((s) => s.status === "recovered");
    if (recovered.length === 0) return null;
    return recovered.reduce((latest, s) => (s.cancelledAt > latest.cancelledAt ? s : latest));
  }, [subscribers]);

  const pendingCount = useMemo(
    () => subscribers.filter((s) => s.status === "pending").length,
    [subscribers],
  );

  const filtered = useMemo(() => {
    return subscribers.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (query && !`${s.name} ${s.email} ${s.reason}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [subscribers, filter, query]);

  const handleStatusChange = (id: string, status: SubscriberStatus) => {
    setSubscribers((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-slate-500">Every cancellation, every recovery. All in one view.</p>
      </div>

      <BillingBanner
        recoveredCount={stats.recoveredCount}
        pendingCount={pendingCount}
        latestRecoveredName={latestRecovered?.name}
        latestRecoveredMrr={latestRecovered?.mrr}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Recovery rate"
          value={`${stats.recoveryRate}%`}
          icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
          accent="bg-blue-100"
        />
        <MetricCard
          label="Recovered"
          value={String(stats.recoveredCount)}
          icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
          accent="bg-green-100"
        />
        <MetricCard
          label="MRR recovered"
          value={`$${stats.mrrRecovered.toFixed(0)}`}
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          accent="bg-emerald-100"
        />
        <MetricCard
          label="At risk"
          value={String(stats.atRiskCount)}
          icon={<Users className="h-5 w-5 text-amber-600" />}
          accent="bg-amber-100"
        />
      </div>

      <Card className="rounded-[1.75rem] overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <div className="relative md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, reason"
              className="h-10 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Subscriber</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Cancelled</th>
                <th className="px-5 py-3">Reason</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">MRR</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <motion.tr
                  key={s.id}
                  whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.7)" }}
                  onClick={() => setSelected(s)}
                  className="cursor-pointer border-t transition"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{s.plan}</td>
                  <td className="px-5 py-4 text-slate-600">{s.cancelledAt}</td>
                  <td className="px-5 py-4 max-w-xs">
                    <div className="truncate text-slate-700">{s.reason}</div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={s.status} />
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-900">${s.mrr.toFixed(2)}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-500">
                    No subscribers match this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <SubscriberDetail
        subscriber={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

import { useMemo, useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  Mail,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Sparkles,
  X,
  PauseCircle,
} from "lucide-react";
import { mockSubscribers, subscriberStats, type Subscriber, type SubscriberStatus } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubscriberDetail from "@/components/SubscriberDetail";
import BillingBanner from "@/components/BillingBanner";
import { useAuth } from "@/context/AuthContext";

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
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.color}`}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

function MetricTile({
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
    <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-2.5 ${accent}`}>{icon}</div>
      </div>
      <div className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400">{label}</div>
    </div>
  );
}

function ChangelogDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { onboarding, updateOnboarding } = useAuth();
  const [value, setValue] = useState(onboarding.changelog);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setValue(onboarding.changelog);
      setSavedAt(null);
    }
  }, [open, onboarding.changelog]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateOnboarding({ changelog: value });
    setSavedAt(Date.now());
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200/70 px-8 py-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Changelog</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Update what's shipped</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <p className="text-sm leading-7 text-slate-500">
                  Winback uses this to write honest, specific winback messages — not generic discounts. Bullet points
                  work best.
                </p>
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  rows={16}
                  placeholder="- Fixed the sync bug that was duplicating events&#10;- Rebuilt the mobile app — 3x faster&#10;- New billing dashboard"
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-[13px] leading-7 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-0"
                />
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  Changes take effect on the next winback email.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/70 bg-slate-50/60 px-8 py-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[13px] font-medium text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <Button type="submit" className="rounded-full px-6">
                  {savedAt ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Saved
                    </>
                  ) : (
                    "Save changelog"
                  )}
                </Button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Dashboard() {
  const { onboarding } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [filter, setFilter] = useState<"all" | SubscriberStatus>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Subscriber | null>(null);
  const [changelogOpen, setChangelogOpen] = useState(false);

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
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Overview</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Dashboard.</h1>
          <p className="mt-2 text-[15px] text-slate-500">Every cancellation, every recovery — all in one view.</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-slate-200 bg-white px-5 shadow-sm"
          onClick={() => setChangelogOpen(true)}
        >
          <FileText className="mr-2 h-4 w-4 text-blue-600" />
          Update changelog
        </Button>
      </div>

      {onboarding.emailsPaused && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <PauseCircle className="h-4 w-4 shrink-0" />
          <span>
            Winback emails are paused. New cancellations are still tracked, but nothing is sent. Resume in{" "}
            <a href="/settings" className="font-semibold underline">
              Settings
            </a>
            .
          </span>
        </div>
      )}

      <BillingBanner
        recoveredCount={stats.recoveredCount}
        pendingCount={pendingCount}
        latestRecoveredName={latestRecovered?.name}
        latestRecoveredMrr={latestRecovered?.mrr}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricTile
          label="Recovery rate"
          value={`${stats.recoveryRate}%`}
          icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
          accent="bg-blue-100"
        />
        <MetricTile
          label="Recovered"
          value={String(stats.recoveredCount)}
          icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
          accent="bg-green-100"
        />
        <MetricTile
          label="MRR recovered"
          value={`$${stats.mrrRecovered.toFixed(0)}`}
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          accent="bg-emerald-100"
        />
        <MetricTile
          label="At risk"
          value={String(stats.atRiskCount)}
          icon={<Users className="h-5 w-5 text-amber-600" />}
          accent="bg-amber-100"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-3 border-b border-slate-200/70 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
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
              className="h-10 rounded-full pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/60 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
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
                  className="cursor-pointer border-t border-slate-100 transition"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{s.plan}</td>
                  <td className="px-5 py-4 text-slate-600">{s.cancelledAt}</td>
                  <td className="max-w-xs px-5 py-4">
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
      </div>

      <SubscriberDetail
        subscriber={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
      />

      <ChangelogDrawer open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </div>
  );
}

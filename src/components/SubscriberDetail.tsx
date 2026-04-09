import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle2, Clock, AlertCircle, Send, Archive, RotateCcw } from "lucide-react";
import type { Subscriber, SubscriberStatus } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

type Props = {
  subscriber: Subscriber | null;
  onClose: () => void;
  onStatusChange?: (id: string, status: SubscriberStatus) => void;
};

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
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}

export default function SubscriberDetail({ subscriber, onClose, onStatusChange }: Props) {
  return (
    <AnimatePresence>
      {subscriber && (
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
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-6 py-4 backdrop-blur">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Subscriber</div>
                <div className="text-lg font-bold text-slate-900">{subscriber.name}</div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <StatusPill status={subscriber.status} />
                <div className="text-right">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">MRR</div>
                  <div className="text-xl font-bold text-slate-900">${subscriber.mrr.toFixed(2)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</div>
                  <div className="mt-1 truncate text-sm font-medium text-slate-800">{subscriber.email}</div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Plan</div>
                  <div className="mt-1 text-sm font-medium text-slate-800">{subscriber.plan}</div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Cancelled</div>
                  <div className="mt-1 text-sm font-medium text-slate-800">{subscriber.cancelledAt}</div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tenure</div>
                  <div className="mt-1 text-sm font-medium text-slate-800">{subscriber.tenureMonths} months</div>
                </div>
              </div>

              <div className="rounded-2xl border bg-blue-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Cancellation reason</div>
                <div className="mt-2 text-base font-semibold text-slate-900">"{subscriber.reason}"</div>
                <div className="mt-1 text-xs capitalize text-slate-500">
                  Category: {subscriber.reasonCategory}
                </div>
              </div>

              <div>
                <div className="mb-3 text-sm font-semibold text-slate-700">Email history</div>
                {subscriber.emailsSent === 0 ? (
                  <div className="rounded-2xl border border-dashed p-4 text-sm text-slate-500">
                    No emails sent yet. Winback will send the first one automatically.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Array.from({ length: subscriber.emailsSent }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-2xl border p-4">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <Send className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-800">
                            Winback email #{i + 1} sent
                          </div>
                          <div className="text-xs text-slate-500">
                            {i === 0 ? subscriber.lastTouch ?? "—" : "Follow-up"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-5">
                <div className="mb-3 text-sm font-semibold text-slate-700">Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => onStatusChange?.(subscriber.id, "contacted")}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Resend
                  </Button>
                  <Button
                    className="rounded-full"
                    onClick={() => onStatusChange?.(subscriber.id, "recovered")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark recovered
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl col-span-2"
                    onClick={() => onStatusChange?.(subscriber.id, "lost")}
                  >
                    <Archive className="mr-2 h-4 w-4" /> Archive as lost
                  </Button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

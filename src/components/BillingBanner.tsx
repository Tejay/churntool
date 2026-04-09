import { useState } from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type Props = {
  recoveredCount: number;
  pendingCount: number;
  latestRecoveredName?: string;
  latestRecoveredMrr?: number;
};

const DISMISS_KEY = "winback.billingBanner.dismissedAt";

export default function BillingBanner({
  recoveredCount,
  pendingCount,
  latestRecoveredName,
  latestRecoveredMrr,
}: Props) {
  const { onboarding, updateOnboarding } = useAuth();
  const [dismissedAt, setDismissedAt] = useState<number>(() => {
    const v = typeof window !== "undefined" ? localStorage.getItem(DISMISS_KEY) : null;
    return v ? Number(v) : 0;
  });

  // Rules:
  // - Hide if billing already added
  // - Hide until at least one recovery
  // - Hide if user dismissed at current recovered count (re-shows on next recovery)
  if (onboarding.billingAdded) {
    return (
      <div className="flex items-center gap-3 rounded-[1.75rem] border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-800">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>Billing active — £49/mo + 10% of recovered MRR (first year each subscriber stays back).</span>
      </div>
    );
  }

  if (recoveredCount < 1) return null;
  if (dismissedAt >= recoveredCount) return null;

  const firstRecovery = recoveredCount === 1;

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(recoveredCount));
    setDismissedAt(recoveredCount);
  };

  const handleAddBilling = () => {
    updateOnboarding({ billingAdded: true });
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-100 p-2.5">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            {firstRecovery ? (
              <>
                <div className="text-lg font-bold text-slate-900">
                  🎉 Your first recovery is in
                  {latestRecoveredName ? ` — ${latestRecoveredName} is back` : ""}
                  {latestRecoveredMrr ? ` at $${latestRecoveredMrr.toFixed(2)}/mo` : ""}.
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  That one was on us. Your next recovery starts billing at{" "}
                  <strong className="text-slate-900">£49/mo + 10% of recovered MRR</strong> (first year each subscriber
                  stays back).{" "}
                  {pendingCount > 0 ? (
                    <span className="font-medium text-blue-700">
                      You have {pendingCount} cancellation{pendingCount !== 1 ? "s" : ""} waiting.
                    </span>
                  ) : null}
                </p>
              </>
            ) : (
              <>
                <div className="text-lg font-bold text-slate-900">
                  {pendingCount > 0
                    ? "You've got more cancellations waiting."
                    : "Ready for your next recovery?"}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Add billing now to let Winback recover them.{" "}
                  <strong className="text-slate-900">£49/mo + 10%</strong> of recovered MRR (first year only). Cancel
                  anytime.
                </p>
              </>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button className="rounded-xl" onClick={handleAddBilling}>
                Add billing to keep recovering
              </Button>
              <button
                onClick={handleDismiss}
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
  );
}

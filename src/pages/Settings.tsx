import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import {
  CreditCard,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Save,
  Sparkles,
  PauseCircle,
  PlayCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

function Section({
  eyebrow,
  title,
  description,
  children,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "danger";
}) {
  const isDanger = tone === "danger";
  return (
    <section
      className={`overflow-hidden rounded-3xl border ${
        isDanger ? "border-red-200/80 bg-red-50/40" : "border-slate-200/70 bg-white"
      } shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
    >
      <header className="border-b border-slate-200/60 px-8 pb-6 pt-7">
        {eyebrow && (
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
              isDanger ? "text-red-600" : "text-blue-600"
            }`}
          >
            {eyebrow}
          </div>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </header>
      <div className="px-8 py-7">{children}</div>
    </section>
  );
}

function Row({
  label,
  sub,
  action,
}: {
  label: string;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-b-0">
      <div>
        <div className="text-[14px] font-medium text-slate-900">{label}</div>
        {sub && <div className="mt-0.5 text-[13px] text-slate-500">{sub}</div>}
      </div>
      {action}
    </div>
  );
}

export default function Settings() {
  const { user, onboarding, updateOnboarding, updateUser } = useAuth();
  const [productName, setProductName] = useState(onboarding.productName);
  const [founderName, setFounderName] = useState(onboarding.founderName || user?.name || "");
  const [changelog, setChangelog] = useState(onboarding.changelog);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setProductName(onboarding.productName);
    setFounderName(onboarding.founderName || user?.name || "");
    setChangelog(onboarding.changelog);
  }, [onboarding.productName, onboarding.founderName, onboarding.changelog, user?.name]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateOnboarding({ productName, founderName, changelog });
    if (founderName && founderName !== user?.name) updateUser({ name: founderName });
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2200);
  };

  const handleTogglePause = () => {
    const next = !onboarding.emailsPaused;
    if (next) {
      const ok = window.confirm(
        "Pause all winback emails?\n\nNew cancellations will still be tracked, but no emails will be sent until you resume.",
      );
      if (!ok) return;
    }
    updateOnboarding({ emailsPaused: next });
  };

  const handleDisableBilling = () => {
    const ok = window.confirm("Remove payment method? You won't be billed, but recoveries will pause.");
    if (!ok) return;
    updateOnboarding({ billingAdded: false });
  };

  return (
    <div className="space-y-10">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Workspace</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Settings.</h1>
        <p className="mt-2 text-[15px] text-slate-500">Connections, plan, and the voice of your winback emails.</p>
      </div>

      {/* Connected accounts */}
      <Section
        eyebrow="Integrations"
        title="Connected accounts"
        description="These power Winback. Reconnect or disconnect at any time."
      >
        <div className="space-y-3">
          <ConnectionRow
            icon={<CreditCard className="h-5 w-5 text-white" />}
            iconBg="bg-[#635bff]"
            title="Stripe"
            subtitle="Receives cancellation webhooks"
            connected={onboarding.stripeConnected}
            onConnect={() => updateOnboarding({ stripeConnected: true })}
            onDisconnect={() => updateOnboarding({ stripeConnected: false })}
          />
          <ConnectionRow
            icon={<Mail className="h-5 w-5 text-red-500" />}
            iconBg="bg-white border border-slate-200"
            title="Gmail"
            subtitle="Sends winback emails from your address"
            connected={onboarding.gmailConnected}
            onConnect={() => updateOnboarding({ gmailConnected: true })}
            onDisconnect={() => updateOnboarding({ gmailConnected: false })}
          />
        </div>
      </Section>

      {/* Subscription & Plan */}
      <Section
        eyebrow="Billing"
        title="Subscription"
        description="You only pay once Winback is actively recovering customers."
      >
        <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-blue-50/60 via-white to-white p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Current plan</div>
                {onboarding.billingAdded ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    <Sparkles className="h-3 w-3" /> Free trial
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className="text-4xl font-semibold tracking-tight text-slate-900">£49</div>
                <div className="text-sm text-slate-500">/ month</div>
              </div>
              <div className="mt-1 text-sm text-slate-600">
                + <span className="font-semibold text-slate-900">10%</span> of recovered MRR for the first year each
                subscriber stays back.
              </div>
              <div className="mt-3 text-xs text-slate-400">First recovery always free · Cancel anytime</div>
            </div>
            {onboarding.billingAdded ? (
              <Button variant="outline" className="rounded-full" onClick={handleDisableBilling}>
                Manage
              </Button>
            ) : (
              <Button className="rounded-full" onClick={() => updateOnboarding({ billingAdded: true })}>
                Add payment method
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Row
            label="Billing contact"
            sub={user?.email}
            action={
              <Button variant="outline" size="sm" className="rounded-full">
                Update
              </Button>
            }
          />
          <Row
            label="Invoices"
            sub={onboarding.billingAdded ? "Sent to your billing contact on the 1st" : "None yet"}
            action={
              <Button variant="outline" size="sm" className="rounded-full" disabled={!onboarding.billingAdded}>
                View history
              </Button>
            }
          />
          <Row
            label="Billing currency"
            sub="GBP · invoiced by Winback Ltd."
            action={<span className="text-[13px] text-slate-400">Fixed</span>}
          />
        </div>
      </Section>

      {/* Product & sender */}
      <form onSubmit={handleSave}>
        <Section
          eyebrow="Voice"
          title="Product & sender"
          description="Used to personalise every winback email."
        >
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Product name
                </label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Notion, Linear, Figma"
                  className="mt-1.5 h-11 rounded-full px-5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Founder name
                </label>
                <Input
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  placeholder="Your name — emails sign off with this"
                  className="mt-1.5 h-11 rounded-full px-5"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Changelog (what you've shipped recently)
              </label>
              <textarea
                value={changelog}
                onChange={(e) => setChangelog(e.target.value)}
                rows={8}
                className="mt-1.5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-[13px] leading-7 text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-5">
              <div className="text-[13px] text-slate-500">
                Logged in as <span className="font-medium text-slate-700">{user?.email}</span>
              </div>
              <Button type="submit" className="rounded-full px-6">
                {savedAt ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </Section>
      </form>

      {/* Danger zone */}
      <Section
        eyebrow="Danger zone"
        title="Stop Winback from sending"
        description="Safe to use. Cancellations keep flowing in — nothing is sent until you resume."
        tone="danger"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-6 rounded-2xl border border-red-200/70 bg-white p-5">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  onboarding.emailsPaused ? "bg-amber-100" : "bg-red-100"
                }`}
              >
                {onboarding.emailsPaused ? (
                  <PauseCircle className="h-5 w-5 text-amber-700" />
                ) : (
                  <PauseCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">
                  {onboarding.emailsPaused ? "Winback emails are paused" : "Pause all winback emails"}
                </div>
                <div className="mt-0.5 max-w-lg text-[13px] text-slate-500">
                  {onboarding.emailsPaused
                    ? "New cancellations are still tracked, but no winback emails are being sent. Resume whenever you're ready."
                    : "Temporarily stop sending any winback email. Useful during incidents, launches, or while you rework your changelog."}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className={`rounded-full shrink-0 ${
                onboarding.emailsPaused
                  ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                  : "border-red-200 bg-white text-red-700 hover:bg-red-50"
              }`}
              onClick={handleTogglePause}
            >
              {onboarding.emailsPaused ? (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" /> Resume sending
                </>
              ) : (
                <>
                  <PauseCircle className="mr-2 h-4 w-4" /> Pause all emails
                </>
              )}
            </Button>
          </div>

          <div className="flex items-start justify-between gap-6 rounded-2xl border border-red-200/70 bg-white p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">Delete workspace</div>
                <div className="mt-0.5 max-w-lg text-[13px] text-slate-500">
                  Permanently remove your Winback workspace, disconnect Stripe and Gmail, and cancel billing. This can't
                  be undone.
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="shrink-0 rounded-full border-red-200 bg-white text-red-700 hover:bg-red-50"
              onClick={() => window.alert("This is a preview — workspace deletion is disabled.")}
            >
              Delete workspace
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ConnectionRow({
  icon,
  iconBg,
  title,
  subtitle,
  connected,
  onConnect,
  onDisconnect,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5">
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
        <div>
          <div className="text-[14px] font-semibold text-slate-900">{title}</div>
          <div className="text-[13px] text-slate-500">{subtitle}</div>
        </div>
      </div>
      {connected ? (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Connected
          </span>
          <Button variant="outline" size="sm" className="rounded-full" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" /> Not connected
          </span>
          <Button size="sm" className="rounded-full" onClick={onConnect}>
            Connect
          </Button>
        </div>
      )}
    </div>
  );
}

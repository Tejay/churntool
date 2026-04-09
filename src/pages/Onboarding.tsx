import { useState, type ReactNode } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CreditCard, Mail, FileText, Send, Zap, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const STEPS = [
  { key: "stripe", label: "Connect Stripe", path: "/onboarding/stripe", icon: CreditCard },
  { key: "gmail", label: "Connect Gmail", path: "/onboarding/gmail", icon: Mail },
  { key: "changelog", label: "Paste changelog", path: "/onboarding/changelog", icon: FileText },
  { key: "review", label: "Review first email", path: "/onboarding/review", icon: Send },
] as const;

export function OnboardingLayout() {
  const location = useLocation();
  const activeIdx = Math.max(
    0,
    STEPS.findIndex((s) => location.pathname.startsWith(s.path)),
  );

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
          <Zap className="h-4 w-4 text-blue-500" /> Winback
        </Link>

        <div className="mt-8 rounded-[2rem] border bg-white p-4 shadow-sm">
          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((step, i) => {
              const done = i < activeIdx;
              const active = i === activeIdx;
              const Icon = step.icon;
              return (
                <li
                  key={step.key}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left ${
                    active ? "bg-blue-100" : done ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      active
                        ? "bg-blue-600 text-white"
                        : done
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Step {i + 1}
                    </div>
                    <div className={`truncate text-sm font-semibold ${active ? "text-slate-900" : "text-slate-600"}`}>
                      {step.label}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border bg-white p-8 shadow-sm"
    >
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}

export function StripeStep() {
  const { onboarding, updateOnboarding } = useAuth();
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      updateOnboarding({ stripeConnected: true });
      setConnecting(false);
    }, 1100);
  };

  return (
    <StepShell
      eyebrow="Step 1 of 4"
      title="Connect your Stripe account"
      description="One OAuth click gives Winback access to cancellation events. We never touch your customers' payment details."
    >
      <div className="rounded-2xl border bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#635bff]">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Stripe</div>
              <div className="text-sm text-slate-500">Subscription data & cancellation webhooks</div>
            </div>
          </div>
          {onboarding.stripeConnected ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <CheckCircle2 className="h-4 w-4" /> Connected
            </span>
          ) : (
            <Button onClick={handleConnect} disabled={connecting} className="rounded-xl">
              {connecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting…
                </>
              ) : (
                "Connect Stripe"
              )}
            </Button>
          )}
        </div>
        <ul className="mt-6 space-y-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Read-only access to subscriptions and customers
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Real-time webhook for <code>customer.subscription.deleted</code>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Disconnect any time from Settings
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          className="rounded-xl"
          disabled={!onboarding.stripeConnected}
          onClick={() => navigate("/onboarding/gmail")}
        >
          Next: Connect Gmail <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </StepShell>
  );
}

export function GmailStep() {
  const { onboarding, updateOnboarding } = useAuth();
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      updateOnboarding({ gmailConnected: true });
      setConnecting(false);
    }, 1100);
  };

  return (
    <StepShell
      eyebrow="Step 2 of 4"
      title="Connect Gmail to send winback emails"
      description="Emails go from your real address, not a generic no-reply. That's what gets replies."
    >
      <div className="rounded-2xl border bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border">
              <Mail className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Gmail</div>
              <div className="text-sm text-slate-500">Send from your own address via OAuth</div>
            </div>
          </div>
          {onboarding.gmailConnected ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <CheckCircle2 className="h-4 w-4" /> Connected
            </span>
          ) : (
            <Button onClick={handleConnect} disabled={connecting} className="rounded-xl">
              {connecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting…
                </>
              ) : (
                "Connect Gmail"
              )}
            </Button>
          )}
        </div>
        <ul className="mt-6 space-y-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Send only — we never read your inbox
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Replies land directly in your real inbox
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Revoke access in Google anytime
          </li>
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" className="rounded-xl" onClick={() => navigate("/onboarding/stripe")}>
          Back
        </Button>
        <Button
          size="lg"
          className="rounded-xl"
          disabled={!onboarding.gmailConnected}
          onClick={() => navigate("/onboarding/changelog")}
        >
          Next: Paste changelog <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </StepShell>
  );
}

const CHANGELOG_PLACEHOLDER = `e.g.

- Fixed the calendar sync bug that was duplicating events
- Rebuilt the mobile app from scratch — 3x faster
- Added CSV export for all reports
- New billing dashboard with usage breakdown
- Removed the 30-second load time on the projects page`;

export function ChangelogStep() {
  const { onboarding, updateOnboarding } = useAuth();
  const navigate = useNavigate();

  return (
    <StepShell
      eyebrow="Step 3 of 4"
      title="What have you shipped recently?"
      description="Paste a list of improvements. Winback uses this to write honest, specific winback messages — not generic discounts."
    >
      <textarea
        value={onboarding.changelog}
        onChange={(e) => updateOnboarding({ changelog: e.target.value })}
        placeholder={CHANGELOG_PLACEHOLDER}
        rows={12}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
      />
      <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        Bullet points work best. You can edit this any time in Settings.
      </p>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" className="rounded-xl" onClick={() => navigate("/onboarding/gmail")}>
          Back
        </Button>
        <Button
          size="lg"
          className="rounded-xl"
          disabled={onboarding.changelog.trim().length < 10}
          onClick={() => navigate("/onboarding/review")}
        >
          Next: Review first email <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </StepShell>
  );
}

export function ReviewStep() {
  const { user, onboarding, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const founder = onboarding.founderName || user?.name || "The team";
  const product = onboarding.productName || "our app";

  const generatedEmail = `Hi Sarah,

You cancelled ${product} last week and mentioned small issues kept getting in the way. That feedback stuck with us.

Here's what's changed since you left:

${onboarding.changelog.trim() || "- (your recent improvements will appear here)"}

It's a much more reliable experience now. If you're open to it, I'd love for you to take another look — no pressure, no trial reset.

— ${founder}`;

  const handleFinish = () => {
    completeOnboarding();
    navigate("/dashboard", { replace: true });
  };

  return (
    <StepShell
      eyebrow="Step 4 of 4"
      title="Review the first winback email"
      description="This is what a real churned customer will receive, personalised to their cancellation reason."
    >
      <div className="rounded-2xl border bg-slate-50 p-6">
        <div className="mb-4 border-b border-slate-200 pb-4 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>From</span>
            <span className="font-medium text-slate-800">{user?.email ?? "you@company.com"}</span>
          </div>
          <div className="mt-1 flex justify-between text-slate-500">
            <span>To</span>
            <span className="font-medium text-slate-800">sarah.k@gmail.com</span>
          </div>
          <div className="mt-1 flex justify-between text-slate-500">
            <span>Subject</span>
            <span className="font-medium text-slate-800">A quick update since you left</span>
          </div>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-800">{generatedEmail}</pre>
      </div>

      <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
        <div className="font-semibold">Why this message?</div>
        <p className="mt-1 text-blue-700">
          Sarah left over quality issues — so we lead with accountability and show what changed. No discount, no
          pressure.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" className="rounded-xl" onClick={() => navigate("/onboarding/changelog")}>
          Back
        </Button>
        <Button size="lg" className="rounded-xl" onClick={handleFinish}>
          Approve & enter dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        Your first recovery is free. After that: £49/mo + 10% of recovered MRR for the first year each subscriber stays
        back.
      </p>
    </StepShell>
  );
}

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, Play, ShieldCheck, Sparkles, BarChart3, Bell, Brain, Target, Zap, Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = ["home", "detect", "decide", "act", "learn"];

function NavButton({ current, setCurrent, item }: { current: string; setCurrent: (v: string) => void; item: string }) {
  const active = current === item;
  return (
    <button
      onClick={() => setCurrent(item)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
      }`}
    >
      {item === "home" ? "Overview" : item.charAt(0).toUpperCase() + item.slice(1)}
    </button>
  );
}

// Change 3: Stat cards with accent bar + gradient
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-blue-400" />
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
}

// Change 6: Badge with blue tint
function EyebrowBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
      {children}
    </span>
  );
}

function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-blue-100 px-5 py-4 text-blue-700">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <span className="font-medium">You're on the list — we'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-2xl sm:w-72"
          required
        />
        <Button type="submit" size="lg" className="rounded-2xl whitespace-nowrap">
          Request early access <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-400">No credit card. Setup in a day.</p>
    </form>
  );
}

function SectionHero({ eyebrow, title, copy, cta, secondary, icon, showCTA }: any) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <EyebrowBadge>{eyebrow}</EyebrowBadge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500">{copy}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="rounded-2xl" onClick={cta?.onClick}>{cta?.label}</Button>
          {secondary ? (
            <Button size="lg" variant="outline" className="rounded-2xl" onClick={secondary?.onClick}>
              {secondary?.label}
            </Button>
          ) : null}
        </div>
        {showCTA && <EarlyAccessForm />}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[2rem] border bg-white p-8 shadow-2xl"
      >
        {icon}
      </motion.div>
    </section>
  );
}

// Change 4: Process nav with blue tint numbers
function ProcessNav({ setCurrent }: { setCurrent: (v: string) => void }) {
  const items = [
    { key: "detect", title: "Detect", desc: "Connect Stripe — cancellations flow in automatically" },
    { key: "decide", title: "Decide", desc: "Choose best action and channel" },
    { key: "act", title: "Act", desc: "Launch personalized recovery" },
    { key: "learn", title: "Learn", desc: "Improve outcomes over time" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <motion.button
          key={item.key}
          whileHover={{ y: -4 }}
          onClick={() => setCurrent(item.key)}
          className="rounded-[1.75rem] border bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              0{i + 1}
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </div>
          {/* Change 2: card title bolder */}
          <div className="mt-4 text-2xl font-bold text-slate-900">{item.title}</div>
          <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
        </motion.button>
      ))}
    </div>
  );
}

function HomePage({ setCurrent }: { setCurrent: (v: string) => void }) {
  return (
    <div className="space-y-12">
      <SectionHero
        eyebrow="AI churn recovery"
        title="Connect Stripe. Win back churned customers automatically."
        copy="Every cancellation triggers a personalised winback campaign — the right message, the right channel, at the right time. No manual work. No integrations beyond Stripe."
        cta={{ label: "See a live recovery", onClick: () => setCurrent("act") }}
        secondary={{ label: "How it works", onClick: () => setCurrent("detect") }}
        showCTA
        icon={
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border bg-blue-100 p-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Stripe event received</div>
                <div className="mt-1 text-xl font-bold text-slate-900">customer.subscription.deleted</div>
                <div className="text-sm text-slate-500 mt-1">Sarah K. · Pro · $24.99/mo</div>
              </div>
              <Zap className="h-9 w-9 text-blue-500" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Detect</div>
                  <div className="mt-2 font-bold text-slate-900">Cancellation logged</div>
                  <div className="text-sm text-slate-500">Reason: small issues added up</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Decide</div>
                  <div className="mt-2 font-bold text-slate-900">Winback message</div>
                  <div className="text-sm text-slate-500">Channel: Email</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Act</div>
                  <div className="mt-2 font-bold text-slate-900">Email sent to Sarah</div>
                  <div className="text-sm text-slate-500">Personalised to her reason</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Learn</div>
                  <div className="mt-2 font-bold text-slate-900">Resubscribed</div>
                  <div className="text-sm text-slate-500">$24.99/mo recovered</div>
                </CardContent>
              </Card>
            </div>
          </div>
        }
      />

      <section className="rounded-[2rem] border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-slate-900">Open each part of the system</h2>
        </div>
        <ProcessNav setCurrent={setCurrent} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Users recovered" value="10–20%" />
        <Stat label="Time to outcome" value="30 days" />
        <Stat label="Actions automated" value="100%" />
      </section>
    </div>
  );
}

function DetectPage({ setCurrent }: { setCurrent: (v: string) => void }) {
  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="01 · Detect"
        title="Connect Stripe once — every cancellation flows in automatically"
        copy="No spreadsheets. No manual exports. The moment a subscription is cancelled in Stripe, we receive the event and start the recovery process."
        cta={{ label: "Next: Decide", onClick: () => setCurrent("decide") }}
        secondary={{ label: "Back to overview", onClick: () => setCurrent("home") }}
        icon={
          <div className="space-y-3">
            <div className="rounded-2xl bg-blue-100 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Stripe webhook received</div>
              <div className="mt-1 text-lg font-bold text-slate-900">customer.subscription.deleted</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Customer</div>
                <div className="mt-1 font-bold text-slate-900">Sarah K.</div>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">MRR lost</div>
                <div className="mt-1 font-bold text-slate-900">$24.99/mo</div>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Plan</div>
                <div className="mt-1 font-bold text-slate-900">Pro</div>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Reason</div>
                <div className="mt-1 font-bold text-slate-900">Small issues added up</div>
              </div>
            </div>
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 text-green-700">
                <Zap className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium">Recovery process started automatically</span>
              </div>
            </div>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><Link className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">One-click Stripe connect</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">OAuth connection takes two clicks. No API keys to copy, no webhook URLs to configure manually.</p>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><Zap className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">Real-time cancellation feed</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">Every <code className="rounded bg-blue-50 px-1 text-blue-700 text-xs">subscription.deleted</code> event is captured instantly — plan, MRR, tenure, and cancellation reason included.</p>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><ShieldCheck className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">No other integration needed</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">Stripe has the data you need — who cancelled, what they paid, and why. That's enough to run personalised winback campaigns.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DecidePage({ setCurrent }: { setCurrent: (v: string) => void }) {
  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="02 · Decide"
        title="Choose the right action, channel, and timing"
        copy="Instead of sending the same offer to everyone, the system selects the best recovery move for each user type."
        cta={{ label: "Next: Act", onClick: () => setCurrent("act") }}
        secondary={{ label: "Back: Detect", onClick: () => setCurrent("detect") }}
        icon={
          <div className="space-y-4">
            <div className="rounded-2xl border p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">AI chooses</div>
              <div className="mt-3 grid gap-3">
                <div className="rounded-xl bg-blue-100 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Action</div>
                  <div className="mt-1 font-bold text-slate-900">Feature education</div>
                </div>
                <div className="rounded-xl bg-blue-100 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Channel</div>
                  <div className="mt-1 font-bold text-slate-900">Push notification</div>
                </div>
                <div className="rounded-xl bg-blue-100 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Best time</div>
                  <div className="mt-1 font-bold text-slate-900">7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Decision logic</CardTitle>
            <CardDescription>What the system weighs before it acts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <div>• User segment and lifecycle stage</div>
            <div>• Previous successful interventions</div>
            <div>• Channel responsiveness</div>
            <div>• Margin and discount guardrails</div>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Manual control optional</CardTitle>
            <CardDescription>Automation with guardrails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <div>• Approve actions before send</div>
            <div>• Set discount limits and frequency caps</div>
            <div>• Restrict channels by segment</div>
            <div>• Review why each choice was made</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const WINBACK_MESSAGE = `You weren't wrong.

Some parts didn't work as smoothly as they should have — and we heard that clearly.

Since then, we've:
· Fixed the sync issues
· Improved speed across the app
· Removed the glitches that caused interruptions

It's now a much more reliable experience.

If you're open to it, give it another try — we think you'll feel the difference.

→ See what's improved`;

type SendState = "idle" | "sending" | "sent" | "outcome";

function ActPage({ setCurrent }: { setCurrent: (v: string) => void }) {
  const [message, setMessage] = useState(WINBACK_MESSAGE);
  const [sendState, setSendState] = useState<SendState>("idle");

  const handleSend = () => {
    setSendState("sending");
    setTimeout(() => setSendState("sent"), 900);
    setTimeout(() => setSendState("outcome"), 2200);
  };

  const handleReset = () => {
    setSendState("idle");
    setMessage(WINBACK_MESSAGE);
  };

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="03 · Act"
        title="Trigger personalized recovery actions automatically"
        copy="Once a decision is made, the system finds the churned user, crafts the right message, and sends it — without anyone lifting a finger."
        cta={{ label: "Next: Learn", onClick: () => setCurrent("learn") }}
        secondary={{ label: "Back: Decide", onClick: () => setCurrent("decide") }}
        icon={
          <div className="space-y-3">
            <div className="rounded-2xl bg-blue-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Churned user</div>
              <div className="mt-1 text-lg font-bold text-slate-900">Sarah K.</div>
              <div className="text-sm text-slate-500">Cancelled 8 days ago · Was paying $24.99/mo</div>
              <div className="mt-2 text-xs text-slate-500">Reason logged: <span className="font-medium text-slate-700">"small issues added up"</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Action</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Winback</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Channel</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Email</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Timing</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Now</div>
              </div>
            </div>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: interactive demo */}
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Winback message — Sarah K.</CardTitle>
            <CardDescription>Edit the message, then run the recovery to see the outcome.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sendState !== "idle"}
              rows={10}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-60 resize-none"
            />

            {sendState === "idle" && (
              <Button className="rounded-2xl" onClick={handleSend}>
                <Play className="mr-2 h-4 w-4" />Send recovery email
              </Button>
            )}

            {sendState === "sending" && (
              <Button className="rounded-2xl" disabled>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="mr-2 h-2 w-2 rounded-full bg-white inline-block"
                />
                Sending…
              </Button>
            )}

            {(sendState === "sent" || sendState === "outcome") && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-green-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="font-medium">Email sent to Sarah K.</span>
                </div>

                {sendState === "outcome" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border bg-blue-50 p-5 space-y-3"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Outcome</div>
                    <div className="space-y-2">
                      {[
                        "Sarah opened the email",
                        'Clicked "See what\'s improved"',
                        "Resubscribed to Pro",
                      ].map((step) => (
                        <div key={step} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-white border px-4 py-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Revenue recovered</div>
                      <div className="mt-1 text-2xl font-bold text-slate-900">$24.99<span className="text-sm font-medium text-slate-400">/mo</span></div>
                    </div>
                  </motion.div>
                )}

                <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-700 underline">
                  Reset demo
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: why this matters */}
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Why this works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-500">
            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="font-bold text-slate-900 mb-1">Accountability, not discounts</div>
              <div>The message leads with honesty — "You weren't wrong." That's more powerful than a coupon for users who left over quality issues.</div>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="font-bold text-slate-900 mb-1">Reason-matched messaging</div>
              <div>The system knows Sarah left because "small issues added up" — so the message addresses exactly that, not a generic offer.</div>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="font-bold text-slate-900 mb-1">Zero manual work</div>
              <div>This runs automatically for every churned user that matches the pattern. No one had to write Sarah's email by hand.</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LearnPage({ setCurrent }: { setCurrent: (v: string) => void }) {
  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="04 · Learn"
        title="Measure outcomes and improve every next action"
        copy="The system does not stop after sending a message. It learns from renewals, returns, and failed interventions so recovery gets smarter over time."
        cta={{ label: "Back to overview", onClick: () => setCurrent("home") }}
        secondary={{ label: "Back: Act", onClick: () => setCurrent("act") }}
        icon={
          <div className="space-y-3">
            <div className="rounded-2xl border bg-blue-100 p-4">
              <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-blue-600" /><span className="font-bold text-slate-900">User returns</span></div>
            </div>
            <div className="rounded-2xl border bg-blue-100 p-4">
              <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-blue-600" /><span className="font-bold text-slate-900">Subscription renewed</span></div>
            </div>
            <div className="rounded-2xl border bg-blue-100 p-4">
              <div className="flex items-center gap-3"><Brain className="h-5 w-5 text-blue-600" /><span className="font-bold text-slate-900">System learns best action for this user type</span></div>
            </div>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Primary KPI" value="% recovered" />
        <Stat label="Commercial KPI" value="Revenue saved" />
        <Stat label="Optimization KPI" value="Best actions" />
      </div>

      <Card className="rounded-[1.75rem]">
        <CardHeader>
          <CardTitle className="font-bold">Outcome over activity</CardTitle>
          <CardDescription>Do not optimize for messages sent. Optimize for churn recovered.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vanity metric</div>
            <div className="mt-2 text-xl font-bold text-slate-900">Emails sent</div>
          </div>
          <div className="rounded-2xl border bg-blue-100 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Real metric</div>
            <div className="mt-2 text-xl font-bold text-slate-900">Recovered subscriptions</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState("home");

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* Change 5: header subtitle replaced with value prop */}
        <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-bold text-slate-900">Churn Recovery AI</div>
            <div className="text-sm text-slate-500">Recover at-risk users automatically — no manual work required</div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <NavButton key={item} current={current} setCurrent={setCurrent} item={item} />
            ))}
          </nav>
        </header>

        <main>
          {current !== "home" && (
            <button
              onClick={() => setCurrent("home")}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" /> Back to overview
            </button>
          )}

          {current === "home" && <HomePage setCurrent={setCurrent} />}
          {current === "detect" && <DetectPage setCurrent={setCurrent} />}
          {current === "decide" && <DecidePage setCurrent={setCurrent} />}
          {current === "act" && <ActPage setCurrent={setCurrent} />}
          {current === "learn" && <LearnPage setCurrent={setCurrent} />}
        </main>
      </div>
    </div>
  );
}

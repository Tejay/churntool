import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, Play, ShieldCheck, Sparkles, BarChart3, Bell, Brain, Target } from "lucide-react";
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

function SectionHero({ eyebrow, title, copy, cta, secondary, icon }: any) {
  return (
    // Change 1: hero widget gets more breathing room (p-8, shadow-2xl)
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <EyebrowBadge>{eyebrow}</EyebrowBadge>
        {/* Change 2: title stays bold, copy is lighter */}
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
    { key: "detect", title: "Detect", desc: "Spot at-risk users early" },
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
        title="Recover churn automatically — not with another dashboard"
        copy="Detects risk, chooses the right intervention, triggers recovery actions, and learns what wins users back. Built for B2C apps that want outcomes, not more manual work."
        cta={{ label: "Run a sample recovery", onClick: () => setCurrent("detect") }}
        secondary={{ label: "See how it works", onClick: () => setCurrent("detect") }}
        icon={
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border bg-blue-100 p-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">User health</div>
                <div className="mt-1 text-xl font-bold text-slate-900">High churn risk</div>
              </div>
              <Target className="h-9 w-9 text-blue-500" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Detect</div>
                  <div className="mt-2 font-bold text-slate-900">Inactive for 7 days</div>
                  <div className="text-sm text-slate-500">Low feature usage</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Decide</div>
                  <div className="mt-2 font-bold text-slate-900">Feature education</div>
                  <div className="text-sm text-slate-500">Channel: Push</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Act</div>
                  <div className="mt-2 font-bold text-slate-900">Message sent</div>
                  <div className="text-sm text-slate-500">Triggered at 7pm</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Learn</div>
                  <div className="mt-2 font-bold text-slate-900">Subscription renewed</div>
                  <div className="text-sm text-slate-500">Model improves</div>
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
        title="Know who is drifting before they churn"
        copy="The system continuously watches inactivity, declining usage, and behavior changes to identify recovery opportunities early."
        cta={{ label: "Next: Decide", onClick: () => setCurrent("decide") }}
        secondary={{ label: "Back to overview", onClick: () => setCurrent("home") }}
        icon={
          <Card className="rounded-[1.75rem] border-0 shadow-none">
            <CardHeader>
              <CardTitle className="font-bold">Live detection example</CardTitle>
              <CardDescription>User became inactive for 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-blue-100 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Churn risk</div>
                <div className="mt-1 text-3xl font-bold text-slate-900">HIGH</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">State</div>
                  <div className="mt-1 font-bold text-slate-900">Declining</div>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Reason</div>
                  <div className="mt-1 font-bold text-slate-900">Low usage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><Bell className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">Behavior signals</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">Inactivity windows, drop in sessions, lower feature depth, and renewal warning signs.</p>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><BarChart3 className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">Risk scoring</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">Each user is prioritized by probability of churn and expected recovery value.</p>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2"><ShieldCheck className="h-4 w-4 text-blue-600" /></div>
              <span className="font-bold text-slate-900">Transparent triggers</span>
            </div>
            <p className="text-sm leading-6 text-slate-500">Show exactly why a user was flagged so teams can trust the automation.</p>
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

function ActPage({ setCurrent }: { setCurrent: (v: string) => void }) {
  const [message, setMessage] = useState("You last used Workout Plans 10 days ago — here's what's new.");
  const preview = useMemo(() => message.trim() || "Your recovery message will appear here.", [message]);

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="03 · Act"
        title="Trigger personalized recovery actions automatically"
        copy="Once a decision is made, the system launches the right message through the right channel so recovery actually happens."
        cta={{ label: "Next: Learn", onClick: () => setCurrent("learn") }}
        secondary={{ label: "Back: Decide", onClick: () => setCurrent("decide") }}
        icon={
          <div className="space-y-4">
            <div className="rounded-2xl border p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Message preview</div>
              <div className="mt-3 rounded-2xl bg-blue-100 p-4 text-base leading-7 text-slate-800">{preview}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Channel</div>
              <div className="mt-1 font-bold text-slate-900">Push notification</div>
            </div>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Interactive sample action</CardTitle>
            <CardDescription>Edit the message to simulate a recovery intervention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} className="h-12 rounded-xl" />
            <Button className="rounded-2xl"><Play className="mr-2 h-4 w-4" />Run sample recovery</Button>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Why this matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <div>Teams often stop at identifying churn.</div>
            <div>Your product closes the loop by turning decisions into action.</div>
            <div>That is where recovery revenue is won or lost.</div>
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

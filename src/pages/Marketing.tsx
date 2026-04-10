import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, CreditCard, Brain, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function EyebrowBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
      {children}
    </span>
  );
}

function Header({ navigate }: { navigate: NavigateFunction }) {
  const handleScrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="mb-24 flex items-center justify-between rounded-[2rem] border border-slate-200/60 bg-white/70 px-7 py-5 shadow-sm backdrop-blur-xl">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
        <img src="/winback-logo.svg" alt="Winback" className="h-9" />
      </button>
      <nav className="flex items-center gap-1">
        <button
          onClick={handleScrollToHowItWorks}
          className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
        >
          How it works
        </button>
        <Link
          to="/login"
          className="rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          Log in
        </Link>
        <Button onClick={() => navigate("/register")} className="rounded-full" size="sm">
          Sign up
        </Button>
      </nav>
    </header>
  );
}

function Hero({ navigate }: { navigate: NavigateFunction }) {
  const handleScrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="pb-32 pt-6 lg:pb-48 lg:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <EyebrowBadge>New · AI churn recovery</EyebrowBadge>
        <h1 className="mt-6 text-[3.25rem] font-semibold leading-[1.02] tracking-tightest text-slate-900 sm:text-7xl md:text-[5.5rem]">
          Win back churn.
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Automatically.
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-xl leading-8 text-slate-500 sm:text-[1.375rem] sm:leading-9">
          The moment a customer cancels, Winback sends a personalised email — grounded in what you've delivered
          recently, their subscription history, and any reason they shared for leaving.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button size="lg" className="rounded-full px-7 text-base" onClick={() => navigate("/register")}>
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <button
            onClick={handleScrollToHowItWorks}
            className="text-base font-medium text-blue-600 hover:text-blue-700"
          >
            How it works <span aria-hidden>›</span>
          </button>
        </div>
        <p className="mt-6 text-[13px] text-slate-400">
          Free first recovery. Then £49/mo + 10% of what we win back.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-20 max-w-3xl"
      >
        <div className="absolute inset-x-10 -bottom-6 h-24 rounded-[3rem] bg-blue-500/20 blur-3xl" aria-hidden />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-7 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60 p-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Stripe event</div>
              <div className="mt-1.5 font-mono text-base font-semibold text-slate-900">
                customer.subscription.deleted
              </div>
              <div className="mt-1 text-sm text-slate-500">Sarah K. · Pro · $24.99/mo</div>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-green-200/70 bg-green-50 p-4 text-green-700">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div className="text-sm font-medium">Winback email sent · Resubscribed in 2 days</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type StepProps = {
  number: string;
  title: string;
  tagline: ReactNode;
  copy: string;
  visual: ReactNode;
  reversed?: boolean;
};

function Step({ number, title, tagline, copy, visual, reversed = false }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          {number} · {title}
        </div>
        <h3 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tightest text-slate-900 md:text-5xl">
          {tagline}
        </h3>
        <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">{copy}</p>
      </div>
      <div className={reversed ? "lg:order-1" : ""}>{visual}</div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function DetectVisual() {
  return (
    <div className="rounded-[2rem] border bg-white p-8 shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">Stripe event</div>
          <div className="mt-2 font-mono text-base font-bold text-slate-900 sm:text-lg">
            customer.subscription.deleted
          </div>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#635bff]">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="mt-6 space-y-3 border-t pt-5">
        <DetailRow label="Customer" value="Sarah Kowalski" />
        <DetailRow label="Plan" value="Pro · $24.99/mo" />
        <DetailRow label="Tenure" value="14 months" />
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Received 0.4 seconds ago
      </div>
    </div>
  );
}

function DecideVisual() {
  return (
    <div className="rounded-[2rem] border bg-white p-8 shadow-2xl">
      <div className="rounded-2xl bg-slate-50 p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">Cancellation reason</div>
        <div className="mt-2 text-base font-semibold text-slate-900">"Small issues added up"</div>
      </div>
      <div className="my-5 flex justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
          <Brain className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div className="rounded-2xl bg-blue-50 p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">Winback chooses</div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Tone</span>
            <span className="font-semibold text-slate-900">Accountability</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Content</span>
            <span className="font-semibold text-slate-900">Changelog proof</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Channel</span>
            <span className="font-semibold text-slate-900">Email · from you</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] border bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b bg-slate-50 px-5 py-3">
        <Mail className="h-4 w-4 text-slate-400" />
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">Sent from Gmail</div>
      </div>
      <div className="space-y-1.5 border-b bg-slate-50/60 px-6 py-4 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">From</span>
          <span className="font-medium text-slate-700">you@company.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">To</span>
          <span className="font-medium text-slate-700">sarah.k@gmail.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Subject</span>
          <span className="font-medium text-slate-700">A quick update since you left</span>
        </div>
      </div>
      <div className="space-y-3 p-6 text-sm leading-7 text-slate-700">
        <div>Hi Sarah,</div>
        <div>
          You weren't wrong — some things weren't smooth enough. Since then we've fixed the sync issues, improved speed,
          and removed the interruptions.
        </div>
        <div>If you're open to it, give it another look.</div>
        <div className="text-slate-500">— Alex</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-10 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <EyebrowBadge>How it works</EyebrowBadge>
          <h2 className="mt-6 text-5xl font-semibold leading-[1.03] tracking-tightest text-slate-900 md:text-6xl">
            Three steps.
            <br />
            Zero manual work.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            From cancellation to recovery in under a minute — without you touching a thing.
          </p>
        </motion.div>

        <div className="mt-28 space-y-32 md:space-y-40">
          <Step
            number="01"
            title="Detect"
            tagline={
              <>
                Every cancellation.
                <br />
                Instantly.
              </>
            }
            copy="One OAuth click connects Stripe. From then on, every subscription.deleted event flows in the moment it happens — with the customer, the MRR, the plan, and the reason they gave."
            visual={<DetectVisual />}
          />
          <Step
            number="02"
            title="Decide"
            tagline={
              <>
                The right message.
                <br />
                For the right reason.
              </>
            }
            copy="Winback reads each cancellation reason and picks the response that matches — accountability when it's a quality issue, education when they missed a feature, a genuine update when things have changed."
            visual={<DecideVisual />}
            reversed
          />
          <Step
            number="03"
            title="Act"
            tagline={
              <>
                Sent automatically.
                <br />
                From your real inbox.
              </>
            }
            copy="Emails go from your own Gmail, signed with your name. No generic no-reply. Replies come straight back to you — which is what turns a winback into a conversation."
            visual={<ActVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ navigate }: { navigate: NavigateFunction }) {
  return (
    <section className="bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-6 py-32 text-center lg:py-40"
      >
        <h2 className="text-5xl font-semibold leading-[1.03] tracking-tightest text-slate-900 md:text-6xl">
          Ready to recover?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-slate-500">
          Connect Stripe in two clicks. Your first recovery is on us.
        </p>
        <div className="mt-10">
          <Button size="lg" className="rounded-2xl" onClick={() => navigate("/register")}>
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-slate-400">
          Free until your first recovery. Then £49/mo + 10% of recovered revenue — first year each subscriber stays
          back. No card required.
        </p>
      </motion.div>
    </section>
  );
}

export default function Marketing() {
  const navigate = useNavigate();
  return (
    <div className="scroll-smooth bg-blue-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <Header navigate={navigate} />
        <Hero navigate={navigate} />
      </div>
      <HowItWorks />
      <FinalCTA navigate={navigate} />
    </div>
  );
}

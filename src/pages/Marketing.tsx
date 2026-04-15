import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, CreditCard, Brain, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const logoFont = { fontFamily: "'DM Sans', sans-serif", fontWeight: 200, letterSpacing: "-0.02em" } as const;

function EyebrowBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm ring-1 ring-slate-200/70">
      {children}
    </span>
  );
}

function Header({ navigate }: { navigate: NavigateFunction }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <header className="mb-24 flex items-center justify-between rounded-full border border-slate-200/70 bg-white px-6 py-3 shadow-sm">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
        <img src="/winback-logo.svg" alt="Winback" className="h-8" />
      </button>
      <nav className="flex items-center gap-1">
        <button
          onClick={() => scrollTo("how-it-works")}
          className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
        >
          How it works
        </button>
        <button
          onClick={() => scrollTo("pricing")}
          className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
        >
          Pricing
        </button>
        <button
          onClick={() => scrollTo("faq")}
          className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
        >
          FAQ
        </button>
        <Link
          to="/login"
          className="rounded-full px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          Log in
        </Link>
        <Button
          onClick={() => navigate("/register")}
          size="sm"
          className="rounded-full bg-slate-900 px-4 text-white hover:bg-slate-800"
        >
          Get started
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
    <section className="pb-28 pt-4 lg:pb-40 lg:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <EyebrowBadge>New · AI win-back</EyebrowBadge>
        <h1
          className="mt-6 text-[3.25rem] leading-[1.02] sm:text-7xl md:text-[5.5rem]"
          style={logoFont}
        >
          <span className="text-slate-700">Win</span>
          <span className="text-green-600">back</span>{" "}
          <span className="text-slate-900">lost customers.</span>
          <br />
          <span className="text-slate-400">Automatically.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl sm:leading-9">
          The moment a customer cancels, Winback sends a personalised email — grounded in what you've delivered
          recently, their subscription history, and any reason they shared for leaving.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button
            size="lg"
            className="rounded-full bg-slate-900 px-7 text-base text-white hover:bg-slate-800"
            onClick={() => navigate("/register")}
          >
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
          15% of recovered revenue, for 12 months. No card at signup.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-20 max-w-3xl"
      >
        <div className="absolute inset-x-10 -bottom-6 h-24 rounded-[3rem] bg-blue-500/20 blur-3xl" aria-hidden />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 p-7 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60 p-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">Stripe event</div>
              <div className="mt-1.5 font-mono text-base font-semibold text-slate-900">
                customer.subscription.deleted
              </div>
              <div className="mt-1 text-sm text-slate-500">Sarah K. · Pro · £24.99/mo</div>
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

type StepCardProps = {
  number: string;
  title: string;
  tagline: ReactNode;
  copy: string;
  visual: ReactNode;
};

function StepCard({ number, title, tagline, copy, visual }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-sm"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
        {number} · {title}
      </div>
      <h3
        className="mt-4 text-3xl leading-[1.05] text-slate-900"
        style={logoFont}
      >
        {tagline}
      </h3>
      <p className="mt-4 text-base leading-7 text-slate-500">{copy}</p>
      <div className="mt-8">{visual}</div>
    </motion.div>
  );
}

function DetectVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">Stripe event</div>
          <div className="mt-2 font-mono text-sm font-bold text-slate-900">customer.subscription.deleted</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#635bff]">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-4 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Customer</span>
          <span className="font-semibold text-slate-900">Sarah K.</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Plan</span>
          <span className="font-semibold text-slate-900">Pro · £24.99/mo</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Tenure</span>
          <span className="font-semibold text-slate-900">8 months</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        Received 0.4s ago
      </div>
    </div>
  );
}

function DecideVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200/80">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Cancellation reason</div>
        <div className="mt-1.5 text-sm font-semibold text-slate-900">
          "Missing the calendar integration I need"
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <Brain className="h-3.5 w-3.5 text-blue-600" />
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200/80">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">Winback chooses</div>
        <div className="mt-3 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Tone</span>
            <span className="font-semibold text-slate-900">Empathetic + informative</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Content</span>
            <span className="font-semibold text-slate-900">Feature roadmap</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Channel</span>
            <span className="font-semibold text-slate-900">Personal email</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-slate-50 px-4 py-2.5">
        <Mail className="h-3.5 w-3.5 text-slate-400" />
        <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Sent from Gmail</div>
      </div>
      <div className="space-y-1 border-b border-slate-200/80 bg-slate-50/60 px-4 py-3 text-[11px]">
        <div className="flex justify-between">
          <span className="text-slate-400">From</span>
          <span className="font-medium text-slate-700">alex@yourcompany.com</span>
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
      <div className="space-y-2 p-4 text-[13px] leading-6 text-slate-700">
        <div>Hi Sarah,</div>
        <div className="text-slate-500">
          You mentioned the calendar integration — we shipped it last week. If you're open to it, give it another look.
        </div>
        <div className="text-slate-500">— Alex</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-28 lg:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <EyebrowBadge>How it works</EyebrowBadge>
          <h2
            className="mt-6 text-5xl leading-[1.03] text-slate-900 md:text-6xl"
            style={logoFont}
          >
            Three steps.
            <br />
            Zero manual work.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            From cancellation to recovery in under a minute — without you touching a thing.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <StepCard
            number="01"
            title="Detect"
            tagline={<>Every cancellation. Instantly.</>}
            copy="One OAuth click connects Stripe. Every subscription.deleted event flows in the moment it happens — with the customer, MRR, plan, and reason."
            visual={<DetectVisual />}
          />
          <StepCard
            number="02"
            title="Decide"
            tagline={<>The right message. For the right reason.</>}
            copy="Winback reads each cancellation reason and picks the response that matches — tone, content, and channel chosen for this specific person."
            visual={<DecideVisual />}
          />
          <StepCard
            number="03"
            title="Act"
            tagline={<>Sent automatically. From your real inbox.</>}
            copy="Emails go from your own Gmail, signed with your name. Replies come straight back to you — which is what turns a winback into a conversation."
            visual={<ActVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCalculator() {
  const [revenue, setRevenue] = useState(500);
  const fee = Math.round(revenue * 0.15);
  const keeps = revenue - fee;
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-sm">
      <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Recovered revenue / month
      </label>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-3xl font-medium text-slate-400" style={logoFont}>£</span>
        <input
          type="number"
          min={0}
          value={revenue}
          onChange={(e) => setRevenue(Math.max(0, Number(e.target.value) || 0))}
          className="w-full border-0 bg-transparent text-4xl text-slate-900 outline-none focus:ring-0"
          style={logoFont}
        />
      </div>
      <div className="mt-6 space-y-3 border-t border-slate-200/70 pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Recovered revenue</span>
          <span className="font-semibold text-slate-900">£{revenue.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Winback fee (15%)</span>
          <span className="font-semibold text-slate-900">£{fee.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-green-50 px-3 py-2">
          <span className="font-medium text-green-700">You keep (85%)</span>
          <span className="font-semibold text-green-700">£{keeps.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function Pricing({ navigate }: { navigate: NavigateFunction }) {
  const features = [
    { title: "One rate, always.", copy: "15% — no tiering, no surprises, regardless of recovered amount." },
    { title: "Attribution stops at 12 months.", copy: "After a year, the subscriber is fully yours. Forever." },
    { title: "No base fee.", copy: "If we recover nothing, you pay nothing. Zero risk to try." },
  ];
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-28 lg:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <EyebrowBadge>Pricing</EyebrowBadge>
          <h2
            className="mt-6 text-5xl leading-[1.03] text-slate-900 md:text-6xl"
            style={logoFont}
          >
            15% of recovered revenue.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            For 12 months per recovered subscriber. Then they're yours, forever.
          </p>
        </motion.div>

        <PricingCalculator />

        <div className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
          <p>Your fee is always less than what we recover.</p>
          <p>If we recover nothing, you pay nothing.</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-slate-900 px-7 text-base text-white hover:bg-slate-800"
            onClick={() => navigate("/register")}
          >
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-slate-400">
            No card at signup. We ask for payment after your first recovery.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900">{f.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{f.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "How does Winback know what to say?",
      a: "We ground each email in the customer's subscription history, recent product updates you've shipped, and the reason they gave for leaving. No generic templates.",
    },
    {
      q: "Do emails come from my domain?",
      a: "Yes. Winback sends from your own Gmail via OAuth, signed with your name. Replies land in your inbox, not ours.",
    },
    {
      q: "When do I start paying?",
      a: "After your first recovery. We take 15% of the recovered revenue for 12 months, then the customer is fully yours. No base fee, no card at signup.",
    },
    {
      q: "What if a customer cancels again?",
      a: "Attribution stops after 12 months. Anything after that is 100% yours — no continued fees.",
    },
  ];
  return (
    <section id="faq" className="border-t border-slate-200/70 bg-slate-50/50">
      <div className="mx-auto max-w-3xl px-6 py-28 lg:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <EyebrowBadge>FAQ</EyebrowBadge>
          <h2
            className="mt-6 text-4xl leading-[1.05] text-slate-900 md:text-5xl"
            style={logoFont}
          >
            Questions, answered.
          </h2>
        </motion.div>
        <div className="mt-12 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200/70 bg-white p-6 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900">
                {item.q}
                <span className="ml-4 text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-500">{item.a}</p>
            </details>
          ))}
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
        className="mx-auto max-w-3xl px-6 py-28 text-center lg:py-36"
      >
        <h2
          className="text-5xl leading-[1.03] text-slate-900 md:text-6xl"
          style={logoFont}
        >
          Ready to recover?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-slate-500">
          Connect Stripe in two clicks. Free to start. Pay only when we recover.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="rounded-full bg-slate-900 px-7 text-base text-white hover:bg-slate-800"
            onClick={() => navigate("/register")}
          >
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="mx-auto mt-6 max-w-md text-xs leading-6 text-slate-400">
          15% of recovered revenue, for 12 months per subscriber. No base fee. No card at signup.
        </p>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = ["Pricing", "FAQ", "Contact", "Refunds", "Acceptable Use", "Privacy", "Terms", "DPA", "Subprocessors"];
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="space-y-1">
          <div>© {new Date().getFullYear()} Winback Ltd</div>
          <div>support@winbackflow.co</div>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <a key={l} href="#" className="hover:text-slate-900">
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function Marketing() {
  const navigate = useNavigate();
  return (
    <div className="scroll-smooth bg-[#eef2fb] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <Header navigate={navigate} />
        <Hero navigate={navigate} />
      </div>
      <HowItWorks />
      <Pricing navigate={navigate} />
      <FAQ />
      <FinalCTA navigate={navigate} />
      <Footer />
    </div>
  );
}

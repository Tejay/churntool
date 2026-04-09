import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    register(name.trim(), email.trim(), password);
    navigate("/onboarding/stripe", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <div className="mx-auto max-w-md px-6 py-20">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
            <Zap className="h-3 w-3 text-white" />
          </div>
          Winback
        </Link>
        <div className="rounded-3xl border border-slate-200/70 bg-white p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <h1 className="text-3xl font-semibold tracking-tight">Create your account.</h1>
          <p className="mt-1.5 text-[15px] text-slate-500">
            Connect Stripe and start recovering churn in under 5 minutes.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Your name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Founder"
                className="mt-1.5 h-12 rounded-full px-5"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Work email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1.5 h-12 rounded-full px-5"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="mt-1.5 h-12 rounded-full px-5"
                minLength={8}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full">
              Create account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-[12px] text-slate-400">
              Free until your first recovery. No card required.
            </p>
          </form>

          <p className="mt-8 text-center text-[13px] text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

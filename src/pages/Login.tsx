import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, onboarding } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    login(email.trim(), password);
    navigate(onboarding.completed ? "/dashboard" : "/onboarding/stripe", { replace: true });
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
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back.</h1>
          <p className="mt-1.5 text-[15px] text-slate-500">Let's recover some revenue.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Email</label>
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
                placeholder="••••••••"
                className="mt-1.5 h-12 rounded-full px-5"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full">
              Log in <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-[13px] text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

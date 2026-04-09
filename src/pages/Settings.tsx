import { useState, useEffect, type FormEvent } from "react";
import { CreditCard, Mail, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-slate-500">Connected accounts, product details, and your changelog.</p>
      </div>

      <Card className="rounded-[1.75rem]">
        <CardHeader>
          <CardTitle className="font-bold">Connected accounts</CardTitle>
          <CardDescription>These power Winback. Reconnect or disconnect at any time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
            iconBg="bg-white border"
            title="Gmail"
            subtitle="Sends winback emails from your address"
            connected={onboarding.gmailConnected}
            onConnect={() => updateOnboarding({ gmailConnected: true })}
            onDisconnect={() => updateOnboarding({ gmailConnected: false })}
          />
        </CardContent>
      </Card>

      <form onSubmit={handleSave}>
        <Card className="rounded-[1.75rem]">
          <CardHeader>
            <CardTitle className="font-bold">Product & sender</CardTitle>
            <CardDescription>Used to personalise every winback email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Product name</label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Notion, Linear, Figma"
                  className="mt-1 h-11 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Founder name</label>
                <Input
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  placeholder="Your name — emails sign off with this"
                  className="mt-1 h-11 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Changelog (what you've shipped recently)
              </label>
              <textarea
                value={changelog}
                onChange={(e) => setChangelog(e.target.value)}
                rows={8}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between border-t pt-5">
              <div>
                <div className="text-sm font-semibold text-slate-700">Logged in as</div>
                <div className="text-sm text-slate-500">{user?.email}</div>
              </div>
              <Button type="submit" className="rounded-xl">
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
          </CardContent>
        </Card>
      </form>
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
    <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5">
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
        <div>
          <div className="font-bold text-slate-900">{title}</div>
          <div className="text-sm text-slate-500">{subtitle}</div>
        </div>
      </div>
      {connected ? (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Connected
          </span>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" /> Not connected
          </span>
          <Button size="sm" className="rounded-xl" onClick={onConnect}>
            Connect
          </Button>
        </div>
      )}
    </div>
  );
}

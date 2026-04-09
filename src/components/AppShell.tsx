import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings as SettingsIcon, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">Winback</div>
              <div className="text-xs text-slate-500">Churn recovery on autopilot</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}

            <div className="mx-2 hidden h-6 w-px bg-slate-200 md:block" />

            <div className="flex items-center gap-2 rounded-full border bg-white px-2 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {initials}
              </div>
              <div className="hidden text-xs text-slate-600 md:block">{user?.name}</div>
              <button
                onClick={handleLogout}
                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

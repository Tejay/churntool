import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Marketing from "@/pages/Marketing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { OnboardingLayout, StripeStep, GmailStep, ChangelogStep, ReviewStep } from "@/pages/Onboarding";
import AppShell from "@/components/AppShell";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";

function RequireAuth() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RequireOnboarded() {
  const { onboarding } = useAuth();
  if (!onboarding.completed) return <Navigate to="/onboarding/stripe" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Marketing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated — onboarding wizard */}
          <Route element={<RequireAuth />}>
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="stripe" replace />} />
              <Route path="stripe" element={<StripeStep />} />
              <Route path="gmail" element={<GmailStep />} />
              <Route path="changelog" element={<ChangelogStep />} />
              <Route path="review" element={<ReviewStep />} />
            </Route>

            {/* Authenticated + onboarded — core app */}
            <Route element={<RequireOnboarded />}>
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  name: string;
  email: string;
};

export type OnboardingData = {
  stripeConnected: boolean;
  gmailConnected: boolean;
  changelog: string;
  productName: string;
  founderName: string;
  completed: boolean;
  billingAdded: boolean;
  emailsPaused: boolean;
};

type AuthState = {
  user: User | null;
  onboarding: OnboardingData;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateOnboarding: (patch: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const STORAGE_USER = "winback.user";
const STORAGE_ONBOARDING = "winback.onboarding";

const defaultOnboarding: OnboardingData = {
  stripeConnected: false,
  gmailConnected: false,
  changelog: "",
  productName: "",
  founderName: "",
  completed: false,
  billingAdded: false,
  emailsPaused: false,
};

const AuthContext = createContext<AuthState | null>(null);

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function readOnboarding(): OnboardingData {
  try {
    const raw = localStorage.getItem(STORAGE_ONBOARDING);
    return raw ? { ...defaultOnboarding, ...(JSON.parse(raw) as OnboardingData) } : defaultOnboarding;
  } catch {
    return defaultOnboarding;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readUser());
  const [onboarding, setOnboarding] = useState<OnboardingData>(() => readOnboarding());

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_USER);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ONBOARDING, JSON.stringify(onboarding));
  }, [onboarding]);

  const login = (email: string, _password: string) => {
    // Mock: accept any credentials, pull existing name if any.
    const existing = readUser();
    const name = existing?.name ?? email.split("@")[0] ?? "Founder";
    setUser({ name, email });
  };

  const register = (name: string, email: string, _password: string) => {
    setUser({ name, email });
    setOnboarding({ ...defaultOnboarding, founderName: name });
  };

  const logout = () => {
    setUser(null);
  };

  const updateOnboarding = (patch: Partial<OnboardingData>) => {
    setOnboarding((prev) => ({ ...prev, ...patch }));
  };

  const completeOnboarding = () => {
    setOnboarding((prev) => ({ ...prev, completed: true }));
  };

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, onboarding, login, register, logout, updateOnboarding, completeOnboarding, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

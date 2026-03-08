import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";
const STORAGE_KEY = "brainfeed_admin";

type AdminContextValue = {
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsLoading(false);
      return;
    }
    try {
      const { token: t } = JSON.parse(stored);
      if (!t) {
        setIsLoading(false);
        return;
      }
      fetch(`${API_BASE}/api/admin/me`, {
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((res) => (res.ok ? true : false))
        .then((ok) => {
          if (!ok) localStorage.removeItem(STORAGE_KEY);
          else setToken(t);
        })
        .catch(() => localStorage.removeItem(STORAGE_KEY))
        .finally(() => setIsLoading(false));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Login failed" };
      const { token: t } = data;
      setToken(t);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: t }));
      return {};
    } catch {
      return { error: "Something went wrong. Please try again." };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ token, isLoading, login, logout }),
    [token, isLoading]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
    setIsLoading(false); // ✅ hydration complete
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        isLoading,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Topbar() {
  const { logout } = useAuth();

  return (
    <header className="h-16 px-6 flex items-center justify-between
                       border-b border-white/5 bg-black backdrop-blur-xl">
      <div className="text-sm text-neutral-500">
        Monitoring Overview
      </div>
      
      <Button
        variant="ghost"
        className="text-sm text-neutral-400 hover:text-white hover:bg-white/[0.04] 
                   h-9 px-3 rounded-lg transition-all"
        onClick={logout}
      >
        <LogOut className="w-4 h-4 mr-2" strokeWidth={1.5} />
        Logout
      </Button>
    </header>
  );
}
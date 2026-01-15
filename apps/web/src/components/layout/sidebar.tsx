"use client";

import Link from "next/link";
import { LayoutDashboard, Activity, Settings, AlertCircle } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Systems", href: "/dashboard/systems", icon: Activity },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/5 bg-black flex-col hidden md:flex">
      {/* Logo */}
      <div className="h-16 border-b border-white/5 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold">AutoPulse</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg
                       text-sm text-neutral-400 hover:text-white
                       hover:bg-white/[0.04] transition-all"
          >
            <item.icon className="w-4 h-4" strokeWidth={1.5} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/5">
        <div className="text-xs text-neutral-600">
          © {new Date().getFullYear()} AutoPulse
        </div>
      </div>
    </aside>
  );
}
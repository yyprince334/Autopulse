"use client";

import Link from "next/link";
import { useAlerts } from "@/hooks/use-alerts";
import { AlertRow } from "@/components/alerts/alert-row";
import { ArrowRight, Bell } from "lucide-react";

export function RecentAlerts() {
  const { alerts, loading } = useAlerts();
  const recent = alerts.slice(0, 5);

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Recent Alerts</h2>
        <Link
          href="/dashboard/alerts"
          className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
        </Link>
      </div>
      
      {loading ? (
        <div className="p-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-500 rounded-full animate-spin" />
            Loading alerts...
          </div>
        </div>
      ) : recent.length === 0 ? (
        <div className="p-12 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <Bell className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-400">No alerts</p>
              <p className="text-xs text-neutral-600">All systems are running smoothly</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {recent.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
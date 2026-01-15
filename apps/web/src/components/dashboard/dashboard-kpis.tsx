"use client";

import { useSystems } from "@/hooks/use-systems";
import { useAlerts } from "@/hooks/use-alerts";
import { Activity, AlertTriangle, Server, CheckCircle2 } from "lucide-react";

function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  status,
}: {
  label: string;
  value: string | number;
  icon: any;
  trend?: string;
  status?: "neutral" | "success" | "warning" | "error";
}) {
  const statusColors = {
    neutral: "text-neutral-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
  };

  const iconBgColors = {
    neutral: "bg-white/[0.02]",
    success: "bg-green-500/5",
    warning: "bg-yellow-500/5",
    error: "bg-red-500/5",
  };

  return (
    <div className="group relative rounded-xl border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.02] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconBgColors[status || "neutral"]}`}>
          <Icon className={`w-4 h-4 ${statusColors[status || "neutral"]}`} strokeWidth={1.5} />
        </div>
        {trend && (
          <span className="text-xs text-neutral-600">{trend}</span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </div>
  );
}

export function DashboardKPIs() {
  const { systems, loading: systemsLoading } = useSystems();
  const { alerts, loading: alertsLoading } = useAlerts();

  if (systemsLoading || alertsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[140px] rounded-xl border border-white/5 bg-white/[0.01] animate-pulse"
          />
        ))}
      </div>
    );
  }

  const total = systems.length;
  const up = systems.filter((s) => s.status === "UP").length;
  const down = systems.filter((s) => s.status === "DOWN").length;
  const activeIncidents = alerts.filter((a) => !a.systemId).length;

  // Calculate uptime percentage
  const uptimePercentage = total > 0 ? ((up / total) * 100).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard 
        label="Total Systems" 
        value={total} 
        icon={Server} 
        status="neutral"
      />
      <KpiCard 
        label="Systems Online" 
        value={up} 
        icon={CheckCircle2} 
        trend={`${uptimePercentage}%`}
        status="success"
      />
      <KpiCard 
        label="Systems Down" 
        value={down} 
        icon={Activity} 
        status={down > 0 ? "error" : "neutral"}
      />
      <KpiCard
        label="Active Incidents"
        value={activeIncidents}
        icon={AlertTriangle}
        status={activeIncidents > 0 ? "warning" : "neutral"}
      />
    </div>
  );
}
"use client";
import { Activity, AlertTriangle, Clock, TrendingUp } from "lucide-react";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs ? `${mins}m ${secs}s` : `${mins}m`;
}

function availabilityColor(pct: number) {
  if (pct >= 95.9) return "text-emerald-400";
  if (pct >= 70) return "text-amber-400";
  return "text-rose-400";
}

function availabilityGradient(pct: number) {
  if (pct >= 95.9) return "from-emerald-500/20 to-emerald-500/5";
  if (pct >= 70) return "from-amber-500/20 to-amber-500/5";
  return "from-rose-500/20 to-rose-500/5";
}

function availabilityGlow(pct: number) {
  if (pct >= 95.9) return "bg-emerald-400/10";
  if (pct >= 70) return "bg-amber-400/10";
  return "bg-rose-400/10";
}

export function HealthSummaryCard({
  summary,
  rangeLabel,
}: {
  summary: {
    availabilityPct: number;
    uptimeSeconds: number;
    downtimeSeconds: number;
    incidentCount: number;
    sloTarget: number;
    sloBreached: boolean;
    healthStatus: "HEALTHY" | "UNHEALTHY";
  };
  rangeLabel: string;
}) {
  const statusColor =
  summary.healthStatus === "HEALTHY"
    ? "text-green-400"
    : "text-yellow-400";
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <Activity className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Health Summary
            </h2>
            <p className="text-xs text-white/40 mt-0.5">{rangeLabel}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Availability - Featured Card */}
        <div
          className={`relative rounded-xl border border-white/10 bg-gradient-to-br ${availabilityGradient(
            summary.availabilityPct
          )} p-6 overflow-hidden group hover:border-white/20 transition-all duration-300`}
        >
          {/* Glow effect */}
          <div
            className={`absolute -top-10 -right-10 w-32 h-32 ${availabilityGlow(
              summary.availabilityPct
            )} blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity`}
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-white/50" />
              <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                Availability
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-4xl font-bold ${availabilityColor(
                  summary.availabilityPct
                )} tracking-tight`}
              >
                {summary.availabilityPct}
              </p>
              <span
                className={`text-2xl font-semibold ${availabilityColor(
                  summary.availabilityPct
                )}`}
              >
                %
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">
                  SLO target: {summary.sloTarget}%
                </p>
                <p
                  className={`flex justify-between items-center text-xs font-medium mt-1 ${
                    summary.sloBreached ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {summary.sloBreached ? "SLO breached" : "SLO met"}
                  <p className={`font-semibold ${statusColor}`}>
  {summary.healthStatus}
</p>
                </p>
          </div>
        </div>

        {/* Downtime */}
        <div className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-3.5 w-3.5 text-purple-400/70" />
              <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                Downtime
              </p>
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">
              {summary.downtimeSeconds === 0 ? (
                <span className="text-emerald-400">None</span>
              ) : (
                formatDuration(summary.downtimeSeconds)
              )}
            </p>
          </div>
        </div>

        {/* Incidents */}
        <div className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-3.5 w-3.5 text-orange-400/70" />
              <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                Incidents
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white tracking-tight">
                {summary.incidentCount}
              </p>
              {summary.incidentCount === 0 && (
                <span className="text-xs text-emerald-400 font-medium">
                  All clear
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { StatusBadge } from "@/components/systems/status-badge";
import { useSystemDetail } from "@/hooks/useSystemDetail";
import { useParams } from "next/navigation";
import { timeAgo } from "@/lib/time";
import { useSystemHealth } from "@/hooks/use-system-health";
import { useState } from "react";
import { UptimeDonut } from "@/components/charts/uptime-donut";
import { HealthTimeline } from "@/components/charts/healthTimeline";
import { HealthSummaryCard } from "@/components/health/healthSummary";
import { AlertHistory } from "@/components/alerts/alert-history";
import { useSystemAlerts } from "@/hooks/use-system-alerts";
import Link from "next/link";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";

export default function SystemDetailPage() {
  const [range, setRange] = useState<"1h" | "24h">("1h");
  const { id } = useParams<{ id: string }>();
  const {
    status,
    loading: systemLoading,
    heartbeats,
    system,
  } = useSystemDetail(id);
  const { today, yesterday, older } = groupHeartbeats(heartbeats);
  const { alerts, loading: alertsLoading } = useSystemAlerts(id);
  const {
    summary,
    timeline,
    loading: healthLoading,
  } = useSystemHealth(id, range);

  if (systemLoading || healthLoading || !summary) {
    return (
      <div className="space-y-4">
        <p>Loading Systems...</p>
        <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
        <div className="h-4 w-72 bg-white/10 rounded animate-pulse" />
        <div className="h-32 bg-white/5 rounded-xl animate-pulse" />
      </div>
    );
  }
  if (!system) {
    return (
      <div className="text-red-400">System not found or inaccessible.</div>
    );
  }

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Systems", href: "/dashboard/systems" },
          { label: system?.name ?? "Loading…" },
        ]}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{system.name}</h1>

          {system.description && (
            <p className="text-white/60 max-w-2xl">{system.description}</p>
          )}
        </div>

        <StatusBadge status={status} />
        <Link
    href={`/dashboard/systems/${id}/settings`}
    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
  >
    Settings
  </Link>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetaCard
          label="Heartbeat Interval"
          value={`${system.heartbeatInterval}s`}
        />
        <MetaCard label="System ID" value={system.id} mono />
        <MetaCard
          label="Created At"
          value={new Date(system.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Health Analytics */}
      <div className="space-y-6">
        <HealthSummaryCard summary={summary} rangeLabel="Last 1 hour" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <UptimeDonut
    uptimeSeconds={summary.uptimeSeconds}
    downtimeSeconds={summary.downtimeSeconds}
    availabilityPct={summary.availabilityPct}
    rangeLabel={range === "1h" ? "Last 1 hour" : "Last 24 hours"}
  />

  <HealthTimeline data={timeline} />
</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Alert History</h2>
      
        {alertsLoading ? (
          <p className="text-white/40">Loading alerts…</p>
        ) : (
          // <AlertHistory alerts={alerts} />
          <RecentAlerts/>
        )}
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Heartbeat Timeline</h2>

        {heartbeats.length === 0 ? (
          <div className="text-white/40 text-sm italic">
            Waiting for first heartbeat…
          </div>
        ) : (
          <div className="space-y-8">
            <TimelineSection title="Today" items={today} />
            <TimelineSection title="Yesterday" items={yesterday} />
            <TimelineSection title="Earlier" items={older} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- small helper component ---------- */

function MetaCard({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-white/40 mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-medium text-white ${
          mono ? "font-mono break-all" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function groupHeartbeats(heartbeats: { id: string; recievedAt: string }[]) {
  const now = new Date();

  const today: typeof heartbeats = [];
  const yesterday: typeof heartbeats = [];
  const older: typeof heartbeats = [];

  for (const hb of heartbeats) {
    const hbDate = new Date(hb.recievedAt);

    const diffDays = (now.getTime() - hbDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      today.push(hb);
    } else if (diffDays < 2) {
      yesterday.push(hb);
    } else {
      older.push(hb);
    }
  }

  return { today, yesterday, older };
}

function TimelineSection({
  title,
  items,
}: {
  title: string;
  items: { id: string; recievedAt: string }[];
}) {
  if (items.length === 0) return null;

  const data = items.slice(0,5)

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wide text-white/40">{title}</p>
      <ul className="space-y-3">
        {data.map((hb) => {
          // ✅ THIS is where it belongs
          const isRecent =
            Date.now() - new Date(hb.recievedAt).getTime() < 60_000;

          return (
            <li
              key={hb.id}
              className="flex items-center justify-between
                             rounded-lg border border-white/10
                             bg-white/5 px-4 py-3 text-sm
                             animate-fade-up"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isRecent ? "bg-green-400 animate-pulse" : "bg-white/30"
                  }`}
                />
                <span className="text-white/70">Heartbeat received</span>
              </div>

              <span className="text-white/40">{timeAgo(hb.recievedAt)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

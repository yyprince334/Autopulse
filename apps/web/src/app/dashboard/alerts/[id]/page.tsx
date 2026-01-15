"use client";

import { useAlert } from "@/hooks/use-alerts";
import Link from "next/link";
import { useParams } from "next/navigation";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function AlertDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { alert, loading } = useAlert(id);

  if (loading) return <div>Loading…</div>;
  if (!alert) return <div>Alert not found</div>;

  const isResolved = !!alert.resolvedAt;

  const duration = alert.resolvedAt
    ? Math.floor(
        (new Date(alert.resolvedAt).getTime() -
          new Date(alert.createdAt).getTime()) /
          1000
      )
    : Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / 1000);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Incident Details</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Message</p>
        <p className="text-white">{alert.message}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Detail label="Severity" value={alert.severity} />
          <Detail label="Status" value={isResolved ? "RESOLVED" : "ACTIVE"} />
          <Detail
            label="System"
            value={
                alert.systemId
            }
          />
          <Detail
            label="Started"
            value={new Date(alert.createdAt).toLocaleString()}
          />
          <Detail
            label="Resolved"
            value={
              alert.resolvedAt
                ? new Date(alert.resolvedAt).toLocaleString()
                : "—"
            }
          />
          <Detail label="Duration" value={formatDuration(duration)} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

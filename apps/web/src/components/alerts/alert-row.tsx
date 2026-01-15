import { AlertTriangle, CheckCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { SeverityBadge } from "./severity-badge";
import Link from "next/link";

function timeAgo(date: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function AlertRow({ alert }: { alert: any }) {
  const isDown = alert.status === "DOWN";
  const isAck = !!alert.acknowledgedAt;

  async function acknowledge() {
    await apiFetch(`alerts/${alert.id}/acknowledge`, {
      method: "POST",
    });
    window.location.reload();
  }

  return (
    <Link href={`/dashboard/alerts/${alert.id}`}>
    <div
      className={`flex items-center justify-between px-6 py-4 border-b border-white/10
      ${isAck ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-4">
        {isDown ? (
          <AlertTriangle className="h-5 w-5 text-rose-400" />
        ) : (
          <CheckCircle className="h-5 w-5 text-emerald-400" />
        )}

        <div>
          <p className="text-sm text-white font-medium">
            {alert.message}
          </p>
          <p className="text-xs text-white/40">
            {timeAgo(alert.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isAck && (
          <button
            onClick={acknowledge}
            className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20"
          >
            Acknowledge
          </button>
        )}

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isDown
              ? "bg-rose-500/10 text-rose-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {alert.status}
        </span>
        <div className="flex items-center gap-2">
  <SeverityBadge severity={alert.severity} />
  <span className="text-xs text-white/40">
    {timeAgo(alert.createdAt)}
  </span>
</div>
      </div>
    </div>
    </Link>
  );
}
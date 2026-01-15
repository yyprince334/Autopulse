import { AlertTriangle, CheckCircle } from 'lucide-react';
import { timeAgo } from '@/lib/time';

export function AlertHistory({ alerts }: { alerts?: any[] }) {
  // 🔑 HARD GUARD — prevents ALL crashes
  if (!Array.isArray(alerts) || alerts.length === 0) {
    return (
      <div className="text-white/40 text-sm italic">
        No alerts recorded for this system.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const isDown = alert.status === 'DOWN';

        return (
          <div
            key={alert.id}
            className="flex items-center justify-between
                       rounded-xl border border-white/10
                       bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {isDown ? (
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              )}

              <div>
                <p className="text-sm text-white">
                  {alert.message}
                </p>
                <p className="text-xs text-white/40">
                  {timeAgo(alert.createdAt)}
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-medium ${
                isDown ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {alert.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
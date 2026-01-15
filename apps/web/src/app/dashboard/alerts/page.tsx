"use client";

import { useAlerts } from "@/hooks/use-alerts";
import { AlertRow } from "@/components/alerts/alert-row";
import { AlertFilters } from "@/components/alerts/alert-filters";

export default function AlertsPage() {
  const { alerts, loading, filters, setFilters } = useAlerts();

  if (loading) {
    return <div className="text-white/40">Loading alerts…</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Alerts</h1>

      <AlertFilters filters={filters} onChange={setFilters} />

      <div className="rounded-xl border border-white/10 overflow-hidden">
        {alerts.length === 0 ? (
          <div className="p-6 text-white/40">No alerts found</div>
        ) : (
          alerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert}/>
          ))
        )}
      </div>
    </div>
  );
}
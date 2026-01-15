import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export type Alert = {
  id: string;
  systemId: string;
  status: "DOWN" | "RECOVERED";
  message: string;
  createdAt: string;
};

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "ALL",
  });

  useEffect(() => {
    setLoading(true);

    apiFetch("alerts")
      .then((data) => {
        setAlerts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = alerts.filter((a) => {
    if (filters.status === "ALL") return true;
    return a.status === filters.status;
  });

  return {
    alerts: filtered,
    loading,
    filters,
    setFilters,
  };
}

export function useAlert(id: string) {
    const [alert, setAlert] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      apiFetch(`alerts/${id}`)
        .then(setAlert)
        .finally(() => setLoading(false));
    }, [id]);
  
    return { alert, loading };
  }
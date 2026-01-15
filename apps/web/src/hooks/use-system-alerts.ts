import { useEffect, useState } from 'react';
import { getSystemAlerts } from '@/lib/alerts.api';

export function useSystemAlerts(systemId: string) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!systemId) return;

    setLoading(true);

    getSystemAlerts(systemId)
      .then(setAlerts)
      .finally(() => setLoading(false));
  }, [systemId]);

  return { alerts, loading };
}
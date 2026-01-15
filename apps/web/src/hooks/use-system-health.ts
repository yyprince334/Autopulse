import { useEffect, useState } from "react";
import { getHealthSummary, getHealthTimeline } from "@/lib/health.api";
import { HealthSummary } from "@/types/health";

export function useSystemHealth(
  systemId: string,
  range: "1h" | "24h"
) {
  const [summary, setSummary] = useState<HealthSummary | null>(null);

  const [timeline, setTimeline] = useState<
  { timestamp: string; availability: number }[]
>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!systemId) return;

    setLoading(true);

    Promise.all([
      getHealthSummary(systemId, range),
      getHealthTimeline(systemId, range),
    ])
      .then(([s, rawTimeline]) => {
        setSummary(s);

        setTimeline(rawTimeline);
      })
      .finally(() => setLoading(false));
  }, [systemId, range]);

  return { summary, timeline, loading };
}
import { apiFetch } from "@/lib/api";

export function getHealthSummary(
  systemId: string,
  range: "1h" | "24h"
) {
  return apiFetch(
    `systems/${systemId}/health/summary?range=${range}`
  );
}

export function getHealthTimeline(
  systemId: string,
  range: "1h" | "24h"
) {
  return apiFetch(
    `systems/${systemId}/health/timeline?range=${range}`
  );
}
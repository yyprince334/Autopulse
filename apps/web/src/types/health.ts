export type HealthStatus = "HEALTHY" | "UNHEALTHY";

export interface HealthSummary {
  availabilityPct: number;
  uptimeSeconds: number;
  downtimeSeconds: number;
  incidentCount: number;
  sloTarget: number;
  sloBreached: boolean;
  healthStatus: HealthStatus;
}
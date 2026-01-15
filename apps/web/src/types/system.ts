export type SystemStatus = "UP" | "DOWN" | "UNKNOWN" | "DEGRADED";

export type System = {
  id: string;
  name: string;
  description?: string;
  status: SystemStatus;
  heartbeatInterval: number;
  createdAt: string;
};
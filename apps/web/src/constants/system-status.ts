// src/constants/system-status.ts
export const SYSTEM_STATUS_META = {
  UP: {
    label: "UP",
    wrapper: "bg-green-500/10 text-green-400 border border-green-500/20",
    dot: "bg-green-400 animate-pulse",
  },
  DEGRADED: {
    label: "DEGRADED",
    wrapper: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    dot: "bg-yellow-400 animate-pulse",
  },
  DOWN: {
    label: "DOWN",
    wrapper: "bg-red-500/10 text-red-400 border border-red-500/20",
    dot: "bg-red-400",
  },
  UNKNOWN: {
    label: "UNKNOWN",
    wrapper: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
    dot: "bg-gray-400",
  },
} as const;
export type AlertSeverity = 
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export function calculateSeverity(
  downtimeSeconds: number
): AlertSeverity {
  if (downtimeSeconds >= 1800) return "CRITICAL"; // 30 min
  if (downtimeSeconds >= 900) return "HIGH";      // 15 min
  if (downtimeSeconds >= 300) return "MEDIUM";    // 5 min
  return "LOW";
}
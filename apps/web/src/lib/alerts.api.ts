import { apiFetch } from "./api";

export async function getSystemAlerts(systemId: string) {
  return apiFetch(`systems/${systemId}/alerts`);
}

export async function getAllAlerts() {
    return apiFetch('alerts')
}

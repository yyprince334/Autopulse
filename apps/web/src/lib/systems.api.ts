import { apiFetch } from "./api";
import { System } from "@/types/system";
import { CreateSystemResponse } from "@/types/system-create-response";

export async function fetchSystems(): Promise<System[]> {
  return apiFetch("systems", {
    method: "GET",
  });
}

export async function createSystem(data: {
  name: string;
  description?: string;
  heartbeatInterval: number;
}): Promise<CreateSystemResponse> {
  return apiFetch("systems", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateSystem(
  id: string,
  data: {
    name?: string;
    description?: string;
    heartbeatInterval?: number;
  }
) {
  return apiFetch(`systems/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteSystem(id: string) {
  return apiFetch(`systems/${id}`, {
    method: "DELETE",
  });
}

import { Heartbeat } from '@/types/heartbeat';
import { System, SystemStatus } from '@/types/system';
import { apiFetch } from './api';

export async function fetchSystemStatus(id: string): Promise<SystemStatus> {
    return await apiFetch(`systems/${id}/status`).then(res => res.status);
}

export async function fetchHeartbeats(id: string): Promise<Heartbeat[]> {
    return await apiFetch(`systems/${id}/heartbeats`);
}

export function fetchSystem(id: string): Promise<System> {
  return apiFetch(`systems/${id}`);
}
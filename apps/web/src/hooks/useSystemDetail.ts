import { useEffect, useRef, useState } from "react";
import {
  fetchSystem,
  fetchSystemStatus,
  fetchHeartbeats,
} from "@/lib/system-detail";
import { Heartbeat } from "@/types/heartbeat";
import { System, SystemStatus } from "@/types/system";

const POLL_INTERVAL = 30_000;

export function useSystemDetail(systemId: string) {
  const [system, setSystem] = useState<System | null>(null);
  const [status, setStatus] = useState<SystemStatus>("UNKNOWN");
  const [heartbeats, setHeartbeats] = useState<Heartbeat[]>([]);
  const [loading, setLoading] = useState(true);

  const pollingRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);

  async function loadAll() {
    if (stoppedRef.current) return;

    try {
      // 1️⃣ Load system FIRST (critical)
      const sys = await fetchSystem(systemId);
      setSystem(sys);

      // 2️⃣ Load status (safe)
      try {
        const stat = await fetchSystemStatus(systemId);
        setStatus(stat);
      } catch {
        // keep previous status
      }

      // 3️⃣ Load heartbeats (safe)
      try {
        const hb = await fetchHeartbeats(systemId);
        setHeartbeats(hb);
      } catch {
        // keep previous heartbeats
      }

      setLoading(false);
    } catch (err: any) {
      if (err.message === "Session expired") {
        stoppedRef.current = true;
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      }
    }
  }

  useEffect(() => {
    if (!systemId) return;

    stoppedRef.current = false;
    setLoading(true);

    loadAll();

    pollingRef.current = window.setInterval(loadAll, POLL_INTERVAL);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [systemId]);

  return {
    system,
    status,
    heartbeats,
    loading,
  };
}
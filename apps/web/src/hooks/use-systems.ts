import { useEffect, useState } from "react";
import { fetchSystems, createSystem, updateSystem } from "@/lib/systems.api";
import { System } from "@/types/system";
import { deleteSystem } from "@/lib/systems.api";

export function useSystems() {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);

  useEffect(() => {
    fetchSystems()
      .then(setSystems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    setLastUpdated(new Date());
  }, []);

  async function addSystem(data: {
    name: string;
    description?: string;
    heartbeatInterval: number;
  }) {
    // 🔥 optimistic system
    const optimistic: System = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      heartbeatInterval: data.heartbeatInterval,
      status: "UNKNOWN",
      createdAt: new Date().toISOString(),
    };

    setSystems((prev) => [optimistic, ...prev]);

    try {
      const real = await createSystem(data);
      if (real.apiKey) {
        setCreatedApiKey(real.apiKey);
        console.log("CREATED API KEY 👉", real.apiKey);
      }

      // 🔄 replace optimistic with real
      setSystems((prev) =>
        prev.map((s) =>
          s.id === optimistic.id ? { ...real, status: "UNKNOWN" } : s
        )
      );
      
    } catch (err) {
      // ❌ rollback
      setSystems((prev) => prev.filter((s) => s.id !== optimistic.id));
      throw err;
    }
  }

  async function editSystem(
    id: string,
    data: {
      name: string;
      description?: string;
      heartbeatInterval: number;
    }
  ) {
    setSystems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );

    try {
      const updated = await updateSystem(id, data);
      setSystems((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
    } catch (err) {
      const fresh = await fetchSystems();
      setSystems(fresh);
      throw err;
    }
  }

  async function removeSystem(id: string) {
    // 🔥 optimistic remove
    const snapshot = systems;
    setSystems((prev) => prev.filter((s) => s.id !== id));

    try {
      await deleteSystem(id);
    } catch (err) {
      // ❌ rollback on failure
      setSystems(snapshot);
      throw err;
    }
  }

  return {
    systems,
    loading,
    error,
    addSystem,
    editSystem,
    removeSystem,
    lastUpdated,
    createdApiKey,          // 👈 ADD
    clearCreatedApiKey: () => setCreatedApiKey(null), 
  };
}

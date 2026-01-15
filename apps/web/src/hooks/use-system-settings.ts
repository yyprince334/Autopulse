import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function useSystemSettings(systemId: string) {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`systems/${systemId}/settings`)
      .then(setSettings)
      .finally(() => setLoading(false));
  }, [systemId]);

  const update = async (data: Partial<typeof settings>) => {
    const updated = await apiFetch(
      `systems/${systemId}/settings`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
    setSettings(updated);
  };

  return { settings, loading, update };
}
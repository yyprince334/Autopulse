"use client";

import { useSystemSettings } from "@/hooks/use-system-settings";
import { useState } from "react";

export function SystemSettingsForm({
  systemId,
}: {
  systemId: string;
}) {
  const { settings, loading, update } = useSystemSettings(systemId);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="h-40 rounded-xl bg-white/5 animate-pulse" />
    );
  }

  async function handleSave() {
    setSaving(true);
    await update(settings);
    setSaving(false);
  }

  return (
    <div className="space-y-8">

      {/* ALERT THRESHOLDS */}
      <Section title="Alert thresholds">
        <Field
          label="Warning threshold (seconds)"
          value={settings.warningThresholdSec}
          onChange={(v) =>
            (settings.warningThresholdSec = Number(v))
          }
        />

        <Field
          label="Critical threshold (seconds)"
          value={settings.criticalThresholdSec}
          onChange={(v) =>
            (settings.criticalThresholdSec = Number(v))
          }
        />
      </Section>

      {/* HEARTBEAT BEHAVIOR */}
      <Section title="Heartbeat behavior">
        <Field
          label="Grace multiplier"
          value={settings.heartbeatGraceMultiplier}
          onChange={(v) =>
            (settings.heartbeatGraceMultiplier = Number(v))
          }
        />
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Notifications">
        <Toggle
          label="Email alerts enabled"
          value={settings.emailAlertsEnabled}
          onChange={(v) =>
            (settings.emailAlertsEnabled = v)
          }
        />
      </Section>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:bg-cyan-400 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-white/60">{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm"
      />
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-white/70">{label}</span>
    </label>
  );
}
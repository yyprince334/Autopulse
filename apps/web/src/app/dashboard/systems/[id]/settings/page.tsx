"use client";

import { useParams } from "next/navigation";
import { SystemSettingsForm } from "@/components/settings/system-settings-form";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function SystemSettingsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Systems", href: "/dashboard/systems" },
          { label: "System", href: `/dashboard/systems/${id}` },
          { label: "Settings" },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          System Settings
        </h1>
        <p className="text-white/50 mt-1">
          Control alerting and monitoring behavior
        </p>
      </div>

      <SystemSettingsForm systemId={id} />
    </div>
  );
}
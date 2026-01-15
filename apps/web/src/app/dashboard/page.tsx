"use client";

import { DashboardKPIs } from "@/components/dashboard/dashboard-kpis";
import { SystemsTable } from "@/components/dashboard/systems-table";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-neutral-500">
            Overview of system health and incidents
          </p>
        </div>
        
        {/* KPIs Section */}
        <div className="space-y-4">
          <DashboardKPIs />
        </div>
        
        {/* Systems Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Systems</h2>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <SystemsTable />
          </div>
        </div>
        
        {/* Recent Alerts Section */}
        <div className="space-y-4 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Alerts</h2>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <RecentAlerts />
          </div>
        </div>
      </div>
    </div>
  );
}
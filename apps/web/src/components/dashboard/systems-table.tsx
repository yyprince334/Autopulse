"use client";

import Link from "next/link";
import { useSystems } from "@/hooks/use-systems";
import { StatusBadge } from "@/components/systems/status-badge";
import { ArrowRight, Activity } from "lucide-react";

export function SystemsTable() {
  const { systems, loading } = useSystems();

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <h2 className="text-lg font-semibold tracking-tight">Systems</h2>
      </div>
      
      {loading ? (
        <div className="p-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-500 rounded-full animate-spin" />
            Loading systems...
          </div>
        </div>
      ) : systems.length === 0 ? (
        <div className="p-12 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <Activity className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-400">No systems yet</p>
              <p className="text-xs text-neutral-600">Add your first system to start monitoring</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Heartbeat
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {systems.map((system) => (
                <tr
                  key={system.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">{system.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={system.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neutral-500">{system.heartbeatInterval}s</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/systems/${system.id}`}
                      className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
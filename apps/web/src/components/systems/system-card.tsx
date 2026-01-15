"use client";

import Link from "next/link";
import { StatusBadge } from "./status-badge";
import { System } from "@/types/system";
import { Button } from "../ui/button";

export function SystemCard({
  system,
  onEdit,
  onDelete,
}: {
  system: System;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-white/5 p-6
        hover:bg-white/10 hover:border-white/20
        transition-all
      "
    >
      {/* ✅ CLICKABLE AREA */}
      <Link href={`/dashboard/systems/${system.id}`} className="block">
        <div className="mb-4 cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{system.name}</h3>

              {system.description && (
                <p className="text-sm text-white/50 mt-1">
                  {system.description}
                </p>
              )}
            </div>

            <StatusBadge status={system.status} />
          </div>
        </div>
      </Link>

      {/* ✅ ACTION BAR (NOT inside Link) */}
      <div className="flex justify-between items-center text-sm text-white/40">
        <span>Heartbeat interval: {system.heartbeatInterval}s</span>

        <div className="flex justify-between items-center text-sm gap-2">
          <Button className="
              flex-1
              bg-white/5
              border-white/10
            " 
            size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          Delete
        </Button>
        </div>
      </div>
    </div>
  );
}

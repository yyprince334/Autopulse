"use client";

import { SystemsEmptyState } from "@/components/systems/empty-state";
import { SystemCard } from "@/components/systems/system-card";
import { SystemModal } from "@/components/systems/system-modal";
import { Button } from "@/components/ui/button";
import { useSystems } from "@/hooks/use-systems";
import { useState } from "react";
import { SystemSkeletonGrid } from "@/components/systems/system-skeleton-grid";
import { System } from "@/types/system";
import { DeleteSystemModal } from "@/components/systems/delete-system-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SystemsPage() {
  const {
    systems,
    loading,
    error,
    addSystem,
    editSystem,
    lastUpdated,
    removeSystem,
    createdApiKey,
    clearCreatedApiKey,
  } = useSystems();

  const [open, setOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<System | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<System | null>(null);

  function handleAddClick() {
    setEditingSystem(null);
    setOpen(true);
  }

  function handleEditClick(system: System) {
    setEditingSystem(system);
    setOpen(true);
  }

  async function handleSubmit(data: {
    name: string;
    description?: string;
    heartbeatInterval: number;
  }) {
    if (editingSystem) {
      await editSystem(editingSystem.id, data);
    } else {
      await addSystem(data);
    }
  }

  if (loading) {
    return <SystemSkeletonGrid />;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (systems.length === 0) {
  return (
    <>
      <SystemsEmptyState onAdd={handleAddClick} />

      <SystemModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        mode="create"
      />
    </>
  );
}

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Systems</h1>
          <p className="text-white/60 mt-1">
            Monitor availability and health in real time.
          </p>
          {lastUpdated && (
            <p className="text-xs text-white/40">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <Button onClick={handleAddClick}>Add System</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {systems.map((system) => (
          <SystemCard
            key={system.id}
            system={system}
            onEdit={() => handleEditClick(system)} // ✅ EDIT WIRED
            onDelete={() => setDeleteTarget(system)}
          />
        ))}
      </div>

      <SystemModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        mode={editingSystem ? "edit" : "create"}
        initialData={
          editingSystem
            ? {
                name: editingSystem.name,
                description: editingSystem.description ?? "",
                heartbeatInterval: editingSystem.heartbeatInterval,
              }
            : undefined
        }
      />
      {createdApiKey && (
        <Dialog open onOpenChange={clearCreatedApiKey}>
          <DialogContent
            className="
        bg-[#0B0F14]/95 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-2xl
        w-fit
        max-w-[90vw]
        p-0
      "
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10 relative">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-lg font-semibold">
                  Save your API key
                </DialogTitle>
                <p className="text-sm text-white/50">
                  This key grants access to send heartbeats.
                  <br />
                  <span className="text-red-400 font-medium">
                    It will be shown only once.
                  </span>
                </p>
              </DialogHeader>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <p className="text-xs text-white/40 mb-2">API key</p>
                <pre className="text-sm font-mono text-white break-all leading-relaxed">
                  {createdApiKey}
                </pre>
              </div>

              <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 text-sm text-yellow-300">
                Store this key securely. If lost, you’ll need to rotate it.
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(createdApiKey)}
                className="flex-1 bg-white/5 border-white/10"
              >
                Copy key
              </Button>

              <Button onClick={clearCreatedApiKey} className="flex-1">
                I’ve saved it
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {deleteTarget && (
        <DeleteSystemModal
          open={!!deleteTarget}
          systemName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await removeSystem(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}

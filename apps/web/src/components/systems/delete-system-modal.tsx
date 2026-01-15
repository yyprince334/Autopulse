"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export function DeleteSystemModal({
  open,
  onClose,
  onConfirm,
  systemName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  systemName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      await onConfirm();
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to delete system");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Delete System
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-white/70">
          <p>
            You are about to permanently delete{" "}
            <span className="font-semibold text-white">{systemName}</span>.
          </p>

          <p>
            This will:
            <ul className="list-disc pl-5 mt-2 space-y-1 text-white/50">
              <li>Remove the system permanently</li>
              <li>Invalidate API keys</li>
              <li>Stop all heartbeats</li>
            </ul>
          </p>

          <p className="text-red-400 font-medium">
            This action cannot be undone.
          </p>

          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="
              flex-1
              bg-white/5
              border-white/10
              hover:bg-white
            "
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Deleting..." : "Delete System"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
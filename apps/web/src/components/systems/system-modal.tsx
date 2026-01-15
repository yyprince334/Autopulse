"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export function SystemModal({
  open,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    heartbeatInterval: number;
  }) => Promise<void>;
  initialData?: {
    name: string;
    description?: string;
    heartbeatInterval: number;
  };
  mode?: "create" | "edit";
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interval, setInterval] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description ?? "");
      setInterval(initialData.heartbeatInterval);
    } else {
      setName("");
      setDescription("");
      setInterval(60);
    }
  }, [initialData]);

  async function handleSubmit() {
    if (!name.trim()) {
      setError("System name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name,
        description: description || undefined,
        heartbeatInterval: interval,
      });
      onClose();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#0B0F14]/90 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          shadow-2xl
          max-w-md
          p-0
        "
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-indigo-500/10
                  border border-indigo-500/20
                "
              >
                <Settings className="h-4 w-4 text-indigo-400" />
              </div>

              <DialogTitle className="text-lg font-semibold">
                {mode === "edit" ? "Edit system" : "Add new system"}
              </DialogTitle>
            </div>

            <DialogDescription className="text-sm text-white/50">
              {mode === "edit"
                ? "Update system details and monitoring configuration."
                : "Register a system to begin heartbeat monitoring."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-white/60">System name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Payments API"
              className="bg-white/5 border-white/10 focus:border-indigo-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-white/60">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="bg-white/5 border-white/10 focus:border-indigo-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-white/60">
              Heartbeat interval (seconds)
            </Label>
            <Input
              type="number"
              min={10}
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="bg-white/5 border-white/10 focus:border-indigo-500/40"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
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
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1"
          >
            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update system"
              : "Create system"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    
  );
}
import { Button } from "@/components/ui/button";

export function SystemsEmptyState({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 space-y-6">
      <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-3xl">🖥️</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          No systems yet
        </h2>
        <p className="text-white/50 max-w-sm">
          Add your first system to start monitoring uptime and health.
        </p>
      </div>

      <Button
        onClick={onAdd}
        className="bg-gradient-to-r from-indigo-600 to-violet-600
                   hover:from-indigo-500 hover:to-violet-500
                   shadow-lg shadow-indigo-600/30"
      >
        Add system
      </Button>
    </div>
  );
}
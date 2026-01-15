export function AlertFilters({
  filters,
  onChange,
}: {
  filters: any;
  onChange: (f: any) => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onChange({ status: "ALL" })}
        className={`px-3 py-1 rounded-md text-sm ${
          filters.status === "ALL"
            ? "bg-white/10 text-white"
            : "text-white/40"
        }`}
      >
        All
      </button>

      <button
        onClick={() => onChange({ status: "DOWN" })}
        className={`px-3 py-1 rounded-md text-sm ${
          filters.status === "DOWN"
            ? "bg-rose-500/20 text-rose-400"
            : "text-white/40"
        }`}
      >
        Down
      </button>

      <button
        onClick={() => onChange({ status: "UP" })}
        className={`px-3 py-1 rounded-md text-sm ${
          filters.status === "UP"
            ? "bg-emerald-500/20 text-emerald-400"
            : "text-white/40"
        }`}
      >
        UP
      </button>
    </div>
  );
}
export function SystemSkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 animate-pulse space-y-4">
      <div className="h-4 w-1/3 bg-white/10 rounded" />
      <div className="h-3 w-2/3 bg-white/10 rounded" />
      <div className="flex items-center justify-between pt-4">
        <div className="h-5 w-20 bg-white/10 rounded-full" />
        <div className="h-3 w-16 bg-white/10 rounded" />
      </div>
    </div>
  );
}
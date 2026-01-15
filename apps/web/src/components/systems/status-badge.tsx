import { SYSTEM_STATUS_META } from "@/constants/system-status";

type Status = keyof typeof SYSTEM_STATUS_META;

export function StatusBadge({ status }: { status: Status }) {
  const safeStatus = status ?? "UNKNOWN";
  const meta = SYSTEM_STATUS_META[safeStatus];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${meta.wrapper}`}
    >
      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

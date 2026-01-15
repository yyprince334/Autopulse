export function SeverityBadge({ severity }: { severity: string }) {
    const styles = {
      LOW: "bg-sky-500/10 text-sky-400",
      MEDIUM: "bg-amber-500/10 text-amber-400",
      HIGH: "bg-orange-500/10 text-orange-400",
      CRITICAL: "bg-rose-500/10 text-rose-400",
    };
  
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          styles[severity as keyof typeof styles]
        }`}
      >
        {severity}
      </span>
    );
  }
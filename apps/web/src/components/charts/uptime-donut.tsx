"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export function UptimeDonut({
  uptimeSeconds,
  downtimeSeconds,
  availabilityPct,
  rangeLabel,
}: {
  uptimeSeconds: number;
  downtimeSeconds: number;
  availabilityPct: number;
  rangeLabel: string;
}) {
  // --------- Empty state ---------
  if (uptimeSeconds === 0 && downtimeSeconds === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-[380px] flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-white/40 text-sm">No availability data for this period</p>
      </div>
    );
  }

  // --------- Real data ---------
  const data = [
    { name: "Uptime", value: uptimeSeconds },
    { name: "Downtime", value: downtimeSeconds || 0.0001 },
  ];

  const totalSeconds = uptimeSeconds + downtimeSeconds;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const seconds = payload[0].value;
      const percentage = ((seconds / totalSeconds) * 100).toFixed(2);
      const name = payload[0].name;
      
      return (
        <div className="rounded-lg border border-white/20 bg-black/90 backdrop-blur-sm px-3 py-2">
          <p className="text-white font-medium text-sm">{name}</p>
          <p className="text-white/60 text-xs mt-1">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-10 hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1.5 tracking-tight">
          Availability
        </h2>
        <p className="text-sm text-white/50">{rangeLabel}</p>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col items-center">
        <div className="relative mb-10">
          {/* Glow effect behind chart */}
          <div className="absolute inset-0 bg-green-400/10 blur-3xl rounded-full scale-75" />
          
          <PieChart width={300} height={300}>
            <defs>
              <linearGradient id="uptimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={1} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="downtimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            
            <Tooltip content={<CustomTooltip />} />
            
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={95}
              outerRadius={120}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={2}
            >
              <Cell fill="url(#uptimeGradient)" />
              <Cell fill="url(#downtimeGradient)" />
            </Pie>
            
            {/* Center percentage */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-bold"
              style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
            >
              {availabilityPct}%
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              className="fill-white/40 uppercase tracking-wider"
              style={{ fontSize: '12px', fontWeight: 500 }}
            >
              uptime
            </text>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500" />
            <span className="text-sm text-white/60 font-medium">Uptime</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600" />
            <span className="text-sm text-white/60 font-medium">Downtime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
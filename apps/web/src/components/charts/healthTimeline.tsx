"use client";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HealthTimeline({
  data,
}: {
  data: { timestamp: string; availability: number }[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-10 hover:border-white/20 transition-all duration-300 h-[380px] flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-white/40 text-sm">No health data for this period</p>
      </div>
    );
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const timestamp = new Date(label).toLocaleString();
      
      return (
        <div className="rounded-lg border border-white/20 bg-black/90 backdrop-blur-sm px-3 py-2">
          <p className="text-white/60 text-xs mb-1">{timestamp}</p>
          <p className="text-white font-medium text-sm">{value}% availability</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-10 hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-1.5 tracking-tight">
          Health Timeline
        </h2>
        <p className="text-sm text-white/50">Availability over time</p>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={false} 
              stroke="rgba(255, 255, 255, 0.1)" 
              strokeDasharray="3 3"
            />
            
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
              stroke="rgba(255, 255, 255, 0.4)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)' }} />
            
            <Area
              type="monotone"
              dataKey="availability"
              stroke="#4ade80"
              strokeWidth={3}
              fill="url(#areaGradient)"
              activeDot={{ 
                r: 6, 
                fill: "#4ade80",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
"use client";

import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TrendPoint {
  date: string;
  positive: number;
}

interface SentimentTrendsProps {
  data: TrendPoint[];
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-xs">
      <p className="text-[#94A3B8] mb-1">{label}</p>
      <p className="text-blue-400 font-semibold">{payload[0]?.value}% positive</p>
    </div>
  );
}

export function SentimentTrends({ data }: SentimentTrendsProps) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 flex-1">
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">
        Sentiment Trends (30-day)
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[50, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={70}
            stroke="#334155"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="positive"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#blueGradient)"
            dot={{ fill: "#3B82F6", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#3B82F6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";

import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

interface TrendPoint {
  month: string;
  rating: number;
}

interface RatingTrendProps {
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
      <p className="text-blue-400 font-semibold">{payload[0]?.value} ★</p>
    </div>
  );
}

export function RatingTrend({ data }: RatingTrendProps) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">Rating Trend</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[3, 5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rating"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#ratingGradient)"
            dot={{ fill: "#3B82F6", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#3B82F6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
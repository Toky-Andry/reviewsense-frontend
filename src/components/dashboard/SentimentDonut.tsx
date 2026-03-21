"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SentimentDonutProps {
  positive: number;
  neutral: number;
  negative: number;
}

const COLORS = {
  positive: "#3B82F6",
  neutral: "#94A3B8",
  negative: "#EF4444",
};

export function SentimentDonut({ positive, neutral, negative }: SentimentDonutProps) {
  const data = [
    { name: "Positive", value: positive, color: COLORS.positive },
    { name: "Neutral",  value: neutral,  color: COLORS.neutral },
    { name: "Negative", value: negative, color: COLORS.negative },
  ];

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">
        Sentiment Distribution
      </h3>

      <div className="relative flex items-center justify-center" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-[#F8FAFC]">{positive}%</span>
          <span className="text-xs text-[#94A3B8] uppercase tracking-wider mt-0.5">
            Positive
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-xs text-[#94A3B8]">Pos ({positive}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          <span className="text-xs text-[#94A3B8]">Neu ({neutral}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-xs text-[#94A3B8]">Neg ({negative}%)</span>
        </div>
      </div>
    </div>
  );
}
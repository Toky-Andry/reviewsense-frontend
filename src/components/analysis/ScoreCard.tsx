"use client";

import { Share2, FileText, BadgeCheck, TrendingUp } from "lucide-react";

interface ScoreCardProps {
  storeName: string;
  score: number;
  trend: number;
  status: string;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreCard({ storeName, score, trend, status }: ScoreCardProps) {
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 flex items-center gap-6">
      {/* Store avatar */}
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center shrink-0">
        <span className="text-2xl font-black text-blue-400">
          {storeName.charAt(0)}
        </span>
      </div>

      {/* Store info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-[#F8FAFC] truncate">{storeName}</h1>
          {status === "COMPLETED" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
              <BadgeCheck size={10} />
              VERIFIED
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-[#94A3B8] font-medium px-2 py-1 rounded hover:bg-[#334155] transition-colors">
            Current
          </button>
          <button className="text-xs font-bold px-2 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
            COMPARE +{trend}%
          </button>
        </div>
      </div>

      {/* Score ring */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
          Overall Score
        </p>
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg width={96} height={96} className="-rotate-90">
            <circle cx={48} cy={48} r={RADIUS} fill="none" stroke="#334155" strokeWidth={8} />
            <circle
              cx={48} cy={48} r={RADIUS}
              fill="none"
              stroke="#10B981"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute flex items-baseline gap-0.5">
            <span className="text-2xl font-black text-[#F8FAFC]">{score}</span>
            <span className="text-xs text-[#94A3B8]">/100</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#475569] text-sm font-medium transition-colors">
          <Share2 size={14} />
          Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
          <FileText size={14} />
          Export PDF
        </button>
      </div>
    </div>
  );
}
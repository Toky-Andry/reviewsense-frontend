import { CheckCircle2, AlertCircle } from "lucide-react";

interface StrengthsProblemsProps {
  strengths: string[];
  problems: string[];
}

export function StrengthsProblems({ strengths, problems }: StrengthsProblemsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Strengths */}
      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={14} className="text-green-400" />
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
            Top Strengths
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {strengths.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <CheckCircle2 size={14} className="text-green-500 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Problems */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={14} className="text-red-400" />
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
            Key Problems
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {problems.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <AlertCircle size={14} className="text-red-500 shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import { Sparkles } from "lucide-react";

interface AISummaryProps {
  summary: string;
}

export function AISummary({ summary }: AISummaryProps) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-blue-500/20">
          <Sparkles size={14} className="text-blue-400" />
        </div>
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          AI Insights Summary
        </span>
      </div>
      {/* Text */}
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        {summary.split(/(\+\d+%|\b[A-Z][A-Z]+\b)/).map((part, i) => {
          if (/\+\d+%/.test(part)) {
            return <span key={i} className="text-blue-400 font-bold">{part}</span>;
          }
          return part;
        })}
      </p>
    </div>
  );
}
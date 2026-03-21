import { Sparkles } from "lucide-react";

export function AIInsight() {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-purple-400" />
        <span className="text-sm font-bold text-purple-400">AI Data Insight</span>
      </div>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        &ldquo;Compared to Q2, customer sentiment regarding &lsquo;Pricing&rsquo; has
        improved by 12% following the new subscription tier rollout. Include this
        in your stakeholder presentation.&rdquo;
      </p>
      <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
        Apply to current report
      </button>
    </div>
  );
}
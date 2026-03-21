import { Lightbulb, Rocket } from "lucide-react";

interface RecommendedActionsProps {
  actions: string[];
}

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  return (
    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={14} className="text-blue-400" />
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          Actions
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {actions.map((action) => (
          <li key={action} className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Rocket size={13} className="text-blue-400 shrink-0" />
            {action}
          </li>
        ))}
      </ul>
    </div>
  );
}
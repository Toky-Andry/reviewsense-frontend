import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
  { initials: "SM", color: "bg-orange-400" },
  { initials: "JK", color: "bg-blue-500"   },
  { initials: "AL", color: "bg-purple-500" },
];

export function ShareWithTeam() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      <h3 className="text-base font-semibold text-[#F8FAFC] mb-4">
        Share with Team
      </h3>
      <div className="flex items-center gap-2">
        {/* Avatar stack */}
        <div className="flex -space-x-2">
          {TEAM_MEMBERS.map(({ initials, color }) => (
            <div
              key={initials}
              className={cn(
                "w-9 h-9 rounded-full border-2 border-[#1E293B] flex items-center justify-center text-white text-xs font-bold",
                color
              )}
            >
              {initials}
            </div>
          ))}
        </div>

        {/* Count badge */}
        <div className="w-9 h-9 rounded-full bg-[#334155] border-2 border-[#1E293B] flex items-center justify-center text-xs font-bold text-[#94A3B8]">
          +12
        </div>

        {/* Add button */}
        <button className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors ml-1">
          <Plus size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
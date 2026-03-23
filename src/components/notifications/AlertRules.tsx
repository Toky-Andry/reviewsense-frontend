"use client";

import { useState } from "react";
import { TrendingDown, Star, Trophy, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertRule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  active: boolean;
}

const INITIAL_RULES: AlertRule[] = [
  {
    id: "1",
    title: "Negative spike alert",
    description: "Notify when > 20% negative reviews in 24h",
    icon: TrendingDown,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    active: true,
  },
  {
    id: "2",
    title: "Score drop alert",
    description: "Notify when score < 70/100",
    icon: Star,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    active: true,
  },
  {
    id: "3",
    title: "Review milestone",
    description: "Notify every 500 new reviews",
    icon: Trophy,
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-500",
    active: false,
  },
];

export function AlertRules() {
  const [rules, setRules] = useState(INITIAL_RULES);

  const toggleRule = (id: string) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#F8FAFC]">Alert Rules</h3>
        <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
          View All Rules
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            whileHover={{ y: -2 }}
            className={cn(
              "bg-[#1E293B] border rounded-2xl p-5 relative overflow-hidden transition-all",
              rule.active ? "border-[#334155]" : "border-[#334155] opacity-60"
            )}
          >
            {/* Active dot */}
            <div className="absolute top-3 right-3">
              <span className={cn(
                "flex h-2 w-2 rounded-full",
                rule.active
                  ? "bg-green-500 ring-4 ring-green-500/20"
                  : "bg-slate-500 ring-4 ring-slate-500/20"
              )} />
            </div>

            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              rule.iconBg, rule.iconColor
            )}>
              <rule.icon size={20} />
            </div>

            {/* Content */}
            <h4 className="font-bold text-[#F8FAFC] mb-1">{rule.title}</h4>
            <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
              {rule.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              {/* Toggle badge */}
              <button
                onClick={() => toggleRule(rule.id)}
                className={cn(
                  "text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors",
                  rule.active
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    : "bg-slate-500/10 text-slate-400 hover:bg-slate-500/20"
                )}
              >
                {rule.active ? "Active" : "Inactive"}
              </button>

              {/* Action icons */}
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] transition-colors">
                  <Pencil size={14} />
                </button>
                <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
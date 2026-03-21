"use client";

import { type LucideIcon, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  isPendingAlerts?: boolean;
  onClick?: () => void;
  extra?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = "bg-blue-500/20 text-blue-400",
  isPendingAlerts = false,
  onClick,
  extra,
}: MetricCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "bg-[#1E293B] border border-[#334155] rounded-xl p-5 flex flex-col gap-3 transition-all duration-200",
        onClick ? "cursor-pointer hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5" : ""
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={cn("p-2.5 rounded-lg", iconColor)}>
          <Icon size={18} />
        </div>
        {isPendingAlerts ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400">
            <AlertTriangle size={11} />
            Action Required
          </span>
        ) : trend !== undefined ? (
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
            isPositive ? "bg-green-500/20 text-green-400"
            : isNegative ? "bg-red-500/20 text-red-400"
            : "bg-slate-500/20 text-slate-400"
          )}>
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : null}
            {isPositive ? "+" : ""}{trend}%
          </span>
        ) : null}
      </div>

      {/* Value */}
      <div>
        <p className="text-2xl font-bold text-[#F8FAFC] tabular-nums">{value}</p>
        <p className="text-sm text-[#94A3B8] mt-0.5">{title}</p>
      </div>

      {/* Extra content */}
      {extra && <div>{extra}</div>}
    </motion.div>
  );
}
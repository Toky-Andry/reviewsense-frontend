import { type LucideIcon, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  isPendingAlerts?: boolean;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = "bg-blue-500/20 text-blue-400",
  isPendingAlerts = false,
  onClick,
}: MetricCardProps) {
  const hasTrend = trend !== undefined;
  const isPositive = hasTrend && trend > 0;
  const isNegative = hasTrend && trend < 0;

  const displayValue =
    typeof value === "number" ? formatNumber(value) : value;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-5 rounded-xl border bg-[#1E293B] border-[#334155]",
        "transition-all duration-200",
        onClick
          ? "cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
          : ""
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-lg", iconColor)}>
          <Icon size={18} />
        </div>

        {isPendingAlerts ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400">
            <AlertTriangle size={11} />
            Action Required
          </span>
        ) : hasTrend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
              isPositive ? "bg-green-500/20 text-green-400"
              : isNegative ? "bg-red-500/20 text-red-400"
              : "bg-slate-500/20 text-slate-400"
            )}
          >
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : null}
            {isPositive ? "+" : ""}{trend?.toFixed(1)}%
          </span>
        ) : null}
      </div>

      <p className="text-2xl font-bold text-[#F8FAFC] tabular-nums">{displayValue}</p>
      <p className="mt-1 text-sm text-[#94A3B8]">{title}</p>
    </div>
  );
}
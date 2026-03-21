import { cn } from "@/lib/utils";

type BadgeVariant =
  | "positive" | "negative" | "neutral"
  | "completed" | "processing" | "failed"
  | "active" | "inactive";

interface BadgeCustomProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  positive:   "bg-green-500/20 text-green-400 border border-green-500/30",
  negative:   "bg-red-500/20 text-red-400 border border-red-500/30",
  neutral:    "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  completed:  "bg-green-500/20 text-green-400 border border-green-500/30",
  processing: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  failed:     "bg-red-500/20 text-red-400 border border-red-500/30",
  active:     "bg-green-500/20 text-green-400 border border-green-500/30",
  inactive:   "bg-slate-500/20 text-slate-400 border border-slate-500/30",
};

export function BadgeCustom({ variant, children, className }: BadgeCustomProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {variant === "processing" && (
        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
      )}
      {children}
    </span>
  );
}
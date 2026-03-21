import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

/** Merges Tailwind classes safely */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** 12450 → "12,450" */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** ISO date → "Oct 24, 2023" */
export function formatDate(date: string): string {
  return format(new Date(date), "MMM dd, yyyy");
}

/** ISO date → "2 min ago" */
export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/** Score → text color class */
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-orange-400";
  return "text-red-400";
}

/** Score → background color class */
export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-500/20";
  if (score >= 60) return "bg-orange-500/20";
  return "bg-red-500/20";
}

/** Sentiment → hex color */
export function getSentimentColor(sentiment: string): string {
  const map: Record<string, string> = {
    POSITIVE: "#10B981",
    NEUTRAL: "#94A3B8",
    NEGATIVE: "#EF4444",
  };
  return map[sentiment] ?? "#94A3B8";
}

/** Sentiment → badge variant */
export function getSentimentBadgeVariant(
  sentiment: string
): "positive" | "neutral" | "negative" {
  const map: Record<string, "positive" | "neutral" | "negative"> = {
    POSITIVE: "positive",
    NEUTRAL: "neutral",
    NEGATIVE: "negative",
  };
  return map[sentiment] ?? "neutral";
}

/** Truncate text with ellipsis */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/** Trend value → color class */
export function calculateTrendColor(trend: number): string {
  if (trend > 0) return "text-green-400";
  if (trend < 0) return "text-red-400";
  return "text-slate-400";
}
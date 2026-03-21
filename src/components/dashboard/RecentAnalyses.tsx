"use client";

import { useRouter } from "next/navigation";
import { Eye, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Analysis {
  id: string;
  store: string;
  rating: number;
  status: "COMPLETED" | "PROCESSING" | "FAILED";
}

interface RecentAnalysesProps {
  analyses: Analysis[];
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500",
    "bg-orange-500", "bg-pink-500", "bg-cyan-500",
  ];
  return colors[name.charCodeAt(0) % colors.length] ?? "bg-blue-500";
}

export function RecentAnalyses({ analyses }: RecentAnalysesProps) {
  const router = useRouter();

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
        <h3 className="text-sm font-semibold text-[#F8FAFC]">Recent Analyses</h3>
        <button
          onClick={() => router.push("/analyses")}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          View All
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_120px_140px_60px] px-6 py-2.5 border-b border-[#334155]">
        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
          Source / Brand
        </span>
        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
          Rating
        </span>
        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
          Status
        </span>
        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider text-right">
          Actions
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#334155]">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="grid grid-cols-[1fr_120px_140px_60px] px-6 py-4 hover:bg-[#0F172A]/40 transition-colors items-center"
          >
            {/* Store */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0",
                getAvatarColor(analysis.store)
              )}>
                {getInitials(analysis.store)}
              </div>
              <span className="text-sm font-medium text-[#F8FAFC] truncate">
                {analysis.store}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-[#F8FAFC]">
                {analysis.rating.toFixed(1)}
              </span>
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
            </div>

            {/* Status */}
            <div>
              {analysis.status === "COMPLETED" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Completed
                </span>
              )}
              {analysis.status === "PROCESSING" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                  <Loader2 size={10} className="animate-spin" />
                  Processing
                </span>
              )}
              {analysis.status === "FAILED" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Failed
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={() => router.push(`/analyses/${analysis.id}`)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] transition-colors"
              >
                <Eye size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
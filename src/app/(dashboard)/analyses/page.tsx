"use client";

import { useRouter } from "next/navigation";
import { Plus, Search, Trash2, ExternalLink } from "lucide-react";
import { ScoreRing } from "@/components/ui/score-ring";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { useDeleteAnalysis } from "@/hooks/useAnalysis";
import { MOCK_DATA, SOURCES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { AnalysisStatus } from "@/types/analysis";

function getStatusVariant(status: AnalysisStatus) {
  return { COMPLETED: "completed", PROCESSING: "processing", FAILED: "failed" }[status] as
    "completed" | "processing" | "failed";
}

export default function AnalysesPage() {
  const router = useRouter();
  const { mutate: deleteAnalysis } = useDeleteAnalysis();
  const analyses = MOCK_DATA.analyses;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Analyses</h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {analyses.length} store{analyses.length !== 1 ? "s" : ""} analyzed
          </p>
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          New Analysis
        </button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Search by store name..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Analysis cards */}
      <div className="grid gap-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 hover:border-[#475569] transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Score or status */}
              <div className="shrink-0 flex items-center justify-center w-14 h-14">
                {analysis.score !== undefined ? (
                  <ScoreRing score={analysis.score} size={56} strokeWidth={6} />
                ) : (
                  <BadgeCustom variant={getStatusVariant(analysis.status)}>
                    {analysis.status}
                  </BadgeCustom>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[#F8FAFC]">{analysis.storeName}</h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {SOURCES[analysis.source]?.label} · {analysis.totalReviews.toLocaleString()} reviews · {formatDate(analysis.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {analysis.status === "COMPLETED" && (
                      <button
                        onClick={() => router.push(`/analyses/${analysis.id}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
                      >
                        <ExternalLink size={12} />
                        View
                      </button>
                    )}
                    <button
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {analysis.aiSummary && (
                  <p className="mt-2 text-sm text-[#94A3B8] line-clamp-2">{analysis.aiSummary}</p>
                )}

                {analysis.status === "COMPLETED" && (
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-[#94A3B8]">{analysis.positiveCount} positive</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="text-[#94A3B8]">{analysis.neutralCount} neutral</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-[#94A3B8]">{analysis.negativeCount} negative</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
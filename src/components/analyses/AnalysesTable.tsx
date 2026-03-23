"use client";

import { useRouter } from "next/navigation";
import { Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisRow {
  id: string;
  store: string;
  source: string;
  date: string;
  reviews: number;
  score: number;
  trend: number;
  status: "COMPLETED" | "PROCESSING" | "FAILED";
}

interface AnalysesTableProps {
  data: AnalysisRow[];
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 65) return "text-blue-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
}

const STATUS_STYLES = {
  COMPLETED:  "bg-green-500/20 text-green-400 border-green-500/30",
  PROCESSING: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  FAILED:     "bg-red-500/20 text-red-400 border-red-500/30",
};

const COL_HEADERS = [
  "Store", "Source", "Date", "Reviews", "Score", "Trend", "Status", "Actions",
];

export function AnalysesTable({
  data, currentPage, totalPages, total, perPage, onPageChange,
}: AnalysesTableProps) {
  const router = useRouter();
  const from = (currentPage - 1) * perPage + 1;
  const to   = Math.min(currentPage * perPage, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
      {/* Table head */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px_80px_120px_100px] px-6 py-3 border-b border-[#334155]">
        {COL_HEADERS.map((h) => (
          <span
            key={h}
            className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#334155]">
        {data.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_80px_80px_120px_100px] px-6 py-4 hover:bg-[#0F172A]/40 transition-colors items-center"
          >
            {/* Store */}
            <span className="text-sm font-semibold text-[#F8FAFC]">
              {row.store}
            </span>

            {/* Source */}
            <span className="text-sm text-[#94A3B8]">{row.source}</span>

            {/* Date */}
            <span className="text-sm text-[#94A3B8] whitespace-pre-line">
              {row.date}
            </span>

            {/* Reviews */}
            <span className="text-sm text-[#94A3B8]">
              {row.reviews.toLocaleString()}
            </span>

            {/* Score */}
            <span className={cn("text-sm font-black", getScoreColor(row.score))}>
              {row.score}
            </span>

            {/* Trend */}
            <span
              className={cn(
                "text-sm font-bold",
                row.trend > 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {row.trend > 0 ? "+" : ""}{row.trend}%
            </span>

            {/* Status */}
            <div>
              <span className={cn(
                "inline-flex px-2.5 py-1 rounded text-[10px] font-bold border uppercase tracking-wider",
                STATUS_STYLES[row.status]
              )}>
                {row.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => row.status === "COMPLETED" && router.push(`/analyses/${row.id}`)}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  row.status === "COMPLETED"
                    ? "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155]"
                    : "text-[#334155] cursor-not-allowed"
                )}
                title="View analysis"
              >
                <Eye size={15} />
              </button>
              <button
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  row.status === "COMPLETED"
                    ? "text-[#94A3B8] hover:text-blue-400 hover:bg-blue-500/10"
                    : "text-[#334155] cursor-not-allowed"
                )}
                title="Download report"
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#334155]">
        <p className="text-sm text-[#94A3B8]">
          Showing{" "}
          <span className="font-bold text-[#F8FAFC]">{from}-{to}</span>
          {" "}of{" "}
          <span className="font-bold text-[#F8FAFC]">{total}</span>
          {" "}analyses
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "w-8 h-8 rounded-lg text-sm font-semibold transition-colors",
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155]"
              )}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
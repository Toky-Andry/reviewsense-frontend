"use client";

import { useRouter } from "next/navigation";
import { FileText, Download, ExternalLink } from "lucide-react";

const MOCK_REPORTS = [
  {
    id: "1",
    title: "Executive Summary Q3",
    analysisName: "EcoEssentials.com",
    date: "Oct 12, 2023",
    status: "SUCCESS",
  },
  {
    id: "2",
    title: "Performance Audit Q2",
    analysisName: "TechGadgets Pro",
    date: "Jul 05, 2023",
    status: "SUCCESS",
  },
  {
    id: "3",
    title: "Market Research Q1",
    analysisName: "HomeDecor Studio",
    date: "Apr 02, 2023",
    status: "EXPIRED",
  },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Reports</h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {MOCK_REPORTS.length} reports generated
          </p>
        </div>
      </div>

      {/* Reports list */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        {/* Table head */}
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-3 border-b border-[#334155]">
          {["Report", "Analysis", "Date", "Status", "Actions"].map((h) => (
            <span key={h} className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#334155]">
          {MOCK_REPORTS.map((report) => (
            <div
              key={report.id}
              className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-4 hover:bg-[#0F172A]/40 transition-colors items-center"
            >
              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText size={14} className="text-blue-400" />
                </div>
                <span className="text-sm font-medium text-[#F8FAFC]">
                  {report.title}
                </span>
              </div>

              {/* Analysis name */}
              <span className="text-sm text-[#94A3B8]">{report.analysisName}</span>

              {/* Date */}
              <span className="text-sm text-[#94A3B8]">{report.date}</span>

              {/* Status */}
              <span className={`text-xs font-bold uppercase tracking-wider ${
                report.status === "SUCCESS" ? "text-green-400" : "text-orange-400"
              }`}>
                {report.status}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/reports/${report.id}`)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] transition-colors"
                  title="View report"
                >
                  <ExternalLink size={14} />
                </button>
                <button
                  className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                  title="Download"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
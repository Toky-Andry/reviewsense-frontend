"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const REPORTS = [
  { name: "Executive Summary Q3", date: "Oct 12, 2023", status: "SUCCESS"  },
  { name: "Performance Audit Q2", date: "Jul 05, 2023", status: "SUCCESS"  },
  { name: "Market Research Q1",   date: "Apr 02, 2023", status: "EXPIRED"  },
];

export function ReportHistory() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#334155]">
        <h3 className="text-sm font-semibold text-[#F8FAFC]">Report History</h3>
      </div>

      {/* Table head */}
      <div className="grid grid-cols-[2fr_1fr_1fr_80px] px-6 py-2.5 border-b border-[#334155]">
        {["Report Name", "Date", "Status", "Actions"].map((h) => (
          <span key={h} className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#334155]">
        {REPORTS.map((report) => (
          <div
            key={report.name}
            className="grid grid-cols-[2fr_1fr_1fr_80px] px-6 py-4 hover:bg-[#0F172A]/40 transition-colors items-center"
          >
            <span className="text-sm text-[#F8FAFC] font-medium">
              {report.name}
            </span>
            <span className="text-sm text-[#94A3B8]">{report.date}</span>
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              report.status === "SUCCESS" ? "text-green-400" : "text-orange-400"
            )}>
              {report.status}
            </span>
            <div className="flex justify-end">
              <button className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
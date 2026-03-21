"use client";

import { useState } from "react";
import { Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function ScheduledReports() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#F8FAFC]">
          Scheduled Reports
        </h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
          ACTIVE
        </span>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-[#F8FAFC]">
            Auto-send weekly report
          </p>
          <p className="text-xs text-[#94A3B8]">Email to stakeholders automatically</p>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
            enabled ? "bg-blue-600" : "bg-[#334155]"
          }`}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
            style={{ left: enabled ? "calc(100% - 1.375rem)" : "0.125rem" }}
          />
        </button>
      </div>

      {/* Schedule info */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Calendar size={14} className="text-[#475569]" />
          Every Monday at 9:00 AM
        </div>
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Mail size={14} className="text-[#475569]" />
          team@company.com{" "}
          <span className="text-blue-400 font-medium">+3 more</span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-2.5 rounded-lg bg-[#0F172A] border border-[#334155] text-sm font-semibold text-[#F8FAFC] hover:border-[#475569] transition-colors">
        Manage Schedule
      </button>
    </div>
  );
}
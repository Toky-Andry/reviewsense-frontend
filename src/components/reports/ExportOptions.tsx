"use client";

import { useState } from "react";
import { ChevronDown, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const EXPORT_OPTIONS = [
  { id: "full",      label: "Full Data Analysis"    },
  { id: "raw",       label: "Raw Customer Reviews"  },
  { id: "executive", label: "Executive Summary"     },
];

export function ExportOptions() {
  const [checked, setChecked] = useState({
    full: true, raw: true, executive: true,
  });

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      <h3 className="text-base font-semibold text-[#F8FAFC] mb-4">
        Export Options
      </h3>

      {/* Format dropdown */}
      <div className="mb-4">
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">
          File Format
        </p>
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#0F172A] border border-[#334155] text-sm text-[#F8FAFC] hover:border-[#475569] transition-colors">
          PDF Document (.pdf)
          <ChevronDown size={16} className="text-[#94A3B8]" />
        </button>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-3">
        {EXPORT_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors text-left"
          >
            <div className={cn(
              "w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0",
              checked[id as keyof typeof checked]
                ? "bg-blue-600 border-blue-600"
                : "bg-transparent border-[#475569]"
            )}>
              {checked[id as keyof typeof checked] && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
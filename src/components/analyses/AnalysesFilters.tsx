"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface AnalysesFiltersProps {
  onSearch: (val: string) => void;
  onSource: (val: string) => void;
  onStatus: (val: string) => void;
  onSort:   (val: string) => void;
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-sm text-[#F8FAFC] hover:border-[#475569] transition-colors whitespace-nowrap"
      >
        {label}: <span className="font-semibold">{value}</span>
        <ChevronDown size={14} className="text-[#94A3B8]" />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl min-w-[120px] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#0F172A] hover:text-[#F8FAFC] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AnalysesFilters({
  onSearch, onSource, onStatus, onSort,
}: AnalysesFiltersProps) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort,   setSort]   = useState("Date");

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value); }}
          placeholder="Search stores or sources..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-sm text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex items-center gap-2">
        <FilterDropdown
          label="Source"
          options={["All", "Amazon", "Trustpilot", "Google", "Shopify"]}
          value={source}
          onChange={(v) => { setSource(v); onSource(v); }}
        />
        <FilterDropdown
          label="Status"
          options={["All", "Completed", "Processing", "Failed"]}
          value={status}
          onChange={(v) => { setStatus(v); onStatus(v); }}
        />
        <FilterDropdown
          label="Sort"
          options={["Date", "Score", "Reviews", "Trend"]}
          value={sort}
          onChange={(v) => { setSort(v); onSort(v); }}
        />
      </div>
    </div>
  );
}
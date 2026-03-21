"use client";

import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (val: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-slate-500"}`}>
        Monthly
      </span>

      <button
        onClick={() => onToggle(!isYearly)}
        className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-800 p-1 transition-colors"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block h-6 w-6 rounded-full bg-white shadow-sm"
          style={{ x: isYearly ? 24 : 0 }}
        />
      </button>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${isYearly ? "text-white" : "text-slate-500"}`}>
          Yearly
        </span>
        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/20">
          -20%
        </span>
      </div>
    </div>
  );
}
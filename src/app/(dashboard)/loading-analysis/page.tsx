"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2, Loader2, Circle,
  Clock, XCircle, BarChart2,
} from "lucide-react";

const STEPS = [
  { label: "Connected to Amazon",           done: true,    active: false },
  { label: "Fetched 1,248 reviews",          done: true,    active: false },
  { label: "Running AI sentiment analysis",  done: false,   active: true  },
  { label: "Generating report",              done: false,   active: false },
];

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 67;
const STROKE_OFFSET = CIRCUMFERENCE * (1 - PROGRESS / 100);

export default function LoadingAnalysisPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(18);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Animate progress number
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= PROGRESS) { clearInterval(timer); return PROGRESS; }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-redirect after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/analyses/mock-1");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-full bg-[#0F172A]">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <BarChart2 size={16} className="text-blue-400" />
          </div>
          <span className="text-[#F8FAFC] font-bold">Loading Analysis</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] text-xs">Auto-redirects to results</span>
          <div className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center">
            <Clock size={14} className="text-[#94A3B8]" />
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-6">

        {/* Progress bar */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-[#F8FAFC] text-sm font-semibold">Step 2 of 3</span>
            <span className="text-[#F8FAFC] text-sm font-bold">{PROGRESS}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#334155] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PROGRESS}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
          <p className="text-[#94A3B8] text-xs">
            {PROGRESS}% of analysis sequence completed
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center text-center gap-8">

          {/* Circular progress ring */}
          <div className="relative flex items-center justify-center">
            <svg
              width={192}
              height={192}
              className="-rotate-90"
            >
              {/* Background track */}
              <circle
                cx={96}
                cy={96}
                r={RADIUS}
                fill="transparent"
                stroke="#334155"
                strokeWidth={12}
              />
              {/* Progress arc */}
              <motion.circle
                cx={96}
                cy={96}
                r={RADIUS}
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: STROKE_OFFSET }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#F8FAFC]">
                {displayProgress}%
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mt-0.5">
                Progress
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">
              Analyzing your reviews...
            </h1>
            <p className="text-[#94A3B8] text-lg">
              Processing{" "}
              <span className="text-blue-400 font-bold">1,248 reviews</span>{" "}
              from{" "}
              <span className="underline decoration-blue-400/30">
                EcoEssentials.com
              </span>
            </p>
          </div>

          {/* Steps list */}
          <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <ul className="space-y-4 text-left">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-center gap-3">
                  {step.done ? (
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-green-400" />
                    </div>
                  ) : step.active ? (
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <Loader2 size={16} className="text-blue-400 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded border-2 border-[#475569] shrink-0 opacity-40" />
                  )}
                  <span
                    className={`text-sm ${
                      step.done
                        ? "text-slate-300 font-medium"
                        : step.active
                        ? "text-[#F8FAFC] font-bold"
                        : "text-[#475569] font-medium"
                    }`}
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer info */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[#94A3B8] text-sm flex items-center gap-2">
              <Clock size={14} />
              Estimated time: ~{seconds} seconds
            </p>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => router.push("/dashboard")}
                className="min-w-[160px] rounded-lg border-2 border-red-500/50 hover:bg-red-500/10 text-red-400 px-6 py-2.5 text-sm font-bold transition-all uppercase tracking-wide"
              >
                Cancel Analysis
              </button>
              <span className="text-[10px] text-[#475569]">
                Redirects to Dashboard
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#334155] flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {["shield", "check", "cloud"].map((icon) => (
              <div
                key={icon}
                className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
              >
                <CheckCircle2 size={14} className="text-blue-400/40" />
              </div>
            ))}
          </div>
          <p className="text-xs text-[#475569]">
            © 2024 ReviewSense AI. All data encrypted.
          </p>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Package, Star,
  MessageSquare, BarChart2, Calendar,
  ShieldCheck, Rocket, Clock,
} from "lucide-react";
import { z } from "zod";


const urlSchema = z.url("Please enter a valid URL (include https://)");

const STEPS = ["Connect Store", "Configure Analysis", "Review Results"];

const PLATFORMS = [
  { name: "Shopify",    color: "bg-green-500",  icon: ShoppingBag },
  { name: "Amazon",     color: "bg-orange-500", icon: Package },
  { name: "Trustpilot", color: "bg-green-600",  icon: Star },
];

const WHAT_WE_ANALYZE = [
  { label: "Customer Reviews",    icon: MessageSquare },
  { label: "Star Ratings",        icon: Star },
  { label: "Review Dates",        icon: Calendar },
  { label: "Verified Purchases",  icon: ShieldCheck },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [storeUrl, setStoreUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    const result = urlSchema.safeParse(storeUrl);
    if (!result.success) {
      setError("Please enter a valid URL (include https://)");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => router.push("/loading-analysis"), 300);
  };

  const handlePlatform = (platform: string) => {
    setStoreUrl(`https://${platform.toLowerCase()}.com/yourstore`);
    setError("");
  };

  return (
    <div className="min-h-full bg-[#0F172A]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h2 className="text-[#F8FAFC] text-base font-bold absolute left-1/2 -translate-x-1/2">
          Onboarding Step 1
        </h2>
      </div>

      <div className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                Current Progress
              </p>
              <p className="text-[#F8FAFC] text-2xl font-bold">Step 1 of 3</p>
            </div>
            <p className="text-[#94A3B8] text-base font-medium">33% Complete</p>
          </div>
          <div className="h-3 w-full rounded-full bg-[#334155] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>
        </motion.div>

        {/* Step tabs */}
        <div className="grid grid-cols-3 gap-1 border-b border-[#334155]">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center justify-center py-3 border-b-2 transition-colors ${
                i === 0
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-[#475569]"
              }`}
            >
              <span className="text-sm font-bold">
                {i + 1}. {step}
              </span>
            </div>
          ))}
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 lg:p-12 shadow-2xl flex flex-col gap-8"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">
              Connect your store
            </h1>
            <p className="text-[#94A3B8]">
              Sync your e-commerce data to start the reputation analysis.
            </p>
          </div>

          {/* URL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Enter store URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#94A3B8] font-medium text-sm pointer-events-none">
                https://
              </span>
              <input
                value={storeUrl.replace("https://", "")}
                onChange={(e) => {
                  setStoreUrl("https://" + e.target.value);
                  setError("");
                }}
                placeholder="yourstore.com"
                className={`w-full bg-[#0F172A] border rounded-lg py-4 pl-20 pr-4 text-[#F8FAFC] text-sm outline-none transition-all ${
                  error
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#334155] focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                }`}
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#334155]" />
            <span className="flex-shrink mx-4 text-xs font-bold text-[#475569] uppercase tracking-widest">
              Or connect directly
            </span>
            <div className="flex-grow border-t border-[#334155]" />
          </div>

          {/* Platform buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLATFORMS.map(({ name, color, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handlePlatform(name)}
                className="flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-[#334155] text-[#F8FAFC] font-semibold py-4 px-6 rounded-lg border border-[#334155] hover:border-[#475569] transition-all"
              >
                <div className={`w-6 h-6 ${color} rounded flex items-center justify-center shrink-0`}>
                  <Icon size={14} className="text-white" />
                </div>
                {name}
              </button>
            ))}
          </div>

          {/* What we analyze */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#475569] uppercase tracking-widest text-center">
              What we analyze
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {WHAT_WE_ANALYZE.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-[#0F172A]/50 p-4 rounded-lg border border-[#334155] flex flex-col items-center gap-2 text-center"
                >
                  <Icon size={20} className="text-blue-400" />
                  <span className="text-xs font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-5 rounded-lg shadow-lg shadow-blue-500/20 transition-all text-lg flex items-center justify-center gap-2"
            >
              {isLoading ? "Starting..." : "Start Analysis"}
              <Rocket size={20} />
            </button>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#94A3B8] text-sm flex items-center gap-2">
                <Clock size={14} />
                Analysis takes 30-60 seconds
              </p>
              <p className="text-[#475569] text-xs italic">
                Clicking start will redirect you to the configuration step.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer trust */}
        <div className="flex flex-col items-center gap-4 pb-8 opacity-50">
          <div className="flex items-center gap-2 text-[#94A3B8] text-sm font-medium">
            <ShieldCheck size={16} />
            TRUSTED BY 5,000+ E-COMMERCE STORES
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 w-32 bg-[#1E293B] rounded border border-[#334155] flex items-center justify-center"
              >
                <div className="h-3 w-20 bg-[#334155] rounded" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
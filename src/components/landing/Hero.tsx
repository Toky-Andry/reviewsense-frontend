"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Clock, Play, Link as LinkIcon } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export function Hero() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  return (
    <section className="py-16 md:py-24 flex flex-col items-center text-center">
      {/* Badge */}
      <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#833cf6]/10 border border-[#833cf6]/20 text-[#833cf6] text-xs font-bold mb-8 uppercase tracking-wider">
        <Sparkles size={14} />
        Powered by Advanced GPT-4
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.1)}
        className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight max-w-4xl mb-6"
      >
        Turn customer reviews into{" "}
        <span className="bg-gradient-to-r from-[#833cf6] to-[#3B82F6] bg-clip-text text-transparent">
          growth insights
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...fadeUp(0.2)}
        className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
      >
        AI-powered review analysis for e-commerce stores. Understand what your
        customers love and hate in seconds.
      </motion.p>

      {/* URL Input */}
      <motion.div {...fadeUp(0.3)} className="w-full max-w-2xl mb-6">
        <div className="relative flex items-center p-2 rounded-xl bg-slate-800/50 border border-slate-700 shadow-2xl focus-within:ring-2 focus-within:ring-[#833cf6]/50 transition-all">
          <LinkIcon size={18} className="text-slate-400 ml-3 shrink-0" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your Shopify or Amazon store link..."
            className="w-full bg-transparent border-none outline-none text-white placeholder:text-slate-500 px-3 py-3 text-sm"
          />
          <button
            onClick={() => router.push("/onboarding")}
            className="bg-[#833cf6] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#833cf6]/90 whitespace-nowrap transition-all shadow-lg shadow-[#833cf6]/30 shrink-0"
          >
            Analyze for free
          </button>
        </div>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        {...fadeUp(0.4)}
        className="flex items-center gap-6 text-slate-500 text-xs font-medium mb-16"
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle size={14} className="text-green-500" />
          No credit card required
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-green-500" />
          1-min analysis
        </div>
      </motion.div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative w-full max-w-5xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(131,60,246,0.15)] bg-slate-900 aspect-video relative group">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent z-10" />

          {/* Mock dashboard content */}
          <div className="w-full h-full bg-[#1E293B] p-6 flex flex-col gap-4">
            {/* Fake navbar */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 h-5 bg-slate-700/50 rounded ml-4" />
            </div>
            {/* Fake content */}
            <div className="grid grid-cols-4 gap-3">
              {["bg-blue-500/20", "bg-green-500/20", "bg-orange-500/20", "bg-purple-500/20"].map((c, i) => (
                <div key={i} className={`${c} rounded-xl p-3 h-16 flex flex-col justify-between`}>
                  <div className="w-8 h-2 bg-white/20 rounded" />
                  <div className="w-12 h-3 bg-white/30 rounded" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 flex-1">
              <div className="col-span-2 bg-slate-800/50 rounded-xl p-3">
                <div className="w-24 h-2 bg-white/20 rounded mb-3" />
                <div className="flex items-end gap-1 h-20">
                  {[40, 65, 45, 80, 60, 90, 70, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#833cf6]/40 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-3 flex flex-col gap-2">
                <div className="w-16 h-2 bg-white/20 rounded" />
                {[70, 20, 10].map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-slate-500" : "bg-red-500"}`} />
                    <div className="flex-1 h-1.5 bg-slate-700 rounded">
                      <div
                        className={`h-full rounded ${i === 0 ? "bg-green-500" : i === 1 ? "bg-slate-500" : "bg-red-500"}`}
                        style={{ width: `${v}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <button className="group flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-[#833cf6] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#833cf6]/50 group-hover:scale-110 transition-transform">
                <Play size={32} fill="white" />
              </div>
              <span className="text-white font-bold text-lg drop-shadow-md">
                Watch how it works
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
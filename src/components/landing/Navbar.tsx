"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export function LandingNavbar() {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[#0F172A]/80 border-b border-slate-800"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-[#833cf6]">
            <BarChart2 size={28} className="text-[#833cf6]" />
            <span className="text-white text-xl font-extrabold tracking-tight">
              ReviewSense
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Enterprise"].map((item) => (
              <Link
                key={item}
                href={item === "Pricing" ? "/pricing" : "#"}
                className="text-slate-300 hover:text-[#833cf6] text-sm font-semibold transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 rounded-lg border border-[#833cf6]/50 text-[#833cf6] hover:bg-[#833cf6]/10 text-sm font-bold transition-all"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/onboarding")}
              className="px-5 py-2 rounded-lg bg-[#833cf6] text-white hover:bg-[#833cf6]/90 text-sm font-bold shadow-lg shadow-[#833cf6]/20 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
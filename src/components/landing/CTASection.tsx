"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle } from "lucide-react";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-[#833cf6] via-[#833cf6]/80 to-blue-600 p-12 md:p-20 text-center relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sparkles decoration */}
        <div className="absolute top-8 left-12 text-white/20">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-8 right-12 text-white/20">
          <CheckCircle size={20} />
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 relative z-10">
          Ready to unlock your store potential?
        </h2>
        <p className="text-white/70 text-lg mb-10 relative z-10">
          Join thousands of e-commerce brands already using ReviewSense.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button
            onClick={() => router.push("/onboarding")}
            className="px-8 py-4 bg-white text-[#833cf6] font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl w-full sm:w-auto"
          >
            Get Started Now
          </button>
          <button
            onClick={() => router.push("/onboarding")}
            className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            Book a Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { PDFPreview }       from "@/components/reports/PDFPreview";
import { ExportOptions }    from "@/components/reports/ExportOptions";
import { ScheduledReports } from "@/components/reports/ScheduledReports";
import { AIInsight }        from "@/components/reports/AIInsight";
import { ShareWithTeam }    from "@/components/reports/ShareWithTeam";
import { ReportHistory }    from "@/components/reports/ReportHistory";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function ReportDetailPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      {/* Top bar */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/analyses/1")}
            className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            Back to Analysis
          </button>
          <h1 className="text-3xl font-black text-[#F8FAFC]">Report Export</h1>
        </div>

        {/* Action buttons */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#334155] text-[#F8FAFC] text-sm font-semibold hover:border-[#475569] transition-colors">
              <Share2 size={15} />
              Share report link
            </button>
            <span className="text-[10px] text-[#475569]">Generate public URL</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-purple-500/20">
              <Download size={15} />
              Download PDF Report
            </button>
            <span className="text-[10px] text-[#475569]">Redirects to P7 internal</span>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* Left — PDF preview + history */}
        <div className="flex flex-col gap-6">
          <motion.div {...fadeUp(0.1)}>
            <PDFPreview />
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <ReportHistory />
          </motion.div>
        </div>

        {/* Right — sidebar */}
        <div className="flex flex-col gap-4">
          <motion.div {...fadeUp(0.1)}>
            <ExportOptions />
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            <ScheduledReports />
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <AIInsight />
          </motion.div>
          <motion.div {...fadeUp(0.25)}>
            <ShareWithTeam />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
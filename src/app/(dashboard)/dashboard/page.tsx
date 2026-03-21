"use client";

import { useRouter } from "next/navigation";
import {
  MessageSquare, ThumbsUp, ThumbsDown,
  AlertTriangle, Plus, Calendar, ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SentimentDonut } from "@/components/dashboard/SentimentDonut";
import { SentimentTrends } from "@/components/dashboard/SentimentTrends";
import { RecentAnalyses } from "@/components/dashboard/RecentAnalyses";

const mockMetrics = {
  totalReviews: 12450,
  totalReviewsTrend: 5.2,
  positiveScore: 82,
  positiveScoreTrend: 2.1,
  negativeScore: 12,
  negativeScoreTrend: -0.5,
  pendingAlerts: 3,
};

const mockSentiment = { positive: 68, neutral: 20, negative: 12 };

const mockTrends = [
  { date: "01 May", positive: 62 },
  { date: "05 May", positive: 65 },
  { date: "10 May", positive: 70 },
  { date: "15 May", positive: 68 },
  { date: "20 May", positive: 75 },
  { date: "25 May", positive: 80 },
  { date: "30 May", positive: 68 },
];

const mockRecentAnalyses = [
  { id: "1", store: "Apple Store NYC",    rating: 4.8, status: "COMPLETED"  as const },
  { id: "2", store: "Whole Foods Market", rating: 3.9, status: "COMPLETED"  as const },
  { id: "3", store: "TechGadgets.io",     rating: 3.2, status: "PROCESSING" as const },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      {/* Page header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Review Overview</h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Real-time analysis of your digital reputation across all platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E293B] border border-[#334155] text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#475569] transition-colors">
            <Calendar size={14} />
            Last 30 Days
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => router.push("/onboarding")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            <Plus size={15} />
            New Analysis
          </button>
        </div>
      </motion.div>

      {/* Metric cards */}
      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          title="Total Reviews"
          value="12,450"
          trend={mockMetrics.totalReviewsTrend}
          icon={MessageSquare}
          iconColor="bg-blue-500/20 text-blue-400"
        />
        <MetricCard
          title="Positive Score"
          value={`${mockMetrics.positiveScore}%`}
          trend={mockMetrics.positiveScoreTrend}
          icon={ThumbsUp}
          iconColor="bg-green-500/20 text-green-400"
        />
        <MetricCard
          title="Negative Score"
          value={`${mockMetrics.negativeScore}%`}
          trend={mockMetrics.negativeScoreTrend}
          icon={ThumbsDown}
          iconColor="bg-red-500/20 text-red-400"
        />
        <MetricCard
          title="Pending Alerts"
          value={mockMetrics.pendingAlerts}
          icon={AlertTriangle}
          iconColor="bg-orange-500/20 text-orange-400"
          isPendingAlerts
          onClick={() => router.push("/notifications")}
          extra={
            <button
              onClick={(e) => { e.stopPropagation(); router.push("/notifications"); }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Notifications →
            </button>
          }
        />
      </motion.div>

      {/* Charts row */}
      <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <SentimentDonut {...mockSentiment} />
        </div>
        <div className="lg:col-span-2">
          <SentimentTrends data={mockTrends} />
        </div>
      </motion.div>

      {/* Recent analyses */}
      <motion.div {...fadeUp(0.3)}>
        <RecentAnalyses analyses={mockRecentAnalyses} />
      </motion.div>

    </div>
  );
}
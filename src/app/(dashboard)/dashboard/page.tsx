"use client";

import { useRouter } from "next/navigation";
import {
  MessageSquare, ThumbsUp, ThumbsDown,
  AlertTriangle, Plus, TrendingUp,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { MetricCard }      from "@/components/dashboard/MetricCard";
import { SentimentDonut }  from "@/components/dashboard/SentimentDonut";
import { SentimentTrends } from "@/components/dashboard/SentimentTrends";
import { RecentAnalyses }  from "@/components/dashboard/RecentAnalyses";
import { useGetDashboardMetrics } from "@/hooks/useDashboard";
import { MOCK_DATA }       from "@/lib/constants";
import { formatDate }      from "@/lib/utils";
import { SOURCES }         from "@/lib/constants";
import { ScoreRing }       from "@/components/ui/score-ring";
import { BadgeCustom }     from "@/components/ui/badge-custom";
import type { AnalysisStatus } from "@/types/analysis";

function getStatusVariant(status: AnalysisStatus) {
  return { COMPLETED: "completed", PROCESSING: "processing", FAILED: "failed" }[status] as
    "completed" | "processing" | "failed";
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function DashboardPage() {
  const router = useRouter();

  // Try real API first, fall back to mock data
  const { data: apiMetrics, isLoading, isError } = useGetDashboardMetrics();
  const metrics = apiMetrics ?? MOCK_DATA.dashboardMetrics;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-[#1E293B] rounded-lg w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-32 bg-[#1E293B] rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-64 bg-[#1E293B] rounded-xl" />
          <div className="h-64 bg-[#1E293B] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Dashboard</h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            Overview of your review analytics
            {isError && (
              <span className="ml-2 text-orange-400 text-xs">
                (showing demo data)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          New Analysis
        </button>
      </motion.div>

      {/* Metric cards */}
      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          title="Total Reviews"
          value={metrics.totalReviews.toLocaleString()}
          trend={metrics.totalReviewsTrend}
          icon={MessageSquare}
          iconColor="bg-blue-500/20 text-blue-400"
        />
        <MetricCard
          title="Positive Score"
          value={`${metrics.positiveScore}%`}
          trend={metrics.positiveScoreTrend}
          icon={ThumbsUp}
          iconColor="bg-green-500/20 text-green-400"
        />
        <MetricCard
          title="Negative Score"
          value={`${metrics.negativeScore}%`}
          trend={metrics.negativeScoreTrend}
          icon={ThumbsDown}
          iconColor="bg-red-500/20 text-red-400"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.pendingAlerts}
          icon={AlertTriangle}
          iconColor="bg-orange-500/20 text-orange-400"
          isPendingAlerts={metrics.pendingAlerts > 0}
          onClick={() => router.push("/notifications")}
        />
      </motion.div>

      {/* Charts */}
      <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <SentimentDonut {...metrics.sentimentDistribution} />
        </div>
        <div className="lg:col-span-2">
          <SentimentTrends data={metrics.sentimentTrends} />
        </div>
      </motion.div>

      {/* Recent analyses */}
      <motion.div {...fadeUp(0.3)}>
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#F8FAFC]">Recent Analyses</h3>
            <button
              onClick={() => router.push("/analyses")}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {metrics.recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                onClick={() =>
                  analysis.status === "COMPLETED" &&
                  router.push(`/analyses/${analysis.id}`)
                }
                className="flex items-center gap-4 p-3 rounded-lg bg-[#0F172A]/60 hover:bg-[#0F172A] transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F8FAFC] truncate">
                    {analysis.storeName}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    {SOURCES[analysis.source]?.label} · {formatDate(analysis.createdAt)}
                  </p>
                </div>
                {analysis.score !== undefined ? (
                  <ScoreRing score={analysis.score} size={40} strokeWidth={5} />
                ) : (
                  <BadgeCustom variant={getStatusVariant(analysis.status)}>
                    {analysis.status}
                  </BadgeCustom>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
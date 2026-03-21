"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Home, List } from "lucide-react";
import { motion } from "framer-motion";
import { ScoreCard }            from "@/components/analysis/ScoreCard";
import { KeywordCloud }         from "@/components/analysis/KeywordCloud";
import { ReviewSources }        from "@/components/analysis/ReviewSources";
import { RatingTrend }          from "@/components/analysis/RatingTrend";
import { AISummary }            from "@/components/analysis/AISummary";
import { StrengthsProblems }    from "@/components/analysis/StrengthsProblems";
import { RecommendedActions }   from "@/components/analysis/RecommendedActions";
import { ReviewsTable }         from "@/components/analysis/ReviewsTable";

const mockAnalysis = {
  id: "1",
  storeName: "EcoEssentials.com",
  storeUrl: "https://ecoessentials.com",
  source: "AMAZON",
  status: "COMPLETED",
  score: 88,
  trend: 14,
  totalReviews: 1248,
  positiveCount: 898,
  negativeCount: 125,
  neutralCount: 225,
  aiSummary:
    "EcoEssentials has maintained strong growth in sentiment (+14%). Customers praise the new bamboo line, but logistics in the DACH region are causing localized rating drops.",
  strengths: [
    "Superior Material Durability",
    "Eco-conscious Packaging Design",
    "Fast Email Support Response",
  ],
  problems: [
    "High Shipping Costs for EU",
    "Stockout on Best-sellers",
    "Mobile Checkout Latency",
  ],
  actions: [
    "Automate Stock Alerts",
    "Optimize DACH Logistics",
    "A/B Test Checkout Flow",
  ],
  keywords: [
    "Sustainable", "Quality", "Shipping",
    "Packaging", "Eco-friendly", "Customer Support", "Price",
  ],
  reviewSources: [
    { name: "Amazon",         count: 642, color: "#F97316" },
    { name: "Trustpilot",     count: 418, color: "#10B981" },
    { name: "Google Reviews", count: 188, color: "#3B82F6" },
  ],
  ratingTrend: [
    { month: "OCT",          rating: 3.8 },
    { month: "NOV",          rating: 4.0 },
    { month: "DEC",          rating: 3.9 },
    { month: "JAN",          rating: 4.3 },
    { month: "FEB (Forecast)", rating: 4.6 },
  ],
};

const mockReviews = [
  {
    id: "1", author: "Sarah Miller", initials: "SM",
    content: "The quality of the bamboo sheets is incredibly...",
    sentiment: "POSITIVE" as const, rating: 5, time: "2h ago",
  },
  {
    id: "2", author: "James Kim", initials: "JK",
    content: "Shipping was delayed by 4 days without...",
    sentiment: "NEGATIVE" as const, rating: 2, time: "5h ago",
  },
  {
    id: "3", author: "Anna Lopez", initials: "AL",
    content: "Good product but the packaging was slightly...",
    sentiment: "NEUTRAL" as const, rating: 3, time: "Yesterday",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function AnalysisDetailPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-sm text-[#94A3B8]">
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 hover:text-[#F8FAFC] transition-colors">
          <Home size={13} /> Dashboard
        </button>
        <span>/</span>
        <button onClick={() => router.push("/analyses")} className="hover:text-[#F8FAFC] transition-colors">
          Analyses
        </button>
        <span>/</span>
        <span className="text-[#F8FAFC] font-medium">{mockAnalysis.storeName}</span>
      </motion.div>

      {/* Score card */}
      <motion.div {...fadeUp(0.05)}>
        <ScoreCard
          storeName={mockAnalysis.storeName}
          score={mockAnalysis.score}
          trend={mockAnalysis.trend}
          status={mockAnalysis.status}
        />
      </motion.div>

      {/* Main grid */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left col — 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Sentiment + Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mini donut */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">
                Sentiment Distribution
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
                  <svg width={96} height={96} className="-rotate-90">
                    <circle cx={48} cy={48} r={36} fill="none" stroke="#334155" strokeWidth={10} />
                    <circle
                      cx={48} cy={48} r={36}
                      fill="none" stroke="#10B981" strokeWidth={10}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={2 * Math.PI * 36 * (1 - 0.72)}
                    />
                    <circle
                      cx={48} cy={48} r={36}
                      fill="none" stroke="#EF4444" strokeWidth={10}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={2 * Math.PI * 36 * (1 - 0.10)}
                      className="opacity-80"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-black text-[#F8FAFC]">72%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Positive", pct: 72,  color: "bg-green-500" },
                    { label: "Neutral",  pct: 18,  color: "bg-slate-400" },
                    { label: "Negative", pct: 10,  color: "bg-red-500" },
                  ].map(({ label, pct, color }) => (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-[#94A3B8]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <KeywordCloud keywords={mockAnalysis.keywords} />
          </div>

          {/* Review sources */}
          <ReviewSources
            sources={mockAnalysis.reviewSources}
            totalReviews={mockAnalysis.totalReviews}
          />

          {/* Rating trend */}
          <RatingTrend data={mockAnalysis.ratingTrend} />
        </div>

        {/* Right col — 1/3 */}
        <div className="flex flex-col gap-4">
          <AISummary summary={mockAnalysis.aiSummary} />
          <StrengthsProblems
            strengths={mockAnalysis.strengths}
            problems={mockAnalysis.problems}
          />
          <RecommendedActions actions={mockAnalysis.actions} />
        </div>
      </motion.div>

      {/* Reviews table */}
      <motion.div {...fadeUp(0.2)}>
        <ReviewsTable
          reviews={mockReviews}
          totalReviews={mockAnalysis.totalReviews}
        />
      </motion.div>

    </div>
  );
}
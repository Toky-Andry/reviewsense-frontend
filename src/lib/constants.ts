import type { Analysis } from "@/types/analysis";

export const APP_NAME = "ReviewSense";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    reviewsLimit: 50,
    storesLimit: 1,
    popular: false,
    features: [
      "50 reviews per analysis",
      "1 store connection",
      "Basic sentiment analysis",
      "Email notifications",
      "7-day data retention",
    ],
  },
  PRO: {
    name: "Pro",
    price: 29,
    reviewsLimit: 5000,
    storesLimit: 5,
    popular: true,
    features: [
      "5,000 reviews per analysis",
      "5 store connections",
      "Advanced AI analysis",
      "PDF report exports",
      "Custom alert rules",
      "Priority support",
      "90-day data retention",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: null,
    reviewsLimit: Infinity,
    storesLimit: Infinity,
    popular: false,
    features: [
      "Unlimited reviews",
      "Unlimited stores",
      "Custom AI models",
      "API access",
      "SSO / SAML",
      "Dedicated account manager",
      "Unlimited data retention",
    ],
  },
} as const;

export const SOURCES = {
  AMAZON: { label: "Amazon", color: "#FF9900" },
  TRUSTPILOT: { label: "Trustpilot", color: "#00B67A" },
  GOOGLE: { label: "Google", color: "#4285F4" },
  SHOPIFY: { label: "Shopify", color: "#96BF48" },
} as const;

export const ANALYSIS_STATUS = {
  PROCESSING: { label: "Processing", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  COMPLETED: { label: "Completed", color: "text-green-400", bgColor: "bg-green-500/20" },
  FAILED: { label: "Failed", color: "text-red-400", bgColor: "bg-red-500/20" },
} as const;

export const SENTIMENT = {
  POSITIVE: { label: "Positive", color: "text-green-400", bgColor: "bg-green-500/20" },
  NEUTRAL: { label: "Neutral", color: "text-slate-400", bgColor: "bg-slate-500/20" },
  NEGATIVE: { label: "Negative", color: "text-red-400", bgColor: "bg-red-500/20" },
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { label: "Analyses", path: "/analyses", icon: "BarChart2" },
  { label: "Reports", path: "/reports", icon: "FileText" },
  { label: "Notifications", path: "/notifications", icon: "Bell" },
  { label: "Settings", path: "/settings", icon: "Settings" },
] as const;

export const CHART_COLORS = {
  positive: "#10B981",
  neutral: "#94A3B8",
  negative: "#EF4444",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  orange: "#F59E0B",
} as const;

const MOCK_ANALYSES: Analysis[] = [
  {
    id: "mock-1",
    userId: "user-1",
    storeName: "TechGadgets Pro",
    storeUrl: "https://amazon.com/shop/techgadgets",
    source: "AMAZON",
    status: "COMPLETED",
    score: 84,
    trend: 3.2,
    totalReviews: 1240,
    positiveCount: 867,
    negativeCount: 186,
    neutralCount: 187,
    aiSummary: "Customers love the fast shipping and product quality. Main complaints focus on packaging damage.",
    strengths: ["Fast delivery", "Product quality", "Customer service"],
    problems: ["Packaging issues", "Occasional delays", "Price point"],
    actions: ["Improve packaging", "Address delay communication", "Consider loyalty discounts"],
    keywords: ["shipping", "quality", "packaging", "price", "support"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-2",
    userId: "user-1",
    storeName: "HomeDecor Studio",
    storeUrl: "https://trustpilot.com/review/homedecor",
    source: "TRUSTPILOT",
    status: "COMPLETED",
    score: 67,
    trend: -1.8,
    totalReviews: 523,
    positiveCount: 261,
    negativeCount: 157,
    neutralCount: 105,
    aiSummary: "Mixed reviews. Strong product aesthetics praised, but delivery times need improvement.",
    strengths: ["Product aesthetics", "Unique designs", "Eco-friendly materials"],
    problems: ["Long delivery times", "Poor support response", "Return policy"],
    actions: ["Hire more support staff", "Partner with faster logistics", "Simplify returns"],
    keywords: ["design", "delivery", "support", "returns", "quality"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-3",
    userId: "user-1",
    storeName: "FitLife Equipment",
    storeUrl: "https://fitlife.myshopify.com",
    source: "SHOPIFY",
    status: "PROCESSING",
    score: undefined,
    trend: undefined,
    totalReviews: 892,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0,
    aiSummary: undefined,
    strengths: [],
    problems: [],
    actions: [],
    keywords: [],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

export const MOCK_DATA = {
  analyses: MOCK_ANALYSES,
  dashboardMetrics: {
    totalReviews: 2655,
    totalReviewsTrend: 12.4,
    positiveScore: 78,
    positiveScoreTrend: 2.1,
    negativeScore: 22,
    negativeScoreTrend: -1.3,
    pendingAlerts: 3,
    sentimentDistribution: { positive: 78, neutral: 11, negative: 22 },
    sentimentTrends: [
      { date: "Jan", positive: 65 },
      { date: "Feb", positive: 70 },
      { date: "Mar", positive: 68 },
      { date: "Apr", positive: 74 },
      { date: "May", positive: 78 },
      { date: "Jun", positive: 80 },
    ],
    recentAnalyses: MOCK_ANALYSES.slice(0, 3),
  },
};
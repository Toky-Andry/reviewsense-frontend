export type AnalysisStatus = "PROCESSING" | "COMPLETED" | "FAILED";
export type Source = "AMAZON" | "TRUSTPILOT" | "GOOGLE" | "SHOPIFY";
export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export interface Analysis {
  id: string;
  userId: string;
  storeName: string;
  storeUrl: string;
  source: Source;
  status: AnalysisStatus;
  score?: number;
  trend?: number;
  totalReviews: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  aiSummary?: string;
  strengths: string[];
  problems: string[];
  actions: string[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  analysisId: string;
  author: string;
  content: string;
  rating: number;
  sentiment: Sentiment;
  date: string;
}

export interface CreateAnalysisInput {
  storeUrl: string;
  source?: Source;
}

export interface AnalysisListResponse {
  analyses: Analysis[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardMetrics {
  totalReviews: number;
  totalReviewsTrend: number;
  positiveScore: number;
  positiveScoreTrend: number;
  negativeScore: number;
  negativeScoreTrend: number;
  pendingAlerts: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sentimentTrends: Array<{
    date: string;
    positive: number;
  }>;
  recentAnalyses: Analysis[];
}
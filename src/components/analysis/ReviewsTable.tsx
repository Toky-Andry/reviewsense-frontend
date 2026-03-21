"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  initials: string;
  content: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  rating: number;
  time: string;
}

interface ReviewsTableProps {
  reviews: Review[];
  totalReviews: number;
}

const AVATAR_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-orange-500",
  "bg-green-500", "bg-pink-500",
];

const SENTIMENT_STYLES = {
  POSITIVE: "bg-green-500/20 text-green-400 border-green-500/30",
  NEGATIVE: "bg-red-500/20 text-red-400 border-red-500/30",
  NEUTRAL:  "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function ReviewsTable({ reviews, totalReviews }: ReviewsTableProps) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
        <h3 className="text-sm font-semibold text-[#F8FAFC]">Recent Reviews</h3>
        <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
          View All {totalReviews.toLocaleString()} Reviews →
        </button>
      </div>

      {/* Table head */}
      <div className="grid grid-cols-[2fr_3fr_120px_100px] px-6 py-2.5 border-b border-[#334155]">
        {["Customer", "Review", "Sentiment", "Rating"].map((h) => (
          <span key={h} className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#334155]">
        {reviews.map((review, i) => (
          <div
            key={review.id}
            className="grid grid-cols-[2fr_3fr_120px_100px] px-6 py-4 hover:bg-[#0F172A]/40 transition-colors items-center gap-4"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                AVATAR_COLORS[i % AVATAR_COLORS.length]
              )}>
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-[#F8FAFC]">{review.author}</p>
                <p className="text-[10px] text-[#475569]">{review.time}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-[#94A3B8] truncate">{review.content}</p>

            {/* Sentiment */}
            <div>
              <span className={cn(
                "inline-flex px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wider",
                SENTIMENT_STYLES[review.sentiment]
              )}>
                {review.sentiment}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={12}
                  className={j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-[#334155]"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
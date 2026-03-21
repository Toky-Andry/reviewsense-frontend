"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: number | null;
  description: string;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
  isYearly: boolean;
  ctaText: string;
  ctaLink: string;
  ctaVariant?: "filled" | "outline" | "dark";
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  isYearly,
  ctaText,
  ctaLink,
  ctaVariant = "dark",
}: PricingCardProps) {
  const router = useRouter();

  const displayPrice =
    price === null
      ? null
      : isYearly
      ? Math.round(price * 12 * 0.8)
      : price;

  const handleCTA = () => {
    if (ctaLink.startsWith("mailto")) {
      window.location.href = ctaLink;
    } else {
      router.push(ctaLink);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: isPopular ? 1.02 : 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative bg-slate-900/50 rounded-xl p-8 flex flex-col transition-all",
        isPopular
          ? "border-2 border-blue-500 shadow-xl shadow-blue-500/10 z-10 scale-105"
          : "border border-slate-800 hover:border-slate-700"
      )}
    >
      {/* Most Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-2">{name}</h3>

        <div className="flex items-baseline gap-1">
          {displayPrice === null ? (
            <span className="text-4xl font-bold text-white">Custom</span>
          ) : (
            <>
              <span className={cn(
                "text-4xl font-bold",
                isPopular ? "text-blue-500" : "text-white"
              )}>
                ${isYearly ? displayPrice : price}
              </span>
              <span className="text-slate-500 text-sm">
                /{isYearly ? "year" : "month"}
              </span>
            </>
          )}
        </div>

        {isYearly && price !== null && price > 0 && (
          <p className="text-emerald-400 text-xs mt-1 font-medium">
            Save ${Math.round(price * 12 * 0.2)}/year
          </p>
        )}

        <p className="text-slate-400 text-sm mt-4 leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-3 text-sm">
            {feature.included ? (
              <CheckCircle2
                size={18}
                className={isPopular ? "text-blue-500 shrink-0" : "text-emerald-500 shrink-0"}
              />
            ) : (
              <XCircle size={18} className="text-slate-700 shrink-0" />
            )}
            <span className={cn(
              feature.included
                ? isPopular ? "text-white font-medium" : "text-slate-200"
                : "text-slate-500"
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCTA}
        className={cn(
          "w-full font-bold py-3 rounded-lg transition-all text-sm",
          ctaVariant === "filled"
            ? "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20"
            : ctaVariant === "outline"
            ? "border border-slate-700 hover:bg-slate-800 text-white"
            : "bg-slate-800 hover:bg-slate-700 text-white"
        )}
      >
        {ctaText}
      </button>
    </motion.div>
  );
}
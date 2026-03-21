"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard } from "lucide-react";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";

const PLANS = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for individuals just getting started.",
    features: [
      { text: "50 reviews per analysis", included: true },
      { text: "1 store connection", included: true },
      { text: "Basic sentiment analysis", included: true },
      { text: "PDF reports", included: false },
      { text: "Custom alert rules", included: false },
      { text: "Priority support", included: false },
    ],
    isPopular: false,
    ctaText: "Get Started",
    ctaLink: "/register",
    ctaVariant: "dark" as const,
  },
  {
    name: "Pro",
    price: 29,
    description: "Everything you need to scale your growing business.",
    features: [
      { text: "5,000 reviews per analysis", included: true },
      { text: "5 store connections", included: true },
      { text: "Advanced AI analysis", included: true },
      { text: "PDF report exports", included: true },
      { text: "Custom alert rules", included: true },
      { text: "Priority support", included: true },
    ],
    isPopular: true,
    ctaText: "Start Free Trial",
    ctaLink: "/register",
    ctaVariant: "filled" as const,
  },
  {
    name: "Enterprise",
    price: null,
    description: "Advanced security and dedicated support for large teams.",
    features: [
      { text: "Unlimited reviews", included: true },
      { text: "Unlimited stores", included: true },
      { text: "Custom AI models", included: true },
      { text: "SSO and SAML Login", included: true },
      { text: "Dedicated manager", included: true },
      { text: "Custom SLA", included: true },
    ],
    isPopular: false,
    ctaText: "Contact Sales",
    ctaLink: "mailto:sales@reviewsense.com",
    ctaVariant: "outline" as const,
  },
];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-slate-500">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingPageContent() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Simple, transparent pricing
          </h1>
          <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-center"
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <PricingCard {...plan} isYearly={isYearly} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 py-12 border-t border-slate-800"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-sm font-medium">
              No credit card required to start
            </span>
          </div>
          <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-all">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
              <CreditCard size={16} className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Stripe
              </span>
            </div>
            <span className="text-xs text-slate-400">Encrypted and Secure</span>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-12 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <FooterColumn title="Product" links={["Features", "Security", "API"]} />
            <FooterColumn title="Resources" links={["Documentation", "Help Center", "Blog"]} />
            <FooterColumn title="Company" links={["About Us", "Careers", "Privacy"]} />
            <FooterColumn title="Support" links={["Contact", "Status", "Twitter"]} />
          </div>
          <div className="text-center text-xs text-slate-500 pt-8 border-t border-slate-800">
            © 2024 ReviewSense AI. All rights reserved.
          </div>
        </div>

      </div>
    </div>
  );
}
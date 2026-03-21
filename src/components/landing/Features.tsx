"use client";

import { motion } from "framer-motion";
import { BarChart2, Search, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart2,
    title: "Sentiment Analysis",
    description:
      "Instantly gauge the emotional tone of thousands of reviews to identify satisfied and frustrated customers.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Search,
    title: "Keyword Detection",
    description:
      "Auto-extract recurring product issues or feature requests using advanced NLP models trained on e-commerce data.",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    description:
      "Generate beautiful, stakeholder-ready executive summaries with actionable insights in one click.",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];

export function Features() {
  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Powerful Analysis Features
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Everything you need to understand your customers and grow your store.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#833cf6]/30 transition-all cursor-default"
          >
            <div className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-6`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
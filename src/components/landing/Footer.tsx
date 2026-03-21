"use client";

import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = {
  Product: ["Features", "Pricing", "API"],
  Company: ["About", "Contact", "Privacy"],
};

export function LandingFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 border-t border-slate-800"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 text-[#833cf6] mb-4">
            <BarChart2 size={24} />
            <span className="text-white text-lg font-extrabold tracking-tight">
              ReviewSense
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Helping e-commerce brands turn raw customer data into strategic
            business advantages.
          </p>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([category, links]) => (
          <div key={category}>
            <h4 className="text-white font-bold mb-4">{category}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-slate-500 hover:text-[#833cf6] text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">
          © 2024 ReviewSense AI. All rights reserved.
        </p>
        <div className="flex gap-4">
          {["Twitter", "LinkedIn"].map((s) => (
            <Link
              key={s}
              href="#"
              className="text-slate-400 hover:text-[#833cf6] text-xs transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
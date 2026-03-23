"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { ProfileForm }    from "@/components/settings/ProfileForm";
import { PlanCard }       from "@/components/settings/PlanCard";
import { DangerZone }     from "@/components/settings/DangerZone";

type SettingsTab =
  | "profile" | "notifications" | "billing"
  | "api" | "team" | "security";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
          Settings
        </h2>
      </motion.div>

      {/* Layout */}
      <motion.div
        {...fadeUp(0.1)}
        className="flex flex-col lg:flex-row gap-6"
      >
        {/* Sub-nav */}
        <SettingsSubNav active={activeTab} onChange={setActiveTab} />

        {/* Content + right sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-w-0">

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {activeTab === "profile" && (
              <>
                <ProfileForm />
                <DangerZone />
              </>
            )}

            {activeTab === "billing" && (
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
                <h3 className="font-semibold text-[#F8FAFC] mb-2">Billing</h3>
                <p className="text-sm text-[#94A3B8]">
                  Manage your subscription and payment methods.
                </p>
              </div>
            )}

            {activeTab === "api" && (
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
                <h3 className="font-semibold text-[#F8FAFC] mb-2">API Access</h3>
                <div className="flex items-center gap-3 mt-4">
                  <code className="flex-1 bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-xs text-green-400 font-mono">
                    sk_live_••••••••••••••••••••••••••••
                  </code>
                  <button className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors">
                    Copy
                  </button>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
                <h3 className="font-semibold text-[#F8FAFC] mb-2">Team Members</h3>
                <p className="text-sm text-[#94A3B8]">
                  Invite and manage your team members.
                </p>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-[#F8FAFC]">Security</h3>
                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                  <div key={label} className="space-y-1.5">
                    <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}
                <button className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors">
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <PlanCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
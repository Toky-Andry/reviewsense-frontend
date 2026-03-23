"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const USED    = 3240;
const LIMIT   = 5000;
const PCT     = Math.round((USED / LIMIT) * 100);

export function PlanCard() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-4">
      {/* Usage card */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
        <h4 className="font-bold text-[#F8FAFC] mb-0.5">
          {user?.plan ?? "PRO"} Plan
        </h4>
        <p className="text-xs text-[#94A3B8] mb-5">Renews on Oct 12, 2024</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-[#94A3B8]">Reviews Used</span>
              <span className="text-[#F8FAFC]">
                {USED.toLocaleString()} / {LIMIT.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full bg-[#334155] rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${PCT}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#334155]">
            <button
              onClick={() => router.push("/pricing")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-lg shadow-blue-600/20"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Support card */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#F8FAFC] mb-2">Need help?</h4>
        <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
          Our support team is available 24/7 for Pro customers.
        </p>
        <button className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group">
          Contact Support
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
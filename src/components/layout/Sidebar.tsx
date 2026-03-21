"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2, LayoutDashboard, FileText,
  Bell, Settings, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart2,
  FileText,
  Bell,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const getInitials = (name: string): string =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getAvatarColor = (name: string): string => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];
    return colors[name.charCodeAt(0) % colors.length] ?? "bg-blue-500";
  };

  return (
    <aside className="flex flex-col w-[240px] min-h-screen bg-[#1E293B] border-r border-[#334155] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#334155]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
          <BarChart2 className="text-white" size={18} />
        </div>
        <span className="text-[#F8FAFC] font-bold text-lg tracking-tight">
          ReviewSense
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
const isDisabled = false;

          if (!Icon) return null;

          if (isDisabled) {
            return (
              <div
                key={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-40 cursor-not-allowed"
                title="Available from an analysis"
              >
                <Icon size={18} className="text-[#94A3B8]" />
                <span className="text-sm text-[#94A3B8] font-medium">{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-[#94A3B8] hover:bg-[#0F172A] hover:text-[#F8FAFC]"
              )}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="px-3 py-4 border-t border-[#334155]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#0F172A]/60">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold shrink-0",
            getAvatarColor(user?.name ?? "U")
          )}>
            {getInitials(user?.name ?? "User")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F8FAFC] truncate">
              {user?.name ?? "Guest"}
            </p>
            <span className={cn(
              "inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5",
              user?.plan === "PRO" ? "bg-blue-500/20 text-blue-400"
              : user?.plan === "ENTERPRISE" ? "bg-purple-500/20 text-purple-400"
              : "bg-slate-500/20 text-slate-400"
            )}>
              {user?.plan ?? "FREE"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
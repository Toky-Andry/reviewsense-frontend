"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";
import { useGetNotifications } from "@/hooks/useNotifications";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analyses": "Analyses",
  "/reports": "Reports",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/onboarding": "Onboarding",
  "/loading-analysis": "Processing Analysis",
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const logout = useLogout();
  const { data: notifications } = useGetNotifications();

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  const pageTitle =
    Object.entries(PAGE_TITLES).find(([key]) => pathname.startsWith(key))?.[1] ??
    "Dashboard";

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-[#0F172A]/95 border-b border-[#334155] backdrop-blur-md">
      <h1 className="text-lg font-semibold text-[#F8FAFC]">{pageTitle}</h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="text"
            placeholder="Search analyses..."
            className="w-56 pl-9 pr-4 py-2 text-sm rounded-lg bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Bell */}
        <button
          onClick={() => router.push("/notifications")}
          className="relative p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#1E293B] transition-colors outline-none">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold">
              {getInitials(user?.name ?? "U")}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[#F8FAFC] leading-none">
                {user?.name ?? "User"}
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Administrator</p>
            </div>
            <ChevronDown size={14} className="text-[#94A3B8] hidden md:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
          >
            <DropdownMenuLabel className="text-[#94A3B8] text-xs font-normal">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#334155]" />
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer hover:bg-[#0F172A] focus:bg-[#0F172A]"
            >
              <User size={14} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer hover:bg-[#0F172A] focus:bg-[#0F172A]"
            >
              <Settings size={14} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#334155]" />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
            >
              <LogOut size={14} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
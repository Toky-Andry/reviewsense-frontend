"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "profile" | "notifications" | "billing"
  | "api" | "team" | "security";

interface SettingsSubNavProps {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

const NAV_ITEMS: { id: SettingsTab; label: string }[] = [
  { id: "profile",       label: "Profile"       },
  { id: "notifications", label: "Notifications" },
  { id: "billing",       label: "Billing"       },
  { id: "api",           label: "API Access"    },
  { id: "team",          label: "Team Members"  },
  { id: "security",      label: "Security"      },
];

export function SettingsSubNav({ active, onChange }: SettingsSubNavProps) {
  const router = useRouter();

  return (
    <nav className="w-full lg:w-52 flex flex-col gap-1 shrink-0">
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => {
            if (id === "notifications") router.push("/notifications");
            else onChange(id);
          }}
          className={cn(
            "flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors",
            active === id
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
          )}
        >
          {label}
          {id === "notifications" && (
            <span className="text-[10px] text-[#475569]">→</span>
          )}
        </button>
      ))}
    </nav>
  );
}
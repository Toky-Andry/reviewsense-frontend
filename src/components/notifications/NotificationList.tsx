"use client";

import { useRouter } from "next/navigation";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  dotColor: string;
  dotRing: string;
  link: string;
  read: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Negative spike detected",
    description: "EcoEssentials negative reviews spiked to 23% in the last 24 hours.",
    time: "2 min ago",
    dotColor: "bg-red-500",
    dotRing: "ring-red-500/20",
    link: "/analyses/1",
    read: false,
  },
  {
    id: "2",
    title: "Score threshold breached",
    description: "TechGadgets overall sentiment score dropped to 68/100.",
    time: "1h ago",
    dotColor: "bg-yellow-500",
    dotRing: "ring-yellow-500/20",
    link: "/analyses/1",
    read: false,
  },
  {
    id: "3",
    title: "New Review Milestone",
    description: "FashionHub just reached 1,000 verified customer reviews.",
    time: "3h ago",
    dotColor: "bg-green-500",
    dotRing: "ring-green-500/20",
    link: "/analyses/1",
    read: true,
  },
  {
    id: "4",
    title: "Weekly Summary Ready",
    description: "Your weekly analytical report for all active products has been generated.",
    time: "Yesterday",
    dotColor: "bg-blue-500",
    dotRing: "ring-blue-500/20",
    link: "/reports/1",
    read: true,
  },
  {
    id: "5",
    title: "Score Improvement",
    description: "EcoEssentials score improved from 82 to 88 following recent updates.",
    time: "2 days ago",
    dotColor: "bg-green-500",
    dotRing: "ring-green-500/20",
    link: "/analyses/1",
    read: true,
  },
];

export function NotificationList() {
  const router = useRouter();

  return (
    <section className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
        <h3 className="text-lg font-bold text-[#F8FAFC]">Recent Notifications</h3>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Notification items */}
      <div className="divide-y divide-[#334155]">
        {NOTIFICATIONS.map((notif) => (
          <div
            key={notif.id}
            onClick={() => router.push(notif.link)}
            className="group flex items-start gap-4 px-6 py-5 hover:bg-[#0F172A]/50 transition-colors cursor-pointer"
          >
            {/* Dot */}
            <div className="mt-1.5 shrink-0">
              <span className={cn(
                "flex h-3 w-3 rounded-full ring-4",
                notif.dotColor,
                notif.dotRing
              )} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <p className={cn(
                  "text-sm font-bold",
                  notif.read ? "text-[#94A3B8]" : "text-[#F8FAFC]"
                )}>
                  {notif.title}
                </p>
                <span className="text-xs text-[#475569] shrink-0">{notif.time}</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {notif.description}
              </p>
              <span className="text-[10px] text-[#475569] mt-2 block italic group-hover:text-blue-400 transition-colors">
                Click to view →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="px-6 py-4 bg-[#0F172A]/30 text-center border-t border-[#334155]">
        <button className="text-sm font-bold text-[#475569] hover:text-[#94A3B8] transition-colors">
          Load Older Notifications
        </button>
      </div>
    </section>
  );
}
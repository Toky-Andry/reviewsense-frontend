"use client";

import { Bell, Check, CheckCheck, TrendingUp, TrendingDown, AlertTriangle, Award, FileText } from "lucide-react";
import { useMarkAllRead, useMarkOneRead } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/lib/utils";
import type { NotificationType } from "@/types/notification";

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; color: string; bgColor: string }> = {
  NEGATIVE_SPIKE:    { icon: AlertTriangle, color: "text-red-400",    bgColor: "bg-red-500/20" },
  SCORE_DROP:        { icon: TrendingDown,  color: "text-orange-400", bgColor: "bg-orange-500/20" },
  MILESTONE:         { icon: Award,         color: "text-purple-400", bgColor: "bg-purple-500/20" },
  WEEKLY_REPORT:     { icon: FileText,      color: "text-blue-400",   bgColor: "bg-blue-500/20" },
  SCORE_IMPROVEMENT: { icon: TrendingUp,    color: "text-green-400",  bgColor: "bg-green-500/20" },
};

const MOCK_NOTIFICATIONS = [
  { id: "1", userId: "u1", type: "NEGATIVE_SPIKE" as NotificationType, title: "Negative spike detected", message: "TechGadgets Pro saw a 15% increase in negative reviews.", read: false, createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
  { id: "2", userId: "u1", type: "SCORE_IMPROVEMENT" as NotificationType, title: "Score improved!", message: "HomeDecor Studio score went up by 3 points this week.", read: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: "3", userId: "u1", type: "WEEKLY_REPORT" as NotificationType, title: "Weekly report ready", message: "Your weekly analysis report is now available.", read: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: "4", userId: "u1", type: "MILESTONE" as NotificationType, title: "1,000 reviews analyzed!", message: "You've analyzed over 1,000 reviews across all stores.", read: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

export default function NotificationsPage() {
  const { mutate: markAllRead } = useMarkAllRead();
  const { mutate: markOneRead } = useMarkOneRead();
  const notifications = MOCK_NOTIFICATIONS;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Notifications</h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllRead()}
            className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell size={32} className="text-[#334155] mb-3" />
            <p className="text-[#94A3B8]">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const config = TYPE_CONFIG[notification.type];
            const Icon = config.icon;
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                  notification.read
                    ? "bg-[#1E293B] border-[#334155]"
                    : "bg-[#1E293B] border-blue-500/30 ring-1 ring-blue-500/10"
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${config.bgColor}`}>
                  <Icon size={16} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-medium ${notification.read ? "text-[#94A3B8]" : "text-[#F8FAFC]"}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markOneRead(notification.id)}
                        className="p-1 rounded text-[#94A3B8] hover:text-green-400 transition-colors"
                      >
                        <Check size={13} />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-[#475569] mt-1.5">
                    {formatRelativeTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
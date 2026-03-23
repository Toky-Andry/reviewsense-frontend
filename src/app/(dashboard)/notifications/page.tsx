"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AlertRules }        from "@/components/notifications/AlertRules";
import { NotificationList }  from "@/components/notifications/NotificationList";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        {...fadeUp(0)}
        className="flex items-start justify-between"
      >
        <div>
          <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
            Notifications & Alerts
          </h2>
        </div>
        <button
          onClick={() => router.push("/notifications")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={16} />
          Create Alert
        </button>
      </motion.div>

      {/* Alert rules */}
      <motion.div {...fadeUp(0.1)}>
        <AlertRules />
      </motion.div>

      {/* Notification list */}
      <motion.div {...fadeUp(0.2)}>
        <NotificationList />
      </motion.div>

    </div>
  );
}
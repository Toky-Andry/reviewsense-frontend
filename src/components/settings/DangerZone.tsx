"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const logout = useLogout();

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    logout();
  };

  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-red-500" />
        <h4 className="font-bold text-red-400">Danger Zone</h4>
      </div>

      {!showConfirm ? (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Permanently delete your account and all associated data.
            This action cannot be undone.
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-6 py-2 border-2 border-red-500 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all whitespace-nowrap"
          >
            Delete Account
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-[#94A3B8]">
            Type{" "}
            <span className="font-bold text-red-400 font-mono">DELETE</span>{" "}
            to confirm account deletion.
          </p>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full bg-[#0F172A] border border-red-500/50 rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all"
          />
          <div className="flex gap-3">
            <button
              onClick={() => { setShowConfirm(false); setConfirmText(""); }}
              className="flex-1 px-4 py-2 rounded-lg border border-[#334155] text-[#94A3B8] text-sm font-medium hover:border-[#475569] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={confirmText !== "DELETE" || isDeleting}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                confirmText === "DELETE" && !isDeleting
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-red-500/20 text-red-400/50 cursor-not-allowed"
              )}
            >
              {isDeleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : null}
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Camera, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Invalid email address"),
  company:  z.string().optional(),
  language: z.string(),
  timezone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const LANGUAGES = ["English", "French", "Spanish", "German", "Portuguese"];
const TIMEZONES = [
  "UTC+3 Antananarivo",
  "UTC+0 London",
  "UTC-5 New York",
  "UTC+1 Paris",
  "UTC+8 Singapore",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function ProfileForm() {
  const { user, setUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name:     user?.name     ?? "Alex Rivera",
      email:    user?.email    ?? "alex@reviewsense.com",
      company:  user?.company  ?? "Digital Horizon Ltd",
      language: user?.language ?? "English",
      timezone: user?.timezone ?? "UTC+3 Antananarivo",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    if (user) {
      setUser({ ...user, name: data.name, company: data.company });
    }
    toast.success("Profile updated successfully!");
    setIsSaving(false);
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full bg-[#0F172A] border rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-all",
      hasError
        ? "border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-[#334155] focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
    );

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
      {/* Avatar */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-[#334155] bg-blue-600 flex items-center justify-center text-white text-2xl font-black">
            {getInitials(user?.name ?? "AR")}
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-[#1E293B] hover:scale-110 transition-transform shadow-lg">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#F8FAFC]">
            {user?.name ?? "Alex Rivera"}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              {user?.plan ?? "PRO"} Plan
            </span>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Full Name
            </label>
            <input
              {...register("name")}
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Company
            </label>
            <input
              {...register("company")}
              className={inputClass()}
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Language
            </label>
            <select {...register("language")} className={inputClass()}>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Timezone
            </label>
            <select {...register("timezone")} className={inputClass()}>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-sm shadow-xl shadow-blue-600/20 transition-all"
          >
            {isSaving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
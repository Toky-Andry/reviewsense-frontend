"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BarChart2, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRegister } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();
  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
            <BarChart2 className="text-white" size={20} />
          </div>
          <span className="text-[#F8FAFC] font-bold text-2xl">ReviewSense</span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-1">Create your account</h2>
          <p className="text-sm text-[#94A3B8] mb-6">Free forever — no credit card required</p>

          <form onSubmit={handleSubmit((data) => register(data))} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...rhfRegister("name")}
                  placeholder="Alex Rivera"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.name ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...rhfRegister("email")}
                  type="email"
                  placeholder="you@company.com"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.email ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...rhfRegister("password")}
                  type="password"
                  placeholder="Min. 8 characters"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.password ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Confirm password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...rhfRegister("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.confirmPassword ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <><span>Create account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#94A3B8]">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
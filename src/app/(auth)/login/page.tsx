"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BarChart2, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
            <BarChart2 className="text-white" size={20} />
          </div>
          <span className="text-[#F8FAFC] font-bold text-2xl">ReviewSense</span>
        </div>

        {/* Card */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-1">Welcome back</h2>
          <p className="text-sm text-[#94A3B8] mb-6">Sign in to your account</p>

          {/* Demo hint */}
          <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-400">
              🧪 Demo — Email: test@reviewsense.com / Password: Test1234!
            </p>
          </div>

          <form
            onSubmit={handleSubmit((data) => login(data))}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="test@reviewsense.com"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.email ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[#0F172A] border text-[#F8FAFC] placeholder:text-[#475569]",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors",
                    errors.password ? "border-red-500" : "border-[#334155]"
                  )}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#94A3B8]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
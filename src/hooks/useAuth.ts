"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "@/types/user";

/** Fetch the currently authenticated user */
export function useGetMe() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey:  ["me"],
    queryFn:   authApi.getMe,
    enabled:   isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

/** Login with real backend */
export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response) => {
      const { user, token } = response;
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Login failed. Please check your credentials.");
    },
  });
}

/** Register with real backend */
export function useRegister() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (response) => {
      const { user, token } = response;
      setAuth(user, token);
      toast.success("Account created! Welcome to ReviewSense.");
      router.push("/onboarding");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Registration failed.");
    },
  });
}

/** Update profile with real backend */
export function useUpdateProfile() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => authApi.updateProfile(data),
    onSuccess: (user) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profile updated successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to update profile.");
    },
  });
}

/** Logout */
export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    toast.success("Logged out successfully.");
    router.push("/login");
  };
}
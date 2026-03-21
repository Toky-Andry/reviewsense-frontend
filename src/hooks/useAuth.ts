"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "@/types/user";

export function useGetMe() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Login failed.");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      toast.success("Account created!");
      router.push("/onboarding");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Registration failed.");
    },
  });
}

export function useUpdateProfile() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileInput) => authApi.updateProfile(data),
    onSuccess: (user) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profile updated.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to update profile.");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  return () => {
    logout();
    queryClient.clear();
    router.push("/login");
  };
}
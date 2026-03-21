"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationApi, alertApi } from "@/lib/api";
import type { CreateAlertInput } from "@/types/notification";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationApi.getAll,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationApi.markAllRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkOneRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationApi.markOneRead(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useGetAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: alertApi.getAll,
    staleTime: 60 * 1000,
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAlertInput) => alertApi.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert rule created.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to create alert.");
    },
  });
}

export function useUpdateAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAlertInput> }) =>
      alertApi.update(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => alertApi.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert rule deleted.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to delete alert.");
    },
  });
}
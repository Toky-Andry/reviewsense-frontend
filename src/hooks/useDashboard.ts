"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api";

export function useGetDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getMetrics,
    staleTime: 20_000,
    refetchInterval: 30_000,
  });
}
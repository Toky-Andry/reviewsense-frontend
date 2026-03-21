"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { analysisApi } from "@/lib/api";
import type { CreateAnalysisInput } from "@/types/analysis";

export function useGetAnalyses(page = 1, limit = 10, filters?: Record<string, string>) {
  return useQuery({
    queryKey: ["analyses", page, limit, filters],
    queryFn: () => analysisApi.getAll(page, limit, filters),
    staleTime: 30 * 1000,
  });
}

export function useGetAnalysis(id: string) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: () => analysisApi.getOne(id),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

export function useCreateAnalysis() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAnalysisInput) => analysisApi.create(data),
    onSuccess: (analysis) => {
      void queryClient.invalidateQueries({ queryKey: ["analyses"] });
      router.push(`/loading-analysis?id=${analysis.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to start analysis.");
    },
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => analysisApi.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["analyses"] });
      toast.success("Analysis deleted.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to delete analysis.");
    },
  });
}

export function useGetReviews(analysisId: string, page = 1) {
  return useQuery({
    queryKey: ["reviews", analysisId, page],
    queryFn: () => analysisApi.getReviews(analysisId, page, 20),
    enabled: Boolean(analysisId),
    staleTime: 60 * 1000,
  });
}
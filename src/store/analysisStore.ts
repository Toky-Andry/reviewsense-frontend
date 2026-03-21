import { create } from "zustand";
import type { Analysis, AnalysisStatus } from "@/types/analysis";

interface AnalysisState {
  currentAnalysis: Analysis | null;
  analyses: Analysis[];
  isProcessing: boolean;
  processingProgress: number;
}

interface AnalysisActions {
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  setAnalyses: (analyses: Analysis[]) => void;
  setProcessing: (processing: boolean) => void;
  setProgress: (progress: number) => void;
  updateAnalysisStatus: (id: string, status: AnalysisStatus, score?: number) => void;
  addAnalysis: (analysis: Analysis) => void;
  removeAnalysis: (id: string) => void;
}

type AnalysisStore = AnalysisState & AnalysisActions;

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  currentAnalysis: null,
  analyses: [],
  isProcessing: false,
  processingProgress: 0,

  setCurrentAnalysis: (currentAnalysis) => set({ currentAnalysis }),
  setAnalyses: (analyses) => set({ analyses }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setProgress: (processingProgress) => set({ processingProgress }),

  updateAnalysisStatus: (id, status, score) =>
    set((state) => ({
      analyses: state.analyses.map((a) =>
        a.id === id ? { ...a, status, ...(score !== undefined ? { score } : {}) } : a
      ),
      currentAnalysis:
        state.currentAnalysis?.id === id
          ? { ...state.currentAnalysis, status, ...(score !== undefined ? { score } : {}) }
          : state.currentAnalysis,
    })),

  addAnalysis: (analysis) =>
    set((state) => ({ analyses: [analysis, ...state.analyses] })),

  removeAnalysis: (id) =>
    set((state) => ({
      analyses: state.analyses.filter((a) => a.id !== id),
      currentAnalysis: state.currentAnalysis?.id === id ? null : state.currentAnalysis,
    })),
}));
import axios, { type AxiosError } from "axios";
import { API_URL } from "./constants";
import type { LoginInput, RegisterInput, UpdateProfileInput, AuthResponse, User, UserSettings } from "@/types/user";
import type { Analysis, CreateAnalysisInput, AnalysisListResponse, DashboardMetrics, ReviewListResponse } from "@/types/analysis";
import type { Report } from "@/types/report";
import type { Notification, AlertRule, CreateAlertInput } from "@/types/notification";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("reviewsense-auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { state?: { token?: string } };
        const token = parsed?.state?.token;
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch { /* ignore */ }
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("reviewsense-auth");
      window.location.href = "/login";
    }
    const message = error.response?.data?.message ?? error.message ?? "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export const authApi = {
  login: (data: LoginInput): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/auth/login", data).then((r) => r.data),
  register: (data: RegisterInput): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/auth/register", data).then((r) => r.data),
  getMe: (): Promise<User> =>
    apiClient.get<User>("/auth/me").then((r) => r.data),
  updateProfile: (data: UpdateProfileInput): Promise<User> =>
    apiClient.patch<User>("/auth/me", data).then((r) => r.data),
};

export const analysisApi = {
  getAll: (page = 1, limit = 10, filters?: Record<string, string>): Promise<AnalysisListResponse> =>
    apiClient.get<AnalysisListResponse>("/analyses", { params: { page, limit, ...filters } }).then((r) => r.data),
  getOne: (id: string): Promise<Analysis> =>
    apiClient.get<Analysis>(`/analyses/${id}`).then((r) => r.data),
  create: (data: CreateAnalysisInput): Promise<Analysis> =>
    apiClient.post<Analysis>("/analyses", data).then((r) => r.data),
  delete: (id: string): Promise<void> =>
    apiClient.delete(`/analyses/${id}`).then(() => undefined),
  getReviews: (id: string, page = 1, limit = 20): Promise<ReviewListResponse> =>
    apiClient.get<ReviewListResponse>(`/analyses/${id}/reviews`, { params: { page, limit } }).then((r) => r.data),
};

export const dashboardApi = {
  getMetrics: (): Promise<DashboardMetrics> =>
    apiClient.get<DashboardMetrics>("/dashboard/metrics").then((r) => r.data),
};

export const reportApi = {
  getAll: (): Promise<Report[]> =>
    apiClient.get<Report[]>("/reports").then((r) => r.data),
  getOne: (id: string): Promise<Report> =>
    apiClient.get<Report>(`/reports/${id}`).then((r) => r.data),
  generate: (analysisId: string): Promise<Report> =>
    apiClient.post<Report>("/reports", { analysisId }).then((r) => r.data),
  download: (id: string): Promise<Blob> =>
    apiClient.get(`/reports/${id}/download`, { responseType: "blob" }).then((r) => r.data as Blob),
  delete: (id: string): Promise<void> =>
    apiClient.delete(`/reports/${id}`).then(() => undefined),
};

export const notificationApi = {
  getAll: (): Promise<Notification[]> =>
    apiClient.get<Notification[]>("/notifications").then((r) => r.data),
  markAllRead: (): Promise<void> =>
    apiClient.patch("/notifications/read-all").then(() => undefined),
  markOneRead: (id: string): Promise<void> =>
    apiClient.patch(`/notifications/${id}/read`).then(() => undefined),
  delete: (id: string): Promise<void> =>
    apiClient.delete(`/notifications/${id}`).then(() => undefined),
};

export const alertApi = {
  getAll: (): Promise<AlertRule[]> =>
    apiClient.get<AlertRule[]>("/alerts").then((r) => r.data),
  create: (data: CreateAlertInput): Promise<AlertRule> =>
    apiClient.post<AlertRule>("/alerts", data).then((r) => r.data),
  update: (id: string, data: Partial<CreateAlertInput>): Promise<AlertRule> =>
    apiClient.patch<AlertRule>(`/alerts/${id}`, data).then((r) => r.data),
  delete: (id: string): Promise<void> =>
    apiClient.delete(`/alerts/${id}`).then(() => undefined),
};

export const settingsApi = {
  get: (): Promise<UserSettings> =>
    apiClient.get<UserSettings>("/settings").then((r) => r.data),
  update: (data: Partial<UserSettings>): Promise<UserSettings> =>
    apiClient.patch<UserSettings>("/settings", data).then((r) => r.data),
  deleteAccount: (): Promise<void> =>
    apiClient.delete("/settings/account").then(() => undefined),
};

export default apiClient;
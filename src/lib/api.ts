import axios, { type AxiosError } from "axios";
import { API_URL } from "./constants";
import type { LoginInput, RegisterInput, UpdateProfileInput, AuthResponse, User, UserSettings } from "@/types/user";
import type { Analysis, CreateAnalysisInput, AnalysisListResponse, DashboardMetrics, ReviewListResponse } from "@/types/analysis";
import type { Report } from "@/types/report";
import type { Notification, AlertRule, CreateAlertInput } from "@/types/notification";

/** Backend API wrapper response shape */
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data:     T;
}

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/** Attach JWT token from localStorage to every request */
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

/** Handle 401 and extract error message */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("reviewsense-auth");
      window.location.href = "/login";
    }
    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: LoginInput): Promise<AuthResponse> =>
    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/login", data)
      .then((r) => r.data.data),

  register: (data: RegisterInput): Promise<AuthResponse> =>
    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/register", data)
      .then((r) => r.data.data),

  getMe: (): Promise<User> =>
    apiClient
      .get<ApiResponse<{ user: User }>>("/auth/me")
      .then((r) => r.data.data.user),

  updateProfile: (data: UpdateProfileInput): Promise<User> =>
    apiClient
      .put<ApiResponse<{ user: User }>>("/auth/profile", data)
      .then((r) => r.data.data.user),
};

// ─── ANALYSES ────────────────────────────────────────────────────────────────

export const analysisApi = {
  getAll: (
    page = 1,
    limit = 10,
    filters?: Record<string, string>
  ): Promise<AnalysisListResponse> =>
    apiClient
      .get<ApiResponse<{ analyses: Analysis[]; total: number; page: number; limit: number; totalPages: number }>>(
        "/analyses",
        { params: { page, limit, ...filters } }
      )
      .then((r) => ({
        analyses:   r.data.data.analyses,
        total:      r.data.data.total,
        page:       r.data.data.page,
        limit:      r.data.data.limit,
        totalPages: r.data.data.totalPages,
      })),

  getOne: (id: string): Promise<Analysis> =>
    apiClient
      .get<ApiResponse<{ analysis: Analysis }>>(`/analyses/${id}`)
      .then((r) => r.data.data.analysis),

  create: (data: CreateAnalysisInput): Promise<Analysis> =>
    apiClient
      .post<ApiResponse<{ analysis: Analysis }>>("/analyses", data)
      .then((r) => r.data.data.analysis),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/analyses/${id}`).then(() => undefined),

  getReviews: (
    id: string,
    page = 1,
    limit = 20
  ): Promise<ReviewListResponse> =>
    apiClient
      .get<ApiResponse<ReviewListResponse>>(
        `/analyses/${id}/reviews`,
        { params: { page, limit } }
      )
      .then((r) => r.data.data),
};

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

export const dashboardApi = {
  getMetrics: (): Promise<DashboardMetrics> =>
    apiClient
      .get<ApiResponse<DashboardMetrics>>("/analyses/dashboard")
      .then((r) => r.data.data),
};

// ─── REPORTS ─────────────────────────────────────────────────────────────────

export const reportApi = {
  getAll: (): Promise<Report[]> =>
    apiClient
      .get<ApiResponse<{ reports: Report[] }>>("/reports")
      .then((r) => r.data.data.reports),

  getOne: (id: string): Promise<Report> =>
    apiClient
      .get<ApiResponse<{ report: Report }>>(`/reports/${id}`)
      .then((r) => r.data.data.report),

  generate: (analysisId: string): Promise<Report> =>
    apiClient
      .post<ApiResponse<{ report: Report }>>("/reports", { analysisId })
      .then((r) => r.data.data.report),

  download: (id: string): Promise<Blob> =>
    apiClient
      .get(`/reports/${id}/download`, { responseType: "blob" })
      .then((r) => r.data as Blob),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/reports/${id}`).then(() => undefined),
};

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

export const notificationApi = {
  getAll: (): Promise<Notification[]> =>
    apiClient
      .get<ApiResponse<{ notifications: Notification[]; unreadCount: number }>>("/notifications")
      .then((r) => r.data.data.notifications),

  markAllRead: (): Promise<void> =>
    apiClient.put("/notifications/read-all").then(() => undefined),

  markOneRead: (id: string): Promise<void> =>
    apiClient.put(`/notifications/${id}/read`).then(() => undefined),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/notifications/${id}`).then(() => undefined),
};

// ─── ALERTS ──────────────────────────────────────────────────────────────────

export const alertApi = {
  getAll: (): Promise<AlertRule[]> =>
    apiClient
      .get<ApiResponse<{ alerts: AlertRule[] }>>("/alerts")
      .then((r) => r.data.data.alerts),

  create: (data: CreateAlertInput): Promise<AlertRule> =>
    apiClient
      .post<ApiResponse<{ alert: AlertRule }>>("/alerts", data)
      .then((r) => r.data.data.alert),

  update: (id: string, data: Partial<CreateAlertInput>): Promise<AlertRule> =>
    apiClient
      .put<ApiResponse<{ alert: AlertRule }>>(`/alerts/${id}`, data)
      .then((r) => r.data.data.alert),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/alerts/${id}`).then(() => undefined),
};

// ─── SETTINGS ────────────────────────────────────────────────────────────────

export const settingsApi = {
  get: (): Promise<UserSettings> =>
    apiClient
      .get<ApiResponse<{ settings: UserSettings }>>("/settings")
      .then((r) => r.data.data.settings),

  update: (data: Partial<UserSettings>): Promise<UserSettings> =>
    apiClient
      .put<ApiResponse<{ settings: UserSettings }>>("/settings", data)
      .then((r) => r.data.data.settings),

  deleteAccount: (): Promise<void> =>
    apiClient.delete("/settings/account").then(() => undefined),
};

export default apiClient;
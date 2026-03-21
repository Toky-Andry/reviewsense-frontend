export type Plan = "FREE" | "PRO" | "ENTERPRISE";

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  timezone: string;
  language: string;
  plan: Plan;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileInput {
  name?: string;
  company?: string;
  timezone?: string;
  language?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserSettings extends UpdateProfileInput {
  emailNotifications?: boolean;
  weeklyReport?: boolean;
  marketingEmails?: boolean;
}
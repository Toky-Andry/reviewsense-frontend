export type NotificationType =
  | "NEGATIVE_SPIKE"
  | "SCORE_DROP"
  | "MILESTONE"
  | "WEEKLY_REPORT"
  | "SCORE_IMPROVEMENT";

export type AlertType =
  | "NEGATIVE_SPIKE"
  | "SCORE_DROP"
  | "REVIEW_MILESTONE";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AlertRule {
  id: string;
  userId: string;
  name: string;
  type: AlertType;
  threshold: number;
  active: boolean;
  createdAt: string;
}

export interface CreateAlertInput {
  name: string;
  type: AlertType;
  threshold: number;
}
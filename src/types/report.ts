export type ReportStatus = "SUCCESS" | "EXPIRED" | "PENDING";

export interface Report {
  id: string;
  analysisId: string;
  title: string;
  period: string;
  scoreChange?: number;
  status: ReportStatus;
  pdfUrl?: string;
  createdAt: string;
}

export interface GenerateReportInput {
  includeRawReviews: boolean;
  includeFullData: boolean;
  includeExecutiveSummary: boolean;
}

export interface ScheduledReport {
  active: boolean;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  recipients: string[];
}
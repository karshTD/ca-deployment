// ---------------------------------------------------------------------------
// lib/api.ts
// Single source of truth for talking to the Flask backend.
// This file was missing from the repo — every page imported from it, so the
// app could not build and auth never persisted. Rebuilt here.
//
// Auth model (local email + password for now; swap to Google later without
// touching any page — only the functions in this file change):
//   1. register()/login() POST to Flask, which returns a JWT `token`.
//   2. We save that token in localStorage (for the Authorization header)
//      AND in a cookie called `auth_token` (so middleware.ts can gate routes).
//   3. On reload the token is still there → you stay signed in.
//   4. logout() clears both.
// ---------------------------------------------------------------------------

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const TOKEN_KEY = "auth_token";

// ---------------------------------------------------------------------------
// Types (shapes the UI components expect)
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface FlaggedClause {
  clause: string;
  score: number;
  matched_complaint: string;
}

export interface RiskReportData {
  overall_risk_level: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";
  summary?: string;
  top_dangerous_clauses?: {
    title: string;
    description: string;
    impact: string;
    severity: "HIGH" | "MEDIUM" | "LOW";
  }[];
  financial_stress_assessment?: {
    high_stress_percentage: number;
    high_stress_avg_emi: number;
    low_stress_avg_emi: number;
    personal_stress_level: string;
    personal_stress_probability: number;
    emi_to_income_ratio: number;
    interpretation: string;
  };
  recommendations?: string[];
  sections_to_negotiate?: { clause: string; action: string }[];
  borrower_rights?: string[];
}

export interface TaskStatus {
  status: "pending" | "processing" | "complete" | "failed";
  stage: number;
  stage_name: string;
  flagged_clauses: FlaggedClause[];
  risk_report: string;
  risk_report_structured?: RiskReportData;
  risk_level: "HIGH" | "MEDIUM" | "LOW" | null;
  message?: string;
}

// Loan stats are best-effort; every field is optional so the dashboard can
// render whatever the backend happens to return.
export interface LoanStats {
  total_loans?: number;
  average_amount?: number;
  high_risk_count?: number;
  medium_risk_count?: number;
  low_risk_count?: number;
  [key: string]: number | string | undefined;
}

// ---------------------------------------------------------------------------
// Error type
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Token storage — cookie + localStorage
// ---------------------------------------------------------------------------

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  // Cookie is what middleware.ts reads. 7-day expiry, root path.
  // Not HttpOnly because we set it from the client; fine for a local build.
  const week = 60 * 60 * 24 * 7;
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${week}; SameSite=Lax`;
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

// ---------------------------------------------------------------------------
// Low-level request helper
// ---------------------------------------------------------------------------

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    // Network error — almost always "backend isn't running".
    throw new ApiError(
      "Can't reach the server. Make sure the backend is running.",
      0
    );
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  }

  return body as T;
}

// ---------------------------------------------------------------------------
// Auth calls
// ---------------------------------------------------------------------------

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const data = await request<{ token: string; user: AuthUser }>(
    "/auth/register",
    { method: "POST", body: JSON.stringify(input) }
  );
  setAuthToken(data.token);
  return data.user;
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const data = await request<{ token: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  setAuthToken(data.token);
  return data.user;
}

export async function getMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me", { method: "GET" }, true);
}

export function logout(): void {
  clearAuthToken();
}

// ---------------------------------------------------------------------------
// Data calls
// ---------------------------------------------------------------------------

export async function getLoanStats(): Promise<LoanStats> {
  return request<LoanStats>("/loan_stats", { method: "GET" });
}

export async function getStatus(taskId: string): Promise<TaskStatus> {
  return request<TaskStatus>(`/status/${taskId}`, { method: "GET" });
}

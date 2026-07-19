"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getStatus, ApiError, type TaskStatus } from "@/lib/api";

/** The 6 pipeline stages, mirroring the Flask backend's STAGE_NAMES. */
export const ANALYSIS_STAGES: { stage: number; name: string }[] = [
  { stage: 1, name: "Uploading Document" },
  { stage: 2, name: "Extracting Text" },
  { stage: 3, name: "Analyzing Clauses" },
  { stage: 4, name: "Matching Complaints" },
  { stage: 5, name: "Generating Risk Report" },
  { stage: 6, name: "Finalizing Analysis" },
];

/**
 * useAnalysis — polls /status/<taskId> until the task finishes.
 * This hook was imported by the analysis page but missing from the repo.
 */
export function useAnalysis(taskId: string) {
  const [status, setStatus] = useState<TaskStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const poll = useCallback(async () => {
    try {
      const data = await getStatus(taskId);
      setStatus(data);
      setError(null);

      const done = data.status === "complete" || data.status === "failed";
      if (!done) {
        timer.current = setTimeout(poll, 2000); // poll every 2s
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load analysis.");
      // Keep retrying on transient errors, but back off a little.
      timer.current = setTimeout(poll, 4000);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    setIsLoading(true);
    poll();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [poll]);

  const refetch = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setIsLoading(true);
    poll();
  }, [poll]);

  return { status, isLoading, error, refetch };
}

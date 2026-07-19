import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge Tailwind class names without conflicts.
 * Every shadcn/ui component imports this. It was missing from the repo,
 * which is one reason the build failed.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { clsx } from "clsx"

export function cn(...inputs) {
  // Fallback to clsx-only implementation to avoid hard dependency on `tailwind-merge`.
  return clsx(inputs)
}

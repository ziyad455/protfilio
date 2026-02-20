import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to intelligently merge Tailwind classes.
 * It resolves conflicts (e.g., 'p-4 p-8' -> 'p-8') and allows for conditional class logic via `clsx`.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names with clsx
 * Provides a clean way to conditionally apply CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
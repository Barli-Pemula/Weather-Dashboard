import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get temperature-based color coding for visual representation
 * @param temp - Temperature in Celsius
 * @returns Object with color classes for different styling contexts
 */
export function getTempColor(temp: number) {
  if (temp < 0) {
    return {
      text: "text-blue-600",
      bg: "bg-blue-50",
      badge: "bg-blue-500",
      light: "text-blue-400",
    };
  }
  if (temp < 10) {
    return {
      text: "text-cyan-600",
      bg: "bg-cyan-50",
      badge: "bg-cyan-500",
      light: "text-cyan-400",
    };
  }
  if (temp < 20) {
    return {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      badge: "bg-emerald-500",
      light: "text-emerald-400",
    };
  }
  if (temp < 30) {
    return {
      text: "text-orange-600",
      bg: "bg-orange-50",
      badge: "bg-orange-500",
      light: "text-orange-400",
    };
  }
  return {
    text: "text-red-600",
    bg: "bg-red-50",
    badge: "bg-red-500",
    light: "text-red-400",
  };
}

/**
 * Get background gradient based on temperature and weather condition
 */
export function getTempGradient(temp: number): string {
  if (temp < 0) return "from-blue-100 to-cyan-50";
  if (temp < 10) return "from-cyan-100 to-blue-50";
  if (temp < 20) return "from-emerald-100 to-cyan-50";
  if (temp < 30) return "from-orange-100 to-amber-50";
  return "from-red-100 to-orange-50";
}

/**
 * Format temperature display with proper rounding
 */
export function formatTemp(temp: number): string {
  return Math.round(temp).toString();
}

/**
 * Format percentage values
 */
export function formatPercent(value: number): string {
  return Math.round(value).toString();
}

/**
 * Format wind speed
 */
export function formatWindSpeed(speed: number): string {
  return Math.round(speed).toString();
}

/**
 * Get humidity level description
 */
export function getHumidityLevel(humidity: number): string {
  if (humidity < 30) return "Dry";
  if (humidity < 60) return "Comfortable";
  if (humidity < 80) return "Humid";
  return "Very Humid";
}

/**
 * Get precipitation probability description
 */
export function getPrecipDescription(probability: number): string {
  if (probability < 20) return "Unlikely";
  if (probability < 50) return "Possible";
  if (probability < 80) return "Likely";
  return "Very Likely";
}

/**
 * Format date to readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date for day of week only
 */
export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

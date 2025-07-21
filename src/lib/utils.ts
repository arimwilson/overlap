import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOverlapColor(percentage: number) {
  if (percentage === 0) {
    return 'hsl(0 70% 95%)'; // Very light red
  }
  // Hue from red (0) to green (120)
  const hue = percentage * 120;
  // Increase saturation and lightness for a more vibrant, pastel-like color
  const saturation = 50 + (percentage * 40); // from 50% to 90%
  const lightness = 85 - (percentage * 25); // from 85% down to 60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

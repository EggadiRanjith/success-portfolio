import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * WCAG Contrast Ratio Validator
 * Validates color contrast ratios for accessibility compliance
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param context - Context description for error messages
 * @param minRatio - Minimum contrast ratio (default: 4.5 for normal text, 3 for large text)
 */
export function validateContrast(
  foreground: string,
  background: string,
  context: string,
  minRatio: number = 4.5
): void {
  if (process.env.NODE_ENV !== "development") {
    return; // Only run in development
  }

  try {
    // Convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
          ]
        : [0, 0, 0];
    };

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number): number => {
      const [rs, gs, bs] = [r, g, b].map((val) => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const [fgR, fgG, fgB] = hexToRgb(foreground);
    const [bgR, bgG, bgB] = hexToRgb(background);

    const fgLuminance = getLuminance(fgR, fgG, fgB);
    const bgLuminance = getLuminance(bgR, bgG, bgB);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    if (ratio < minRatio) {
      console.warn(
        `[WCAG Contrast Warning] ${context}: Contrast ratio ${ratio.toFixed(2)} is below minimum ${minRatio}. ` +
        `Foreground: ${foreground}, Background: ${background}`
      );
    }
  } catch (error) {
    // Silently fail in case of invalid colors
  }
}

// src/function.ts

const arabicToGeezMap: Record<number, string> = {
  1: "፩",
  2: "፪",
  3: "፫",
  4: "፬",
  5: "፭",
  6: "፮",
  7: "፯",
  8: "፰",
  9: "፱",
  10: "፲",
  20: "፳",
  30: "፴",
  40: "፵",
  50: "፶",
  60: "፷",
  70: "፸",
  80: "፹",
  90: "፺",
  100: "፻",
};

const geezToArabicMap = Object.entries(arabicToGeezMap).reduce(
  (acc, [key, value]) => {
    acc[value] = parseInt(key);
    return acc;
  },
  {} as Record<string, number>
);

/**
 * Convert Arabic number (1–100) to Geez numerals.
 */
export function arabicToGeez(num: number): string {
  if (num < 1 || num > 100) return "Not Supported Yet";
  if (num === 100) return arabicToGeezMap[100];
  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;
  return (arabicToGeezMap[tens] || "") + (arabicToGeezMap[ones] || "");
}

/**
 * Convert Geez numeral string (፩–፻) to Arabic number.
 */
export function geezToArabic(geez: string): number {
  return geez
    .split("")
    .reduce((sum, ch) => sum + (geezToArabicMap[ch] || 0), 0);
}

/**
 * Shorthand for arabicToGeez: geez(15) → ፲፭
 */
export function geez(num: number): string {
  return arabicToGeez(num);
}

/**
 * Shorthand for geezToArabic: arabic('፲፭') → 15
 */
export function arabic(geezStr: string): number {
  return geezToArabic(geezStr);
}

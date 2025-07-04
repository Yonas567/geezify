// src/function.ts

var thousands = ['፻፼፼፼', '፼፼፼', '፻፼፼', '፼፼', '፻፼', '፼', '፻', ''];
var ones = ['፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
var tens = ['፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

var base_elf = ['፻', '፼'];

/**
 * Convert Arabic number (1 – 1e15) to Geez numerals.
 */
export function arabicToGeez(num: number): string {
  const numStr = num.toString();
  const chunks = Math.ceil(numStr.length / 2);
  let temp = numStr;
  let geezNum = '';

  for (let i = 1; i <= chunks; i++) {
    const mul = i === 1 ? '' : base_elf[1].repeat(Math.ceil((i - 2) / 2)) + (i % 2 === 0 ? base_elf[0] : '');
    const num1 = temp.slice(-1);
    const num2 = temp.length > 1 ? temp.slice(-2, -1) : '0';

    if (num1 !== '0' || num2 !== '0') {
      geezNum += mul;
      if (!(i > 1 && num2 === '0' && num1 === '1')) {
        if (num1 !== '0') geezNum += ones[parseInt(num1) - 1];
      }
      if (num2 !== '0') geezNum += tens[parseInt(num2) - 1];
    }

    temp = temp.slice(0, -2);
  }

  return geezNum.split('').reverse().join('');
}

/**
 * Convert Geez numeral string to Arabic number.
 */
export function geezToArabic(geez: string): number {
  let converted = 0;
  let powers = 14;
  let multiplier = 10 ** powers;

  for (let i = 0; i < thousands.length; i++) {
    if (!geez.includes(thousands[i])) {
      powers -= 2;
      multiplier = 10 ** powers;
      continue;
    }

    const splitIndex = geez.indexOf(thousands[i]) + thousands[i].length;
    const segment = geez.slice(0, splitIndex - thousands[i].length);
    geez = geez.slice(splitIndex);

    if (segment.length === 2) {
      converted += (((tens.indexOf(segment[1]) + 1) * 10) + (ones.indexOf(segment[0]) + 1)) * multiplier;
    } else if (segment.length === 1) {
      const ch = segment[0];
      if (ones.includes(ch)) {
        converted += (ones.indexOf(ch) + 1) * multiplier;
      } else if (tens.includes(ch)) {
        converted += (tens.indexOf(ch) + 1) * 10 * multiplier;
      }
    } else if (segment.length === 0) {
      converted += multiplier;
    }

    powers -= 2;
    multiplier = 10 ** powers;
  }

  // Remaining digits (1–99)
  if (geez.length === 2) {
    converted += ((tens.indexOf(geez[0]) + 1) * 10) + (ones.indexOf(geez[1]) + 1);
  } else if (geez.length === 1) {
    const ch = geez[0];
    if (ones.includes(ch)) {
      converted += ones.indexOf(ch) + 1;
    } else if (tens.includes(ch)) {
      converted += (tens.indexOf(ch) + 1) * 10;
    }
  }

  return converted;
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

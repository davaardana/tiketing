export type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassValue[]
  | { [key: string]: boolean | string | number | null | undefined };

const toString = (value: ClassValue): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => toString(entry));
  }

  return Object.entries(value)
    .filter(([, condition]) => Boolean(condition))
    .map(([key]) => key);
};

export const cn = (...inputs: ClassValue[]): string => inputs.flatMap((value) => toString(value)).join(' ');

export const formatCurrency = (value: number, locale = 'en-US', currency = 'USD') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

export const formatTrend = (value: number) => (value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`);

export const CATEGORIES_CFG = {
  cache: true,
  timeout: 5000,
  retries: 1,
} as const;

export const CATEGORIES_CFG_NO_CACHE = {
  cache: false,
  timeout: 5000,
  retries: 1,
} as const;

export const CATEGORIES_CFG_LONG = {
  cache: false,
  timeout: 8000,
  retries: 1,
} as const;

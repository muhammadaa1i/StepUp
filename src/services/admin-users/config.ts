export const USERS_CFG = {
  cache: true,
  timeout: 5000,
  retries: 1,
} as const;

export const USERS_CFG_NO_CACHE = {
  cache: false,
  timeout: 5000,
  retries: 1,
} as const;

export const unwrap = <T,>(res: unknown): T =>
  ((res as { data?: T })?.data as T) || (res as T);

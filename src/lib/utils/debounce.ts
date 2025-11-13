/**
 * Debounce function - delays execution until after wait time
 */
export const debounce = <F extends (...args: never[]) => void>(
  func: F,
  delay: number
): F => {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  }) as F;
};

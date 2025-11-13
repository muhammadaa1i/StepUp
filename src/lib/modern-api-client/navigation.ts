/**
 * Navigation tracking to prevent logout during browser navigation
 */

export class NavigationTracker {
  private lastNavigationTime = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.setupListeners();
    }
  }

  private setupListeners(): void {
    const updateTime = () => {
      this.lastNavigationTime = Date.now();
    };

    window.addEventListener("popstate", updateTime);
    window.addEventListener("pageshow", updateTime);
    window.addEventListener("beforeunload", updateTime);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        updateTime();
      }
    });

    updateTime(); // Initial load
  }

  getLastNavigationTime(): number {
    return this.lastNavigationTime;
  }

  isRecentNavigation(gracePeriod: number = 5000): boolean {
    return Date.now() - this.lastNavigationTime < gracePeriod;
  }

  isNavigatingNow(): boolean {
    return (
      document.readyState !== "complete" ||
      document.visibilityState === "hidden"
    );
  }

  isHardRefresh(): boolean {
    if (typeof window === "undefined") return false;
    const entry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    return entry?.type === "reload";
  }
}

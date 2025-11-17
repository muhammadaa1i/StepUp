/**
 * Simplified token refresh with multi-strategy approach
 */

import { parseTokensFromResponse } from "./utils/tokenParser";
import { storeTokens } from "./utils/tokenStorage";
import { createRefreshStrategies, tryWithTrailingSlash } from "./utils/refreshStrategies";

// Track failed refresh attempts to prevent loops
let consecutiveFailures = 0;
let lastFailureTime = 0;
const MAX_CONSECUTIVE_FAILURES = 2;
const FAILURE_RESET_TIME = 30000; // 30 seconds

export const refreshAccessToken = async (refreshToken: string): Promise<boolean> => {
  // Reset counter if enough time has passed
  if (Date.now() - lastFailureTime > FAILURE_RESET_TIME) {
    consecutiveFailures = 0;
  }

  // Prevent infinite loops - stop trying after multiple failures
  if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Token Refresh] Too many consecutive failures, skipping refresh attempt');
    }
    throw new Error("Token refresh disabled due to multiple failures");
  }

  const strategies = createRefreshStrategies(refreshToken);
  let lastErr: unknown = null;

  for (const strat of strategies) {
    try {
      let resp = await strat.run();
      
      // Don't retry with trailing slash on 400/401 - these indicate invalid token
      if (!resp.ok && (resp.status === 404 || resp.status === 422)) {
        resp = await tryWithTrailingSlash();
      }

      if (resp.ok) {
        const tokens = await parseTokensFromResponse(resp);
        const stored = storeTokens(tokens);
        
        if (stored && tokens.access) {
          // Success - reset failure counter
          consecutiveFailures = 0;
          return true;
        }
        
        lastErr = new Error(`Refresh strategy '${strat.label}' returned no tokens`);
        continue;
      } else {
        // Don't log 401/400 as they're expected when token is invalid
        if (resp.status !== 401 && resp.status !== 400) {
          console.error(`[Token Refresh] Strategy '${strat.label}' failed with status ${resp.status}`);
        }
        lastErr = new Error(`Refresh strategy '${strat.label}' failed status ${resp.status}`);
        // If token is clearly invalid, don't try other strategies to reduce noise
        if (resp.status === 400 || resp.status === 401) {
          break;
        }
        continue;
      }
    } catch (error) {
      lastErr = error;
      continue;
    }
  }

  // All strategies failed
  consecutiveFailures++;
  lastFailureTime = Date.now();
  
  throw lastErr || new Error("All refresh strategies failed");
};

/**
 * Utility functions - Re-exported from modular structure
 * 
 * This file maintains backward compatibility while the actual implementations
 * are organized in focused, single-responsibility modules under ./utils/
 */

export {
  // Class name utilities
  cn,
  
  // Formatting utilities
  formatPrice,
  formatDate,
  
  // Image utilities
  getFullImageUrl,
  
  // Function utilities
  debounce,
  
  // Error handling
  extractErrorMessage,
  
  // Constants
  UZBEK_MONTHS,
  FIELD_NAME_MAP,
  DEFAULT_PLACEHOLDER_IMAGE,
  IMAGE_BASE_URL,
} from "./utils/index";

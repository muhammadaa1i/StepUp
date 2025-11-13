import { DEFAULT_PLACEHOLDER_IMAGE, IMAGE_BASE_URL } from "./constants";

/**
 * Convert relative image URL to absolute URL
 */
export const getFullImageUrl = (imageUrl?: string): string => { 
  if (!imageUrl) return DEFAULT_PLACEHOLDER_IMAGE;
  
  return imageUrl.startsWith("http")
    ? imageUrl
    : `${IMAGE_BASE_URL}${imageUrl}`;
};

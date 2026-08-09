// D:/Trident Log/Trident-FE/src/utils/urlHelper.ts

/**
 * Utility function to get the correct media URL
 * Works for both local and production environments
 */
export const getMediaUrl = (path: string): string => {
  if (!path) return '';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Get the base URL from environment variables
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
  // If path starts with /uploads/, prepend the base URL
  if (path.startsWith('/uploads/')) {
    return `${baseUrl}${path}`;
  }
  
  // For all other paths (local assets), return as is
  return path;
};

/**
 * Utility function for API calls outside of the api service
 */
export const getApiUrl = (endpoint: string): string => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return `${apiUrl}${endpoint}`;
};

/**
 * Get the base URL without /api suffix (for auth endpoints that need full URL)
 */
export const getBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
};

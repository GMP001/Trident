// D:/Trident Log/Trident-FE/src/utils/urlHelper.ts

/**
 * Utility function to get the correct media URL
 * Works for both local and production environments
 */
export const getMediaUrl = (path: string): string => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.VITE_API_BASE_URL || '';
  if (path.startsWith('/uploads/')) return `${base}${path}`;
  return path;
};

export const getApiUrl = (endpoint: string): string =>
  `${import.meta.env.VITE_API_URL || '/api'}${endpoint}`;

export const getBaseUrl = (): string =>
  import.meta.env.VITE_API_BASE_URL || '';


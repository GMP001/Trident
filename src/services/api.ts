// D:/Trident Log/Trident-FE/src/services/api.ts

// API Service for communicating with backend
// Uses Vite environment variables for dynamic URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================================
// Token Management
// ============================================================
const getAccessToken = (): string | null => localStorage.getItem('admin_token');
const getRefreshToken = (): string | null => localStorage.getItem('admin_refresh_token');

const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('admin_token', accessToken);
    localStorage.setItem('admin_refresh_token', refreshToken);
};

const clearTokens = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
};

// ============================================================
// Token Refresh Logic
// ============================================================
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
        clearTokens();
        window.location.href = '/admin-login';
        throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        clearTokens();
        window.location.href = '/admin-login';
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
};

// ============================================================
// Core API Call Function (with auto token refresh)
// ============================================================
async function apiCall(endpoint: string, options: RequestInit = {}) {
    const token = getAccessToken();
    
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData (browser sets it with boundary)
    if (options.body instanceof FormData) {
        delete defaultHeaders['Content-Type'];
    }
    
    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers as Record<string, string> },
    });
    
    // If 401 and we have a refresh token, try refreshing
    if (response.status === 401 && getRefreshToken()) {
        if (isRefreshing) {
            // Queue this request until refresh completes
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(async (newToken) => {
                defaultHeaders['Authorization'] = `Bearer ${newToken}`;
                response = await fetch(`${API_URL}${endpoint}`, {
                    ...options,
                    headers: { ...defaultHeaders, ...options.headers as Record<string, string> },
                });
                if (!response.ok) {
                    const error = await response.json().catch(() => ({ error: 'Request failed' }));
                    throw new Error(error.error || `API call failed: ${response.status}`);
                }
                return response.json();
            });
        }
        
        isRefreshing = true;
        
        try {
            const newToken = await refreshAccessToken();
            processQueue(null, newToken);
            
            // Retry with new token
            defaultHeaders['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: { ...defaultHeaders, ...options.headers as Record<string, string> },
            });
        } catch (error) {
            processQueue(error, null);
            throw error;
        } finally {
            isRefreshing = false;
        }
    }
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `API call failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Development logging
    if (import.meta.env.DEV) {
        console.log(`API Response [${endpoint}]:`, data);
    }
    
    return data;
}

// ============================================================
// Auth APIs
// ============================================================
export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Login failed' }));
            throw new Error(error.error || 'Invalid credentials');
        }

        const data = await response.json();

        // Store tokens
        setTokens(data.accessToken, data.refreshToken);
        localStorage.setItem('admin_user', JSON.stringify(data.user));

        return data;
    },

    logout: async () => {
        try {
            await apiCall('/auth/logout', { method: 'POST' });
        } catch (error) {
            // Even if logout API fails, clear local tokens
            console.error('Logout API error:', error);
        }
        clearTokens();
    },

    verify: () => apiCall('/auth/verify'),

    getCurrentUser: () => {
        const userStr = localStorage.getItem('admin_user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    isAuthenticated: () => {
        return !!getAccessToken();
    },
};

// ============================================================
// Content APIs
// ============================================================
export const contentAPI = {
    // Get all pages list
    getPages: () => apiCall('/content/pages'),

    // Get specific page content with all sections
    getPage: async (pageKey: string) => {
        try {
            const response = await apiCall(`/content/page/${pageKey}`);
            return response;
        } catch (error) {
            console.error(`Error fetching page ${pageKey}:`, error);
            throw error;
        }
    },

    // Update page content (requires auth)
    updatePage: (pageKey: string, data: any) =>
        apiCall(`/content/page/${pageKey}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Get global settings
    getGlobalSettings: () => apiCall('/content/global-settings'),

    // Update global settings (requires auth)
    updateGlobalSettings: (settings: any) =>
        apiCall('/content/global-settings', {
            method: 'PUT',
            body: JSON.stringify(settings),
        }),

    // Update quote recipients (requires auth)
    updateQuoteRecipients: (emails: string[]) =>
        apiCall('/content/settings/quote-recipients', {
            method: 'PUT',
            body: JSON.stringify({ emails }),
        }),

    // Update contact recipients (requires auth)
    updateContactRecipients: (emails: string[]) =>
        apiCall('/content/settings/contact-recipients', {
            method: 'PUT',
            body: JSON.stringify({ emails }),
        }),

    // Upload image/video (requires auth)
    uploadFile: async (file: File, oldFilePath?: string) => {
        const token = getAccessToken();
        const formData = new FormData();
        formData.append('image', file);
        if (oldFilePath) {
            formData.append('oldFilePath', oldFilePath);
        }

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: formData,
        });

        if (response.status === 401 && getRefreshToken()) {
            const newToken = await refreshAccessToken();
            const retryResponse = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${newToken}`,
                },
                body: formData,
            });

            if (!retryResponse.ok) {
                const error = await retryResponse.json().catch(() => ({ error: 'Upload failed' }));
                throw new Error(error.error || 'File upload failed');
            }

            return retryResponse.json();
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(error.error || 'File upload failed');
        }

        return response.json();
    },
};

// ============================================================
// Quote APIs
// ============================================================
export const quoteAPI = {
    submit: (data: any) =>
        apiCall('/quote', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getAll: () => apiCall('/quote'),
};

// ============================================================
// Contact/Booking APIs
// ============================================================
export const contactAPI = {
    submitBooking: (data: any) =>
        apiCall('/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getBookedSlots: () => apiCall('/contact/booked-slots'),

    getBookings: () => apiCall('/contact/bookings'),
};

// ============================================================
// Export helpers
// ============================================================
export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const getApiUrl = (endpoint: string = '') => `${API_URL}${endpoint}`;

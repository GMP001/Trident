// D:/Trident Log/Trident-FE/src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================================
// Fetch with timeout — aborts after `ms` milliseconds
// ============================================================
const fetchWithTimeout = (
    url: string,
    init: RequestInit = {},
    ms = 20000,
): Promise<Response> => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { ...init, signal: ctrl.signal })
        .finally(() => clearTimeout(id));
};

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
        if (error) prom.reject(error);
        else prom.resolve(token);
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

    const response = await fetchWithTimeout(`${API_URL}/auth/refresh-token`, {
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
// Core API Call (with auto token refresh)
// ============================================================
async function apiCall(endpoint: string, options: RequestInit = {}) {
    const token = getAccessToken();

    const defaultHeaders: Record<string, string> = {};

    // Only set Content-Type when there's a body and it's NOT FormData
    if (options.body && !(options.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers as Record<string, string>) },
    });

    // If 401 and we have a refresh token, try refreshing
    if (response.status === 401 && getRefreshToken()) {
        if (isRefreshing) {
            // Queue this request until refresh completes
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(async (newToken) => {
                defaultHeaders['Authorization'] = `Bearer ${newToken}`;
                response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                    ...options,
                    headers: { ...defaultHeaders, ...(options.headers as Record<string, string>) },
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

            defaultHeaders['Authorization'] = `Bearer ${newToken}`;
            response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                ...options,
                headers: { ...defaultHeaders, ...(options.headers as Record<string, string>) },
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
        const response = await fetchWithTimeout(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Login failed' }));
            throw new Error(error.error || 'Invalid credentials');
        }

        const data = await response.json();
        setTokens(data.accessToken, data.refreshToken);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        return data;
    },

    logout: async () => {
        try {
            await apiCall('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout API error:', error);
        }
        clearTokens();
    },

    verify: () => apiCall('/auth/verify'),

    getCurrentUser: () => {
        const userStr = localStorage.getItem('admin_user');
        if (userStr) {
            try { return JSON.parse(userStr); } catch { return null; }
        }
        return null;
    },

    isAuthenticated: () => !!getAccessToken(),
};

// ============================================================
// Content APIs
// ============================================================
export const contentAPI = {
    getPages: () => apiCall('/content/pages'),

    getPage: async (pageKey: string) => {
        try {
            return await apiCall(`/content/page/${pageKey}`);
        } catch (error) {
            console.error(`Error fetching page ${pageKey}:`, error);
            throw error;
        }
    },

    updatePage: (pageKey: string, data: any) =>
        apiCall(`/content/page/${pageKey}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getGlobalSettings: () => apiCall('/content/global-settings'),

    updateGlobalSettings: (settings: any) =>
        apiCall('/content/global-settings', {
            method: 'PUT',
            body: JSON.stringify(settings),
        }),

    updateQuoteRecipients: (emails: string[]) =>
        apiCall('/content/settings/quote-recipients', {
            method: 'PUT',
            body: JSON.stringify({ emails }),
        }),

    updateContactRecipients: (emails: string[]) =>
        apiCall('/content/settings/contact-recipients', {
            method: 'PUT',
            body: JSON.stringify({ emails }),
        }),

    uploadFile: async (file: File, oldFilePath?: string) => {
        const token = getAccessToken();
        const formData = new FormData();
        formData.append('image', file);
        if (oldFilePath) formData.append('oldFilePath', oldFilePath);

        // 60-second timeout for uploads (files can be big)
        const response = await fetchWithTimeout(`${API_URL}/upload`, {
            method: 'POST',
            headers: { ...(token && { Authorization: `Bearer ${token}` }) },
            body: formData,
        }, 60000);

        if (response.status === 401 && getRefreshToken()) {
            const newToken = await refreshAccessToken();
            const retryResponse = await fetchWithTimeout(`${API_URL}/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${newToken}` },
                body: formData,
            }, 60000);

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
        apiCall('/quote', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => apiCall('/quote'),
};

// ============================================================
// Contact/Booking APIs
// ============================================================
export const contactAPI = {
    submitBooking: (data: any) =>
        apiCall('/contact', { method: 'POST', body: JSON.stringify(data) }),
    getBookedSlots: () => apiCall('/contact/booked-slots'),
    getBookings: () => apiCall('/contact/bookings'),
};

// ============================================================
// Export helpers — kept for backward compatibility
// ============================================================
export const getApiBaseUrl = () =>
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getApiUrl = (endpoint: string = '') => `${API_URL}${endpoint}`;

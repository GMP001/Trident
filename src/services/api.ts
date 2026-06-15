// API Service for communicating with backend
const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API call failed');
  }
  
  const data = await response.json();
  
  // Simple development logging (no process.env or import.meta.env to avoid conflicts)
  if (window.location.hostname === 'localhost') {
    console.log(`API Response [${endpoint}]:`, data);
  }
  
  return data;
}

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) => 
    apiCall('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    }),
  
  verify: (token: string) => 
    apiCall('/auth/verify', { 
      method: 'POST', 
      body: JSON.stringify({ token }) 
    }),
};

// Content APIs
export const contentAPI = {
  // Get all content
  getAll: () => apiCall('/content'),
  
  // Get specific page content - backend returns page object directly
  getPage: async (pageId: string) => {
    try {
      const response = await apiCall(`/content/page/${pageId}`);
      // Based on your backend: res.json(page) - returns the page object directly
      // Structure: { isActive: true, hero: {...}, purpose: {...}, etc. }
      return response;
    } catch (error) {
      console.error(`Error fetching page ${pageId}:`, error);
      throw error;
    }
  },
  
  // Update page content (requires auth)
  updatePage: (pageId: string, data: any) => 
    apiCall(`/content/page/${pageId}`, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  
  // Update global settings (requires auth)
  updateSettings: (settings: any) => 
    apiCall('/content/settings', { 
      method: 'PUT', 
      body: JSON.stringify(settings) 
    }),
  
  // Upload image (requires auth)
  uploadImage: async (file: File) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Image upload failed');
    }
    
    const data = await response.json();
    return data;
  },
};

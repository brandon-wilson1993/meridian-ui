/**
 * API Client for Meridian Bank Backend
 * Handles all API requests to the meridian backend
 */

const API = {
    /**
     * Make a fetch request with proper headers and error handling
     * @param {string} endpoint - API endpoint (relative to base URL)
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async request(endpoint, options = {}) {
        const url = `${config.apiBaseUrl}${endpoint}`;
        
        // Get auth headers (includes Authorization and Content-Type)
        const authHeaders = Auth.getAuthHeader();
        
        const fetchOptions = {
            ...options,
            headers: {
                ...authHeaders,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, fetchOptions);
            
            // Handle HTTP errors
            if (!response.ok) {
                if (response.status === 401 && Auth.isAuthenticated()) {
                    // Unauthorized for an authenticated user - session likely expired
                    Auth.logout();
                    throw new Error('Session expired. Please login again.');
                }
                
                // Try to get error message from response
                let errorMessage = `Request failed with status ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    // If we can't parse error, use default message
                }
                
                throw new Error(errorMessage);
            }
            
            // Parse JSON response
            const data = await response.json();
            return data;
        } catch (error) {
            // Network error or other issues
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Unable to connect to server. Please check your connection and try again.');
            }
            throw error;
        }
    },
    
    /**
     * User API Methods
     */
    users: {
        /**
         * Get user by ID
         * @param {number} userId - User ID
         * @returns {Promise<Object>} User object
         */
        async getById(userId) {
            return API.request(`/users/${userId}`);
        },
        
        /**
         * Get all users
         * @returns {Promise<Array>} Array of user objects
         */
        async getAll() {
            return API.request('/users');
        },
        
        /**
         * Create a new user
         * @param {Object} userData - User data
         * @returns {Promise<Object>} Created user object
         */
        async create(userData) {
            return API.request('/users', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },
        
        /**
         * Find user by username
         * @param {string} username - Username to search for
         * @returns {Promise<Object|null>} User object or null if not found
         * This method queries the backend for the specific username instead of
         * fetching all users and filtering client-side.
         */
        async findByUsername(username) {
            const response = await API.request(`/users?username=${encodeURIComponent(username)}`);
            
            // Support both array and single-object responses from the backend
            if (Array.isArray(response)) {
                return response[0] || null;
            }
            
            return response || null;
        },

        /**
         * Get current authenticated user's profile
         */
        async getMe() {
            return API.request('/users/me');
        }
    },
    
    /**
     * Account API Methods
     */
    accounts: {
        /**
         * Get all accounts for a user
         * @param {number} userId - User ID
         * @returns {Promise<Array>} Array of account objects
         */
        async getByUserId(userId) {
            return API.request(`/users/${userId}/accounts`);
        },

        /**
         * Create account for a user
         * @param {number} userId - User ID
         * @param {Object} accountData - Account data (must include accountType)
         * @returns {Promise<Object>} Created account object
         */
        async create(userId, accountData) {
            return API.request(`/users/${userId}/accounts`, {
                method: 'POST',
                body: JSON.stringify(accountData)
            });
        }
    }
};

// Make API available globally
if (typeof window !== 'undefined') {
    window.API = API;
}

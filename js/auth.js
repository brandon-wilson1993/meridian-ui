/**
 * Authentication utilities for Meridian Bank UI
 * Handles JWT token management, session storage, and authentication state
 */

const Auth = {
    /**
     * Store authentication credentials and generate mock JWT token
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @param {Object} userData - User data from API
     */
    login(username, password, userData) {
        // Store only non-sensitive identifier; do not persist plaintext passwords
        const credentials = {
            username: username
        };
        
        // Store credentials for API authentication (username only)
        sessionStorage.setItem(config.credentialsKey, JSON.stringify(credentials));
        
        // Generate mock JWT token (for UI purposes)
        const mockToken = this.generateMockJWT(username);
        sessionStorage.setItem(config.tokenKey, mockToken);
        
        // Store user data
        if (userData) {
            sessionStorage.setItem(config.userKey, JSON.stringify(userData));
        }
        
        // Set session timeout
        this.setSessionTimeout();
    },
    
    /**
     * Generate a mock JWT token (for UI state management)
     * Note: This is not a real JWT - the backend doesn't provide a login endpoint
     * Real authentication happens via Basic Auth or other means on each API call
     */
    generateMockJWT(username) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: username,
            iat: Date.now(),
            exp: Date.now() + config.sessionTimeout
        }));
        const signature = btoa('mock-signature');
        return `${header}.${payload}.${signature}`;
    },
    
    /**
     * Get stored credentials
     * @returns {Object|null} Credentials object or null
     */
    getCredentials() {
        const stored = sessionStorage.getItem(config.credentialsKey);
        return stored ? JSON.parse(stored) : null;
    },
    
    /**
     * Get stored user data
     * @returns {Object|null} User data object or null
     */
    getUserData() {
        const stored = sessionStorage.getItem(config.userKey);
        return stored ? JSON.parse(stored) : null;
    },
    
    /**
     * Get authentication token
     * @returns {string|null} JWT token or null
     */
    getToken() {
        return sessionStorage.getItem(config.tokenKey);
    },
    
    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    isAuthenticated() {
        const token = this.getToken();
        const credentials = this.getCredentials();
        return !!(token && credentials);
    },
    
    /**
     * Logout user and clear session
     */
    logout() {
        sessionStorage.removeItem(config.tokenKey);
        sessionStorage.removeItem(config.userKey);
        sessionStorage.removeItem(config.credentialsKey);
        
        // Redirect to login page
        window.location.href = 'index.html';
    },
    
    /**
     * Set session timeout handler
     */
    setSessionTimeout() {
        // Clear any existing timeout to prevent memory leaks
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
        
        this._timeoutId = setTimeout(() => {
            alert('Your session has expired. Please login again.');
            this.logout();
        }, config.sessionTimeout);
    },
    
    /**
     * Require authentication - redirect to login if not authenticated
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    },
    
    /**
     * Get authorization header value for API calls
     * @returns {string} Authorization header value
     */
    getAuthHeader() {
        const credentials = this.getCredentials();
        if (credentials) {
            // Use Basic Auth with stored credentials
            const encoded = btoa(`${credentials.username}:${credentials.password}`);
            return `Basic ${encoded}`;
        }
        
        // Fallback to Bearer token if available
        const token = this.getToken();
        return token ? `Bearer ${token}` : '';
    }
};

// Make Auth available globally
if (typeof window !== 'undefined') {
    window.Auth = Auth;
}

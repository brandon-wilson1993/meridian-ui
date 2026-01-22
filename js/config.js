/**
 * Configuration file for Meridian Bank UI
 * Contains API base URL and other configurable settings
 */

const config = {
    // API base URL - can be configured via environment variable or directly here
    apiBaseUrl: window.ENV_API_BASE_URL || 'http://localhost:8080',
    
    // Session timeout in milliseconds (30 minutes)
    sessionTimeout: 30 * 60 * 1000,
    
    // JWT token key in session storage
    tokenKey: 'meridian_auth_token',
    
    // User data key in session storage
    userKey: 'meridian_user_data',
    
    // Credentials key in session storage (for mock auth)
    credentialsKey: 'meridian_credentials'
};

// Allow configuration via window object for easy overrides
if (typeof window !== 'undefined') {
    window.MeridianConfig = config;
}

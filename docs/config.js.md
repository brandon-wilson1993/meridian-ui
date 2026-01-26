# config.js Documentation

**File Path:** `js/config.js`

**Purpose:** Centralized configuration management for the Meridian Bank UI application. This file serves as the single source of truth for application-wide settings.

---

## Code Documentation

### Lines 1-4: File Header Comment
```javascript
/**
 * Configuration file for Meridian Bank UI
 * Contains API base URL and other configurable settings
 */
```
**What it does:** Provides a JSDoc-style comment describing the file's purpose.

**Why it was chosen:** Standard documentation practice to help developers quickly understand the file's role.

**How it works within everything:** This header helps developers navigating the codebase understand that this file contains all configuration settings.

---

### Line 6: Configuration Object Declaration
```javascript
const config = {
```
**What it does:** Creates a constant object to hold all configuration values.

**Why it was chosen:** Using `const` prevents accidental reassignment of the configuration object, while still allowing property modifications. An object structure allows logical grouping of related settings.

**How it works within everything:** This object is exported globally and used by `auth.js`, `api.js`, `login.js`, and `dashboard.js` to access configuration values.

---

### Lines 7-8: API Base URL Configuration
```javascript
    // API base URL - can be configured via environment variable or directly here
    apiBaseUrl: window.ENV_API_BASE_URL || 'http://localhost:8080',
```
**What it does:** Sets the base URL for all API requests, with support for runtime environment variable override.

**Why it was chosen:** 
- The fallback pattern (`||`) allows flexibility for different deployment environments
- Using `window.ENV_API_BASE_URL` enables dynamic configuration without code changes
- Default to `localhost:8080` provides a sensible development default

**How it works within everything:** The `API` object in `api.js` uses this value to construct full API endpoint URLs. This enables the application to work in different environments (development, staging, production) by simply setting `window.ENV_API_BASE_URL` before loading scripts.

---

### Lines 10-11: Session Timeout Configuration
```javascript
    // Session timeout in milliseconds (30 minutes)
    sessionTimeout: 30 * 60 * 1000,
```
**What it does:** Defines how long a user session remains active before automatic logout (30 minutes = 1,800,000 milliseconds).

**Why it was chosen:**
- 30 minutes is a security best practice for banking applications - balances security with user convenience
- Expressing as `30 * 60 * 1000` makes the value self-documenting (30 minutes × 60 seconds × 1000 milliseconds)
- Storing in milliseconds matches JavaScript's `setTimeout` and `Date` API expectations

**How it works within everything:** Used by `Auth.setSessionTimeout()` in `auth.js` to automatically log out inactive users and prevent unauthorized access to stale sessions.

---

### Lines 13-14: Token Storage Key
```javascript
    // JWT token key in session storage
    tokenKey: 'meridian_auth_token',
```
**What it does:** Defines the key name used to store the JWT authentication token in browser sessionStorage.

**Why it was chosen:**
- Prefixed with `meridian_` to prevent naming conflicts with other applications
- Descriptive name `auth_token` clearly indicates its purpose
- Using a centralized constant prevents typos and makes it easy to change if needed

**How it works within everything:** Used by `Auth.login()`, `Auth.getToken()`, and `Auth.logout()` in `auth.js` to consistently store and retrieve the authentication token.

---

### Lines 16-17: User Data Storage Key
```javascript
    // User data key in session storage
    userKey: 'meridian_user_data',
```
**What it does:** Defines the key name for storing user information in sessionStorage.

**Why it was chosen:**
- Consistent naming convention with `tokenKey`
- Centralized definition ensures all code uses the same key
- SessionStorage (not localStorage) ensures data is cleared when the browser tab closes for security

**How it works within everything:** Used by `Auth.login()` and `Auth.getUserData()` in `auth.js` to store and retrieve user profile information (name, ID, etc.), which is then displayed in `dashboard.js`.

---

### Lines 19-20: Credentials Storage Key
```javascript
    // Credentials key in session storage (for mock auth)
    credentialsKey: 'meridian_credentials'
```
**What it does:** Defines the key for storing user credentials in sessionStorage (used for demo/mock authentication scenarios).

**Why it was chosen:**
- Supports mock authentication flows during development
- Comment indicates this is for "mock auth" to clarify it's not production-grade security
- Consistent naming pattern with other storage keys

**How it works within everything:** Used by `Auth.getCredentials()` in `auth.js`. In production systems, credentials should never be stored in browser storage; this is only for development/demo purposes.

---

### Line 21: Closing Configuration Object
```javascript
};
```
**What it does:** Closes the configuration object definition.

**Why it was chosen:** Standard JavaScript object syntax.

**How it works within everything:** Completes the object literal containing all configuration values.

---

### Lines 23-26: Global Export
```javascript
// Allow configuration via window object for easy overrides
if (typeof window !== 'undefined') {
    window.MeridianConfig = config;
}
```
**What it does:** Makes the configuration object globally accessible via `window.MeridianConfig`.

**Why it was chosen:**
- **Browser safety check:** `typeof window !== 'undefined'` prevents errors if this file is ever loaded in a Node.js environment or during testing
- **Global namespace:** Attaching to `window` makes the config accessible across all scripts without module bundlers
- **Named export:** Using `MeridianConfig` instead of just `config` prevents naming conflicts

**How it works within everything:** This enables other scripts (`auth.js`, `api.js`, etc.) to reference configuration via the global `config` variable. The explicit export also allows external override if needed (e.g., `window.MeridianConfig.apiBaseUrl = 'https://api.meridianbank.com'`).

---

## Integration Points

### Files that depend on config.js:
1. **auth.js** - Uses `config.tokenKey`, `config.userKey`, `config.credentialsKey`, and `config.sessionTimeout`
2. **api.js** - Uses `config.apiBaseUrl` to construct API request URLs
3. **login.js** - Uses `config.apiBaseUrl` for the authentication endpoint
4. **dashboard.js** - Indirectly uses config through Auth and API modules

### Load Order:
Must be loaded **first** before any other JavaScript files, as documented in both `index.html` (line 57) and `dashboard.html` (line 44):
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
<script src="js/api.js"></script>
```

---

## Design Patterns Used

1. **Single Configuration Object:** All settings in one place for easy maintenance
2. **Environment Variable Override:** Supports runtime configuration without code changes
3. **Namespace Prefixing:** All storage keys prefixed with `meridian_` to prevent conflicts
4. **Self-Documenting Values:** Time calculations like `30 * 60 * 1000` show intent
5. **Defensive Coding:** `typeof window` check prevents runtime errors in non-browser environments

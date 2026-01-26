# auth.js Documentation

**File Path:** `js/auth.js`

**Purpose:** Authentication and session management utilities for the Meridian Bank UI. Handles JWT token storage, user data management, session timeouts, and route protection.

---

## Code Documentation

### Lines 1-4: File Header Comment
```javascript
/**
 * Authentication utilities for Meridian Bank UI
 * Handles JWT token management, session storage, and authentication state
 */
```
**What it does:** Documents the file's purpose using JSDoc format.

**Why it was chosen:** Clear documentation helps developers understand the authentication responsibilities at a glance.

**How it works within everything:** Sets expectations that this module is the single source of truth for authentication state.

---

### Line 6: Auth Object Declaration
```javascript
const Auth = {
```
**What it does:** Creates a namespace object to hold all authentication-related methods.

**Why it was chosen:**
- Object literal pattern provides a simple module structure without requiring build tools
- Groups related functionality together
- Avoids polluting the global namespace with individual functions

**How it works within everything:** This object is exported globally (line 122-124) and used by `login.js`, `dashboard.js`, and `api.js` for authentication operations.

---

### Lines 7-23: login() Method
```javascript
    /**
     * Store authentication token and user data
     * @param {string} token - JWT token from backend
     * @param {Object} userData - User data
     */
    login(token, userData) {
        // Store JWT token
        sessionStorage.setItem(config.tokenKey, token);
        
        // Store user data
        if (userData) {
            sessionStorage.setItem(config.userKey, JSON.stringify(userData));
        }
        
        // Set session timeout
        this.setSessionTimeout();
    },
```
**What it does:** 
- Stores JWT token in sessionStorage
- Stores user data as JSON string
- Initiates session timeout timer

**Why it was chosen:**
- **sessionStorage over localStorage:** Data is automatically cleared when the tab closes, improving security
- **JSON.stringify for userData:** Converts objects to strings for storage
- **Conditional userData storage:** Handles cases where only token is provided
- **Automatic timeout setup:** Ensures security by starting the timeout immediately

**How it works within everything:** Called by `login.js` (line 151) after successful authentication. The stored token is then used by `api.js` for API authorization headers, and user data is used by `dashboard.js` to display user information.

---

### Lines 25-39: generateMockJWT() Method
```javascript
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
```
**What it does:** Creates a JWT-formatted token for client-side state management.

**Why it was chosen:**
- **Mock token for UI:** When backend doesn't provide JWT tokens, this creates a client-side token for session management
- **Standard JWT structure:** Three base64-encoded parts (header.payload.signature) match real JWT format
- **Includes expiration:** `exp` claim enables client-side session validation
- **btoa() for encoding:** Standard browser API for base64 encoding

**Why this approach:**
- The comment explicitly states this is NOT security - it's for UI state management
- Real authentication happens on each API call (likely via Basic Auth headers)
- Allows the frontend to track session state without backend JWT support

**How it works within everything:** Currently not actively used in the codebase, but provides a fallback mechanism if JWT tokens need to be generated client-side.

---

### Lines 41-48: getCredentials() Method
```javascript
    /**
     * Get stored credentials
     * @returns {Object|null} Credentials object or null
     */
    getCredentials() {
        const stored = sessionStorage.getItem(config.credentialsKey);
        return stored ? JSON.parse(stored) : null;
    },
```
**What it does:** Retrieves stored credentials from sessionStorage.

**Why it was chosen:**
- **Null-safe return:** Returns `null` if no credentials exist instead of throwing errors
- **JSON.parse:** Converts stored string back to object
- **Ternary operator:** Concise conditional logic

**How it works within everything:** Allows retrieval of stored credentials for mock authentication scenarios. Not used in production - credentials should not be stored in browser storage in real applications.

---

### Lines 50-57: getUserData() Method
```javascript
    /**
     * Get stored user data
     * @returns {Object|null} User data object or null
     */
    getUserData() {
        const stored = sessionStorage.getItem(config.userKey);
        return stored ? JSON.parse(stored) : null;
    },
```
**What it does:** Retrieves stored user data from sessionStorage and parses it.

**Why it was chosen:**
- **Consistent pattern:** Same pattern as `getCredentials()` for maintainability
- **Safe parsing:** Returns `null` if no data exists
- **Single responsibility:** Just retrieval, no side effects

**How it works within everything:** Called by `dashboard.js` (line 143) to get user information for display. The data was stored during login by the `login()` method.

---

### Lines 59-65: getToken() Method
```javascript
    /**
     * Get authentication token
     * @returns {string|null} JWT token or null
     */
    getToken() {
        return sessionStorage.getItem(config.tokenKey);
    },
```
**What it does:** Retrieves the JWT token from sessionStorage.

**Why it was chosen:**
- **Simple retrieval:** No parsing needed since tokens are stored as strings
- **Returns null if not found:** `getItem()` naturally returns `null` for missing keys

**How it works within everything:** Used by:
- `isAuthenticated()` to check if user is logged in
- `getAuthHeader()` to construct Authorization headers
- `api.js` (line 26) to determine if auth headers should be added

---

### Lines 67-74: isAuthenticated() Method
```javascript
    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    isAuthenticated() {
        const token = this.getToken();
        return !!token;
    },
```
**What it does:** Determines if a user has an active session.

**Why it was chosen:**
- **Boolean coercion:** `!!` converts truthy/falsy values to explicit boolean
- **Simple check:** Just verifies token exists, doesn't validate expiration
- **Delegation:** Uses `getToken()` to avoid duplication

**How it works within everything:** Core authentication check used by:
- `login.js` (line 9) to redirect already-logged-in users
- `dashboard.js` (line 8) via `requireAuth()` to protect routes
- `api.js` (line 26) to decide whether to add Authorization headers

---

### Lines 76-85: logout() Method
```javascript
    /**
     * Logout user and clear session
     */
    logout() {
        sessionStorage.removeItem(config.tokenKey);
        sessionStorage.removeItem(config.userKey);
        
        // Redirect to login page
        window.location.href = 'index.html';
    },
```
**What it does:** 
- Removes authentication token from sessionStorage
- Removes user data from sessionStorage
- Redirects to login page

**Why it was chosen:**
- **Complete cleanup:** Removes all authentication-related data
- **Immediate redirect:** Prevents users from staying on protected pages
- **Simple navigation:** Uses `window.location.href` for full page reload

**Why not just clear token:** Removing user data prevents any sensitive information from remaining in storage.

**How it works within everything:** Called by:
- `dashboard.js` (line 179) when user clicks logout button
- `api.js` (line 45) when 401 Unauthorized response is received
- Session timeout handler (line 98) when session expires

---

### Lines 87-100: setSessionTimeout() Method
```javascript
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
```
**What it does:** 
- Clears any existing timeout
- Sets a new timeout to automatically logout after configured duration
- Shows alert before logout

**Why it was chosen:**
- **Memory leak prevention:** Clears old timeout before creating new one (important if `login()` is called multiple times)
- **Private property:** `_timeoutId` convention indicates internal use
- **User notification:** Alert warns user before automatic logout
- **Configurable duration:** Uses `config.sessionTimeout` for flexibility

**Security benefit:** Automatically logs out inactive users after 30 minutes, preventing unauthorized access to abandoned sessions.

**How it works within everything:** Called by `login()` method (line 22) to start the countdown. The timeout is stored in `this._timeoutId` so it can be cleared if the user logs in again.

---

### Lines 102-109: requireAuth() Method
```javascript
    /**
     * Require authentication - redirect to login if not authenticated
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    },
```
**What it does:** Route guard that redirects unauthenticated users to login page.

**Why it was chosen:**
- **Simple guard:** One method call protects entire pages
- **Immediate redirect:** Prevents any unauthorized page rendering
- **Reuses logic:** Calls `isAuthenticated()` for consistency

**Pattern used:** This is a route protection pattern commonly seen in authentication systems.

**How it works within everything:** Called at the top of `dashboard.js` (line 8) to ensure only authenticated users can access the dashboard. This is the primary security mechanism preventing unauthorized access to protected pages.

---

### Lines 111-118: getAuthHeader() Method
```javascript
    /**
     * Get authorization header value for API calls
     * @returns {string} Authorization header value
     */
    getAuthHeader() {
        const token = this.getToken();
        return token ? `Bearer ${token}` : '';
    }
```
**What it does:** Constructs a Bearer token authorization header string.

**Why it was chosen:**
- **Standard format:** `Bearer <token>` is the HTTP standard for JWT authentication
- **Safe handling:** Returns empty string if no token (rather than "Bearer null")
- **Convenience method:** Encapsulates header formatting logic

**How it works within everything:** Used by `api.js` (line 27) to add authentication to API requests:
```javascript
if (Auth.isAuthenticated()) {
    defaultHeaders['Authorization'] = Auth.getAuthHeader();
}
```

---

### Lines 120-124: Global Export
```javascript
// Make Auth available globally
if (typeof window !== 'undefined') {
    window.Auth = Auth;
}
```
**What it does:** Exports the Auth object to the global window namespace.

**Why it was chosen:**
- **Browser compatibility:** Check prevents errors in non-browser environments (testing, SSR)
- **Global access:** Makes Auth available to all scripts without module system
- **Named export:** `window.Auth` is clear and unlikely to conflict

**How it works within everything:** Allows `login.js`, `dashboard.js`, and `api.js` to access Auth methods via the global `Auth` variable.

---

## Integration Points

### Dependencies:
- **config.js** - Uses `config.tokenKey`, `config.userKey`, `config.credentialsKey`, and `config.sessionTimeout`

### Used by:
1. **login.js** - Calls `Auth.isAuthenticated()`, `Auth.login()`
2. **dashboard.js** - Calls `Auth.requireAuth()`, `Auth.getUserData()`, `Auth.logout()`
3. **api.js** - Calls `Auth.isAuthenticated()`, `Auth.getAuthHeader()`, `Auth.logout()`

### Load Order:
Must be loaded after `config.js` but before `api.js`, `login.js`, and `dashboard.js`:
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
<script src="js/api.js"></script>
<script src="js/login.js"></script>
```

---

## Security Considerations

1. **sessionStorage vs localStorage:** Uses sessionStorage so data is cleared when tab closes
2. **No credential storage:** Production apps should never store passwords (mock only for demo)
3. **Session timeout:** 30-minute automatic logout prevents abandoned session access
4. **Route protection:** `requireAuth()` prevents unauthorized page access
5. **Token-based auth:** JWT tokens are more secure than session cookies for SPAs

---

## Design Patterns

1. **Module Pattern:** Object literal groups related authentication functions
2. **Facade Pattern:** Provides simple interface to complex sessionStorage operations
3. **Guard Pattern:** `requireAuth()` prevents access to protected resources
4. **Singleton Pattern:** One global Auth instance serves entire application

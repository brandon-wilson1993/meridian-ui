# api.js Documentation

**File Path:** `js/api.js`

**Purpose:** Centralized API client for communicating with the Meridian Bank backend. Handles HTTP requests, error handling, authentication headers, and provides organized methods for user and account operations.

---

## Code Documentation

### Lines 1-4: File Header Comment
```javascript
/**
 * API Client for Meridian Bank Backend
 * Handles all API requests to the meridian backend
 */
```
**What it does:** Documents the file's purpose.

**Why it was chosen:** Clear documentation establishes this as the single point for all backend communication.

**How it works within everything:** Sets expectations that all API calls should go through this module for consistency.

---

### Lines 6-8: Debug Console Logs
```javascript
console.log('api.js loading...');
console.log('config available:', typeof config !== 'undefined');
console.log('Auth available:', typeof Auth !== 'undefined');
```
**What it does:** Logs initialization status and dependency availability.

**Why it was chosen:**
- **Dependency validation:** Confirms `config` and `Auth` are loaded before this script
- **Load order debugging:** Helps diagnose script loading issues
- **Development aid:** Visible in browser console during development

**How it works within everything:** These logs should print during page load if scripts are loaded in correct order (config → auth → api). If dependencies are missing, these logs help identify the problem.

---

### Line 10: API Object Declaration
```javascript
const API = {
```
**What it does:** Creates a namespace object to organize all API-related functionality.

**Why it was chosen:**
- **Namespace pattern:** Prevents global scope pollution
- **Organized structure:** Groups related API methods logically
- **Extensible:** Easy to add new API categories (users, accounts, transactions, etc.)

**How it works within everything:** Exported globally (lines 153-156) and used by `login.js` and `dashboard.js` to make backend requests.

---

### Lines 11-71: request() Method - Core Fetch Wrapper

#### Method Signature (Lines 11-16)
```javascript
    /**
     * Make a fetch request with proper headers and error handling
     * @param {string} endpoint - API endpoint (relative to base URL)
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async request(endpoint, options = {}) {
```
**What it does:** Provides a reusable wrapper around the Fetch API.

**Why it was chosen:**
- **DRY principle:** Centralizes common request logic (headers, error handling, auth)
- **Async/await:** Modern promise handling for cleaner code
- **Default parameter:** `options = {}` allows simple GET requests without passing options

**How it works within everything:** All API methods (getById, create, etc.) use this method internally.

---

#### URL Construction (Lines 17-19)
```javascript
        const url = `${config.apiBaseUrl}${endpoint}`;
        console.log('API request to:', url);
```
**What it does:** Builds full URL by combining base URL with endpoint path.

**Why it was chosen:**
- **Centralized base URL:** Changing `config.apiBaseUrl` updates all API calls
- **Template literals:** Clean string concatenation
- **Debug logging:** Helps trace API calls during development

**How it works within everything:** For example, if `config.apiBaseUrl = 'http://localhost:8080'` and `endpoint = '/users/1'`, the final URL is `'http://localhost:8080/users/1'`.

---

#### Default Headers (Lines 21-23)
```javascript
        const defaultHeaders = {
            'Content-Type': 'application/json'
        };
```
**What it does:** Sets JSON content type for all requests.

**Why it was chosen:**
- **Standard REST API:** Most modern APIs expect and return JSON
- **Consistency:** All requests use same content type
- **Explicit declaration:** Server knows request body format

**How it works within everything:** Merged with custom headers in line 32-35.

---

#### Authentication Header (Lines 25-28)
```javascript
        // Add authorization header if authenticated
        if (Auth.isAuthenticated()) {
            defaultHeaders['Authorization'] = Auth.getAuthHeader();
        }
```
**What it does:** Automatically adds Bearer token to requests for logged-in users.

**Why it was chosen:**
- **Automatic auth:** Developers don't need to manually add tokens to each request
- **Conditional:** Only adds header if user is authenticated (some endpoints may be public)
- **Delegation:** Uses `Auth` module for token management

**How it works within everything:** For authenticated requests, adds header like `Authorization: Bearer <token>`. Backend validates this token to authorize the request.

---

#### Merge Options (Lines 30-36)
```javascript
        const fetchOptions = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };
```
**What it does:** Merges default headers with caller-provided options.

**Why it was chosen:**
- **Spread operator:** Clean way to merge objects
- **Override capability:** Caller can override default headers if needed
- **Order matters:** `...options.headers` comes last, so custom headers override defaults

**How it works within everything:** For example, POST requests can provide `method: 'POST'` and `body` while inheriting default headers.

---

#### Try-Catch Block (Line 38)
```javascript
        try {
            const response = await fetch(url, fetchOptions);
```
**What it does:** Makes HTTP request and catches network errors.

**Why it was chosen:**
- **Error handling:** Network failures don't crash the app
- **Await:** Pauses execution until response arrives
- **Clean syntax:** try-catch is more readable than promise .catch()

**How it works within everything:** If network fails or response is received, execution continues to appropriate handler.

---

#### HTTP Error Handling (Lines 41-59)
```javascript
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
```
**What it does:**
- Checks if response status indicates error (4xx, 5xx)
- Special handling for 401 Unauthorized - logs user out
- Attempts to extract error message from response body
- Falls back to generic error message if parsing fails

**Why it was chosen:**
- **Session expiration handling:** 401 for authenticated users indicates expired token
- **User-friendly errors:** Shows backend error messages instead of generic failures
- **Nested try-catch:** Prevents error parsing failures from masking original error
- **Explicit logout:** Prevents authenticated users from being stuck on 401 errors

**How it works within everything:** If backend returns 401 while user has a token, their session has expired and they're logged out. Otherwise, error messages from backend (like validation errors) are shown to users.

---

#### Success Response Parsing (Lines 61-63)
```javascript
            // Parse JSON response
            const data = await response.json();
            return data;
```
**What it does:** Parses successful response body as JSON and returns it.

**Why it was chosen:**
- **Automatic parsing:** Callers receive objects, not raw response
- **Await:** Ensures JSON parsing completes before returning
- **Simple return:** Clean interface for callers

**How it works within everything:** API methods receive parsed objects directly (e.g., user object, array of accounts).

---

#### Network Error Handling (Lines 64-70)
```javascript
        } catch (error) {
            // Network error or other issues
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Unable to connect to server. Please check your connection and try again.');
            }
            throw error;
        }
```
**What it does:** Catches network errors and provides user-friendly messages.

**Why it was chosen:**
- **User-friendly messages:** "Failed to fetch" is technical; "Unable to connect" is clear
- **Connection issues:** Helps users understand the problem
- **Re-throw:** Preserves other error types (like session expired)

**How it works within everything:** If user is offline or backend is down, they see a helpful message instead of a cryptic error.

---

### Lines 73-123: users Object - User API Methods

#### Object Declaration (Lines 76)
```javascript
    users: {
```
**What it does:** Groups all user-related API methods.

**Why it was chosen:**
- **Logical organization:** All user operations in one place
- **Namespace:** `API.users.getById()` is self-documenting
- **Extensible:** Easy to add more user methods

**How it works within everything:** Accessed as `API.users.getById()`, `API.users.create()`, etc.

---

#### getById() Method (Lines 77-84)
```javascript
        /**
         * Get user by ID
         * @param {number} userId - User ID
         * @returns {Promise<Object>} User object
         */
        async getById(userId) {
            return API.request(`/users/${userId}`);
        },
```
**What it does:** Fetches a single user by their ID.

**Why it was chosen:**
- **RESTful pattern:** GET /users/:id is standard REST convention
- **Delegation:** Uses `request()` for consistency
- **Simple interface:** Just provide ID, get user object

**How it works within everything:** Could be used to fetch user details, though currently the app stores user data in session.

---

#### getAll() Method (Lines 86-92)
```javascript
        /**
         * Get all users
         * @returns {Promise<Array>} Array of user objects
         */
        async getAll() {
            return API.request('/users');
        },
```
**What it does:** Fetches all users from the backend.

**Why it was chosen:**
- **RESTful pattern:** GET /users returns collection
- **Admin functionality:** Useful for admin dashboards or user management

**How it works within everything:** Not currently used in the UI, but available for future admin features.

---

#### create() Method (Lines 94-104)
```javascript
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
```
**What it does:** Creates a new user via POST request.

**Why it was chosen:**
- **RESTful pattern:** POST /users for creation
- **JSON.stringify:** Converts object to JSON string for transmission
- **Returns created user:** Backend typically returns the created object with ID

**How it works within everything:** Could be used for user registration, though not currently implemented in the UI.

---

#### findByUsername() Method (Lines 106-123)
```javascript
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
        }
```
**What it does:** Finds a user by username using query parameter.

**Why it was chosen:**
- **Query parameter:** `?username=...` is standard for filtering
- **encodeURIComponent:** Safely handles special characters in usernames
- **Server-side filtering:** More efficient than fetching all users and filtering client-side
- **Flexible response handling:** Works whether backend returns array or single object
- **Null-safe:** Returns `null` for "not found" instead of undefined

**Why array handling:** Different backends may return `[]` (empty array) or `[user]` (single-item array) for query results.

**How it works within everything:** Could be used for username lookup during authentication or user search features.

---

### Lines 125-150: accounts Object - Account API Methods

#### Object Declaration (Line 128)
```javascript
    accounts: {
```
**What it does:** Groups all account-related API methods.

**Why it was chosen:**
- **Logical grouping:** Separates account operations from user operations
- **Clear namespace:** `API.accounts.getByUserId()` is self-documenting

**How it works within everything:** Used by `dashboard.js` to fetch user accounts.

---

#### getByUserId() Method (Lines 129-136)
```javascript
        /**
         * Get all accounts for a user
         * @param {number} userId - User ID
         * @returns {Promise<Array>} Array of account objects
         */
        async getByUserId(userId) {
            return API.request(`/users/${userId}/accounts`);
        },
```
**What it does:** Fetches all accounts belonging to a specific user.

**Why it was chosen:**
- **Nested resource pattern:** `/users/:userId/accounts` indicates accounts belong to a user
- **RESTful convention:** Standard way to represent parent-child relationships
- **Returns array:** Users can have multiple accounts

**How it works within everything:** Called by `dashboard.js` (line 153) to display user's accounts:
```javascript
const accounts = await API.accounts.getByUserId(userData.id);
```

---

#### create() Method (Lines 138-149)
```javascript
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
```
**What it does:** Creates a new account for a user.

**Why it was chosen:**
- **Nested resource creation:** POST to `/users/:userId/accounts`
- **Parameterized:** Takes both userId and account data
- **RESTful pattern:** Standard way to create child resources

**How it works within everything:** Not currently used in the UI, but available for account creation features.

---

### Lines 151-156: Closing and Global Export
```javascript
};

// Make API available globally
if (typeof window !== 'undefined') {
    window.API = API;
}
```
**What it does:** Closes the API object and exports it globally.

**Why it was chosen:**
- **Browser safety check:** Prevents errors in non-browser environments
- **Global namespace:** Makes API accessible to all scripts
- **Named export:** `window.API` is clear and descriptive

**How it works within everything:** Allows `login.js` and `dashboard.js` to call API methods.

---

### Lines 158: Final Debug Log
```javascript
console.log('api.js loaded successfully');
```
**What it does:** Confirms successful loading.

**Why it was chosen:** Helps verify script loaded without errors during development.

**How it works within everything:** Appears in browser console when page loads.

---

## Integration Points

### Dependencies:
- **config.js** - Uses `config.apiBaseUrl` for API URL construction
- **auth.js** - Uses `Auth.isAuthenticated()`, `Auth.getAuthHeader()`, `Auth.logout()`

### Used by:
1. **login.js** - Uses `fetch` directly for login (could use `API.request` instead)
2. **dashboard.js** - Uses `API.accounts.getByUserId()` to fetch accounts

### Load Order:
Must load after config.js and auth.js:
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
<script src="js/api.js"></script>
```

---

## API Design Patterns

1. **Centralized Request Handling:** All requests go through `request()` method
2. **Automatic Authentication:** Auth headers added automatically for authenticated requests
3. **RESTful Conventions:** Standard HTTP methods and URL patterns
4. **Resource Organization:** Logical grouping (users, accounts) for scalability
5. **Error Handling:** Consistent error handling across all requests
6. **DRY Principle:** Common logic (headers, error handling) not repeated

---

## Error Handling Strategy

1. **Network Errors:** User-friendly message for connection issues
2. **HTTP Errors:** Extract message from response body when possible
3. **Session Expiration:** Automatic logout on 401 for authenticated users
4. **Fallback Messages:** Generic error if specific message unavailable
5. **Error Propagation:** Throws errors for callers to handle in UI

---

## Future Enhancements

The structure supports easy addition of:
- Transaction API methods: `API.transactions.getByAccountId()`
- Transfer API methods: `API.transfers.create()`
- Settings API methods: `API.settings.update()`
- Pagination support in request() method
- Request retry logic for failed requests
- Request cancellation with AbortController

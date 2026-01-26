# login.js Documentation

**File Path:** `js/login.js`

**Purpose:** Login page logic for Meridian Bank UI. Handles form validation, user input, authentication flow, loading states, and error display.

---

## Code Documentation

### Lines 1-3: File Header Comment
```javascript
/**
 * Login page logic for Meridian Bank UI
 */
```
**What it does:** Brief description of the file's purpose.

**Why it was chosen:** Concise header for page-specific logic.

**How it works within everything:** Indicates this is UI-specific code tied to `index.html`.

---

### Line 5: DOMContentLoaded Event Listener
```javascript
document.addEventListener('DOMContentLoaded', () => {
```
**What it does:** Waits for HTML document to be fully parsed before executing JavaScript.

**Why it was chosen:**
- **Safe DOM access:** Ensures all HTML elements exist before trying to access them
- **Standard pattern:** Prevents "element not found" errors
- **Browser compatibility:** Works in all modern browsers

**Why not just put script at end of body?** While scripts at the end work, `DOMContentLoaded` is more explicit about the dependency and is considered best practice for DOM-dependent code.

**How it works within everything:** This ensures elements like `#loginForm`, `#username`, etc. are available before the code tries to access them.

---

### Line 6: Debug Log
```javascript
    console.log('login.js loaded');
```
**What it does:** Logs when the script initializes.

**Why it was chosen:** Development aid for debugging script loading issues.

**How it works within everything:** Appears in browser console when page loads.

---

### Lines 8-12: Authentication Check and Redirect
```javascript
    // Check if already authenticated
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }
```
**What it does:** Redirects already-logged-in users to dashboard.

**Why it was chosen:**
- **Better UX:** Logged-in users shouldn't see login page
- **Early exit:** `return` prevents rest of code from executing
- **Session persistence:** Works across page refreshes

**How it works within everything:** If user navigates to login page while logged in (e.g., via back button), they're immediately sent to dashboard. This prevents confusion and improves user experience.

---

### Lines 14-20: DOM Element References
```javascript
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const buttonText = loginButton.querySelector('.btn-text');
    const loadingSpinner = loginButton.querySelector('.loading-spinner');
```
**What it does:** Caches references to DOM elements.

**Why it was chosen:**
- **Performance:** Query DOM once, use many times
- **Readability:** Clear variable names instead of repeated `document.getElementById()`
- **Error detection:** If elements missing, we'll know early
- **querySelector for nested elements:** More efficient for finding elements within loginButton

**How it works within everything:** These elements are defined in `index.html` (lines 17, 20, 23, 33, 42, 44-46). Caching them allows fast access throughout the script.

---

### Line 22: Debug Log for Element Validation
```javascript
    console.log('Elements found:', { loginForm, usernameInput, passwordInput, loginButton });
```
**What it does:** Logs element references to verify they exist.

**Why it was chosen:**
- **Debugging aid:** Quick way to verify DOM elements are found
- **Development tool:** Helps diagnose issues if elements are null
- **Object shorthand:** `{ loginForm }` is same as `{ loginForm: loginForm }`

**How it works within everything:** In browser console, you'll see which elements were successfully found or which are `null`.

---

### Lines 24-37: showError() and hideError() Helper Functions
```javascript
    /**
     * Show error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
    
    /**
     * Hide error message
     */
    function hideError() {
        errorMessage.classList.add('hidden');
    }
```
**What it does:** 
- `showError()`: Sets error message text and makes it visible
- `hideError()`: Hides error message

**Why it was chosen:**
- **Reusable functions:** Called multiple times throughout the code
- **Single responsibility:** Each function does one thing well
- **Encapsulation:** Hide implementation details of showing/hiding errors
- **CSS classes:** Uses `.hidden` class from `styles.css` (line 196-198)

**How it works within everything:** These functions are called when:
- Validation fails (line 65, 70, 76)
- Login fails (line 122, 145, 157)
- User types in inputs (line 163-164)

---

### Lines 39-55: Loading State Functions
```javascript
    /**
     * Show loading state
     */
    function showLoading() {
        loginButton.disabled = true;
        buttonText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
    }
    
    /**
     * Hide loading state
     */
    function hideLoading() {
        loginButton.disabled = false;
        buttonText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
```
**What it does:**
- `showLoading()`: Disables button, hides text, shows spinner
- `hideLoading()`: Re-enables button, shows text, hides spinner

**Why it was chosen:**
- **UX improvement:** Visual feedback during API call
- **Prevent double-submit:** Disabled button prevents multiple login attempts
- **Professional appearance:** Loading spinner indicates progress
- **State management:** Ensures button is in correct state

**How it works within everything:** 
- Called when login starts (line 104)
- Reverted when login completes or fails (line 123, 146, 158)
- The spinner HTML structure is defined in `index.html` (line 46)
- Spinner animation defined in `styles.css` (lines 161-174)

---

### Lines 57-81: Form Validation Function
```javascript
    /**
     * Validate form inputs
     */
    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!username) {
            showError('Please enter your username');
            return false;
        }
        
        if (!password) {
            showError('Please enter your password');
            return false;
        }
        
        const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordPolicyRegex.test(password)) {
            showError('Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one special character');
            return false;
        }
        
        return true;
    }
```
**What it does:** Validates username and password meet requirements.

**Why it was chosen:**
- **Client-side validation:** Quick feedback without server round-trip
- **User experience:** Helps users correct mistakes before submission
- **Security best practice:** Enforces password policy
- **trim() for username:** Removes accidental whitespace
- **No trim() for password:** Passwords can intentionally start/end with spaces

#### Password Regex Breakdown (Line 74)
```javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/
```
- `^` - Start of string
- `(?=.*[a-z])` - Positive lookahead: must contain at least one lowercase letter
- `(?=.*[A-Z])` - Positive lookahead: must contain at least one uppercase letter
- `(?=.*[^A-Za-z0-9])` - Positive lookahead: must contain at least one special character
- `.{8,}` - Must be at least 8 characters long
- `$` - End of string

**Why this regex:** Enforces strong password policy matching banking security requirements.

**How it works within everything:** Called before login attempt (line 93) to ensure data quality and provide immediate feedback.

---

### Lines 83-160: Login Form Submit Handler

#### Event Listener Setup (Line 86)
```javascript
    loginForm.addEventListener('submit', async (e) => {
```
**What it does:** Attaches async handler to form submission.

**Why it was chosen:**
- **Form submit event:** Triggered by Enter key or button click
- **Async function:** Allows `await` for API calls
- **Arrow function:** Concise syntax with correct `this` binding

**How it works within everything:** When user clicks "Login" or presses Enter in form, this handler executes.

---

#### Prevent Default and Debug Logs (Lines 87-89)
```javascript
        console.log('Submit event fired');
        e.preventDefault();
        console.log('preventDefault called');
```
**What it does:** 
- Logs submission start
- Prevents form from doing browser default (page reload)
- Logs after prevention

**Why it was chosen:**
- **preventDefault:** Required for SPA - prevents page reload
- **Debug logs:** Help diagnose submission issues during development

**How it works within everything:** Without `preventDefault()`, form would submit to server and reload page, breaking the single-page application.

---

#### Validation and Early Exit (Lines 90-96)
```javascript
        hideError();
        
        // Validate form
        if (!validateForm()) {
            console.log('Validation failed');
            return;
        }
```
**What it does:** Hides previous errors, validates form, exits if invalid.

**Why it was chosen:**
- **Clear old errors:** Don't show stale error messages
- **Early exit:** Don't make API call if validation fails
- **Log validation failure:** Debugging aid

**How it works within everything:** If validation fails, function returns early and user sees validation error message.

---

#### Extract Form Values (Lines 98-99)
```javascript
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
```
**What it does:** Extracts username and password from inputs.

**Why it was chosen:**
- **trim() username:** Remove whitespace that would cause login to fail
- **No trim() password:** Preserve intentional spaces in passwords

**How it works within everything:** These values are sent to the authentication endpoint.

---

#### Debug Logs (Lines 101-102)
```javascript
        console.log('Attempting login for:', username);
        console.log('API URL:', `${config.apiBaseUrl}/auth`);
```
**What it does:** Logs username and API endpoint URL.

**Why it was chosen:**
- **Development debugging:** Verify correct username and URL
- **Don't log password:** Security best practice - never log sensitive data

**How it works within everything:** Helps diagnose authentication issues without exposing credentials.

---

#### Show Loading State (Line 104)
```javascript
        showLoading();
```
**What it does:** Activates loading state (disables button, shows spinner).

**Why it was chosen:** Provide visual feedback that login is in progress.

**How it works within everything:** User sees spinner and can't click button again while request is pending.

---

#### Try-Catch Block and Fetch Request (Lines 106-116)
```javascript
        try {
            // Authenticate by calling the backend login endpoint, which validates
            // the credentials and returns a JWT token and user data.
            console.log('Making fetch request...');
            const response = await fetch(`${config.apiBaseUrl}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
```
**What it does:** Makes POST request to `/auth` endpoint with credentials.

**Why it was chosen:**
- **Fetch API:** Modern, promise-based HTTP client
- **POST method:** Standard for authentication (credentials in body, not URL)
- **JSON Content-Type:** Indicates request body format
- **JSON.stringify:** Converts object to JSON string
- **try-catch:** Handles network errors gracefully

**Why not use API.request():** This predates authentication, so can't use auth headers. Direct fetch is appropriate here.

**How it works within everything:** Backend validates credentials and returns JWT token if valid.

---

#### Response Status Check (Lines 118-125)
```javascript
            console.log('Response received:', response.status, response.ok);

            if (!response.ok) {
                // For security, do not reveal whether username or password was incorrect
                showError('Invalid username or password');
                hideLoading();
                return;
            }
```
**What it does:** Checks if authentication succeeded.

**Why it was chosen:**
- **Security:** Generic error message doesn't reveal if username or password was wrong
- **Early exit:** Don't process response if authentication failed
- **hideLoading():** Re-enable button so user can try again

**Why generic error:** Revealing "username not found" vs "wrong password" helps attackers enumerate valid usernames.

**How it works within everything:** Failed authentication shows error and stops execution.

---

#### Parse Response and Extract Token (Lines 127-132)
```javascript
            const responseData = await response.json();
            console.log('Response data:', responseData);
            console.log('Response keys:', Object.keys(responseData));

            // Extract token
            const token = responseData.token || responseData.accessToken || responseData;
```
**What it does:** 
- Parses JSON response
- Logs response structure for debugging
- Extracts token with fallback logic

**Why it was chosen:**
- **Flexible token extraction:** Handles different response formats (`token`, `accessToken`, or raw string)
- **Debug logs:** Help diagnose unexpected response formats
- **Object.keys:** Shows response structure without exposing sensitive data

**How it works within everything:** Different backends may return tokens in different formats; this handles multiple patterns.

---

#### Create User Object (Lines 134-138)
```javascript
            // Create user object from the username we already have
            // The backend only returns a token, so we use the login username
            const user = {
                username: username
            };
```
**What it does:** Creates a minimal user object with the username.

**Why it was chosen:**
- **Backend limitation:** Comment explains backend doesn't return user data
- **Minimal data:** Store what we have (username) for display purposes
- **Explicit creation:** Makes it clear this is client-side data, not from server

**How it works within everything:** This user object is stored in session (line 151) and retrieved by dashboard to display user info. In production, backend would typically return full user object (ID, name, email, etc.).

---

#### Token Validation (Lines 140-148)
```javascript
            console.log('Extracted token:', token);
            console.log('Created user:', user);

            if (!token) {
                console.log('Missing token');
                showError('Login failed. Please try again.');
                hideLoading();
                return;
            }
```
**What it does:** Verifies token was successfully extracted.

**Why it was chosen:**
- **Null check:** Prevent proceeding with invalid token
- **User-friendly error:** Don't expose technical details
- **Debug logs:** Help diagnose token extraction issues

**How it works within everything:** If token extraction fails, user sees generic error and can retry.

---

#### Store Authentication Data (Line 150-151)
```javascript
            // Store authentication data (JWT token and user info)
            Auth.login(token, user);
```
**What it does:** Calls `Auth.login()` to store token and user data in sessionStorage.

**Why it was chosen:**
- **Centralized auth management:** Use Auth module instead of direct sessionStorage access
- **Single call:** Stores both token and user data
- **Starts timeout:** Auth.login() also initiates session timeout

**How it works within everything:** Token is now stored and will be included in all API requests. User data is available for dashboard display.

---

#### Successful Redirect (Lines 153-154)
```javascript
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
```
**What it does:** Navigates to dashboard page.

**Why it was chosen:**
- **Full page navigation:** Loads dashboard with clean state
- **Simple redirect:** No need for client-side routing for this simple app

**How it works within everything:** User is now logged in and dashboard will load, calling `Auth.requireAuth()` which will succeed because token exists.

---

#### Error Handling (Lines 155-159)
```javascript
        } catch (error) {
            console.error('Login error:', error);
            showError(error.message || 'Login failed. Please try again.');
            hideLoading();
        }
```
**What it does:** Catches any errors (network, parsing, etc.) and displays them.

**Why it was chosen:**
- **console.error:** Logs full error object for debugging
- **User-friendly display:** Shows error message or fallback
- **hideLoading():** Re-enable form so user can retry
- **Fallback message:** Generic error if message unavailable

**How it works within everything:** Network errors, JSON parsing failures, or other exceptions are caught and shown to user without crashing the app.

---

### Lines 162-164: Input Event Handlers
```javascript
    // Clear error on input
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
```
**What it does:** Hides error message when user starts typing.

**Why it was chosen:**
- **Better UX:** Clear errors as user corrects them
- **Immediate feedback:** User knows system is responsive
- **Input event:** Fires on every keystroke (more responsive than 'change')

**How it works within everything:** If user sees "Invalid username or password" and starts typing, error disappears, indicating they can try again.

---

### Line 165: Closing DOMContentLoaded Callback
```javascript
});
```
**What it does:** Closes the DOMContentLoaded event listener.

**Why it was chosen:** Standard event listener syntax.

**How it works within everything:** All login page logic is scoped within this callback.

---

## Integration Points

### Dependencies:
- **config.js** - Uses `config.apiBaseUrl` for authentication endpoint
- **auth.js** - Uses `Auth.isAuthenticated()` and `Auth.login()`
- **index.html** - Interacts with DOM elements defined in HTML

### Used by:
- None directly (this is a leaf module)

### Load Order:
Must load after config.js and auth.js:
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
<script src="js/api.js"></script>
<script src="js/login.js"></script>
```

---

## Security Considerations

1. **Password not logged:** Only username is logged for debugging
2. **Generic error messages:** Don't reveal if username or password was wrong
3. **Client-side validation:** Enforces password policy before submission
4. **HTTPS recommended:** Credentials transmitted in request body (should use HTTPS in production)
5. **Session timeout:** Auth.login() starts automatic logout timer
6. **No credential storage:** Password never stored in browser (unlike mock auth in auth.js)

---

## UX Features

1. **Loading states:** Visual feedback during authentication
2. **Error display:** Clear, user-friendly error messages
3. **Error clearing:** Errors disappear when user types
4. **Validation feedback:** Immediate validation before submission
5. **Prevent double-submit:** Button disabled during login
6. **Auto-redirect:** Logged-in users can't see login page
7. **Form submission:** Works with Enter key or button click

---

## Design Patterns

1. **Event-Driven Architecture:** Uses browser events for user interactions
2. **Separation of Concerns:** Validation, UI state, and API logic are separate functions
3. **Error Handling:** Try-catch for graceful failure
4. **Progressive Enhancement:** Works without JavaScript (falls back to standard form)
5. **State Management:** Loading states prevent UI inconsistencies

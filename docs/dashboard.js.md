# dashboard.js Documentation

**File Path:** `js/dashboard.js`

**Purpose:** Dashboard page logic for Meridian Bank UI. Displays authenticated user information, fetches and renders account cards, manages loading states, and handles logout functionality.

---

## Code Documentation

### Lines 1-4: File Header Comment
```javascript
/**
 * Dashboard page logic for Meridian Bank UI
 * Displays user information and account list
 */
```
**What it does:** Brief description of the file's purpose.

**Why it was chosen:** Clear documentation for page-specific logic.

**How it works within everything:** Indicates this code is tied to `dashboard.html`.

---

### Line 6: DOMContentLoaded Event Listener
```javascript
document.addEventListener('DOMContentLoaded', () => {
```
**What it does:** Waits for HTML to be fully loaded before executing code.

**Why it was chosen:**
- **Safe DOM access:** Ensures all elements exist before accessing them
- **Standard pattern:** Prevents race conditions with HTML parsing

**How it works within everything:** Guarantees elements like `#userName`, `#accountsList` are available.

---

### Line 8: Route Protection
```javascript
    // Require authentication
    Auth.requireAuth();
```
**What it does:** Redirects unauthenticated users to login page.

**Why it was chosen:**
- **Security:** First line of defense for protected page
- **Simple call:** One line protects entire page
- **Early execution:** Runs before any other logic

**Why at the top:** If user is not authenticated, no point in running rest of code. `Auth.requireAuth()` will redirect to login page (from `auth.js` line 106-108).

**How it works within everything:** This is the primary security mechanism. If user tries to access dashboard without logging in, they're immediately redirected.

---

### Lines 10-16: DOM Element References
```javascript
    const userNameElement = document.getElementById('userName');
    const userGreetingElement = document.getElementById('userGreeting');
    const logoutButton = document.getElementById('logoutButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const accountsList = document.getElementById('accountsList');
    const noAccountsMessage = document.getElementById('noAccounts');
    const errorMessage = document.getElementById('errorMessage');
```
**What it does:** Caches references to DOM elements.

**Why it was chosen:**
- **Performance:** Query DOM once, reuse many times
- **Readability:** Descriptive variable names
- **Error detection:** Null references would be caught early

**How it works within everything:** These elements are defined in `dashboard.html` (lines 15, 24, 16, 27, 34, 38, 32). Caching them enables fast manipulation throughout the script.

---

### Lines 18-26: Account Type Icons Mapping
```javascript
    /**
     * Account type icons (using Unicode characters for simplicity)
     */
    const accountTypeIcons = {
        'CHECKING': '💳',
        'SAVINGS': '💰',
        'CREDIT': '💵',
        'TRADING': '📈'
    };
```
**What it does:** Maps account types to emoji icons.

**Why it was chosen:**
- **Visual appeal:** Icons make cards more engaging
- **No external dependencies:** Unicode emojis work without icon libraries
- **Simple mapping:** Easy to add new account types
- **Consistent display:** All checking accounts get same icon

**How it works within everything:** Used by `createAccountCard()` (line 57) to show appropriate icon for each account type.

---

### Lines 28-42: Error Display Functions
```javascript
    /**
     * Show error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        loadingIndicator.classList.add('hidden');
    }
    
    /**
     * Hide error message
     */
    function hideError() {
        errorMessage.classList.add('hidden');
    }
```
**What it does:**
- `showError()`: Displays error message and hides loading indicator
- `hideError()`: Hides error message

**Why it was chosen:**
- **Reusable functions:** Called from multiple places
- **UI consistency:** Always hide loading when showing error
- **Encapsulation:** Centralizes error display logic

**How it works within everything:** Called when API requests fail (line 162) or when dashboard load fails.

---

### Lines 44-51: Display User Info Function
```javascript
    /**
     * Display user information
     */
    function displayUserInfo(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        userNameElement.textContent = fullName;
        userGreetingElement.textContent = user.firstName;
    }
```
**What it does:** Updates DOM with user's name.

**Why it was chosen:**
- **Separation of concerns:** Separate data manipulation from rendering
- **Template literals:** Clean string concatenation
- **Personalization:** Shows full name in header, first name in greeting

**How it works within everything:** 
- Called by `loadDashboard()` (line 150) with user data from session
- Updates header (line 15 in dashboard.html): "John Doe"
- Updates greeting (line 24 in dashboard.html): "Welcome back, John!"

---

### Lines 53-110: Create Account Card Function

#### Function Declaration and Initial Setup (Lines 53-62)
```javascript
    /**
     * Create account card HTML
     */
    function createAccountCard(account) {
        const icon = accountTypeIcons[account.accountType] || '🏦';
        const accountTypeName = account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase();
        
        const card = document.createElement('div');
        card.className = 'account-card';
        card.setAttribute('data-type', account.accountType);
```
**What it does:**
- Gets icon for account type (fallback to 🏦 bank emoji)
- Converts account type to title case (CHECKING → Checking)
- Creates card div with CSS class and data attribute

**Why it was chosen:**
- **Fallback icon:** Handles unknown account types gracefully
- **Title case conversion:** "CHECKING" looks better as "Checking"
- **data-type attribute:** Enables CSS styling per account type (styles.css lines 368-402)
- **createElement:** Programmatic DOM creation is safer than innerHTML for dynamic content

**How title case works:**
- `charAt(0)` - Get first character ("C")
- `slice(1)` - Get rest ("HECKING")
- `.toLowerCase()` - Convert to lowercase ("hecking")
- Concatenate - "Checking"

**How it works within everything:** Each account gets a styled card matching its type (checking = blue, savings = green, etc.).

---

#### Build Account Header (Lines 64-87)
```javascript
        // Build account header
        const header = document.createElement('div');
        header.className = 'account-header';

        const iconContainer = document.createElement('div');
        iconContainer.className = 'account-icon';
        iconContainer.textContent = icon;

        const typeContainer = document.createElement('div');
        typeContainer.className = 'account-type';

        const typeLabel = document.createElement('div');
        typeLabel.className = 'account-type-label';
        typeLabel.textContent = 'Account';

        const typeName = document.createElement('div');
        typeName.className = 'account-type-name';
        typeName.textContent = accountTypeName;

        typeContainer.appendChild(typeLabel);
        typeContainer.appendChild(typeName);

        header.appendChild(iconContainer);
        header.appendChild(typeContainer);
```
**What it does:** Creates the card header with icon and account type label.

**Why it was chosen:**
- **Semantic structure:** Separate containers for icon and type info
- **CSS class hooks:** Each element has class for styling
- **Hierarchical construction:** Build child elements before appending to parent
- **Explicit DOM manipulation:** More verbose but clearer than template strings

**Structure created:**
```
<div class="account-header">
  <div class="account-icon">💳</div>
  <div class="account-type">
    <div class="account-type-label">Account</div>
    <div class="account-type-name">Checking</div>
  </div>
</div>
```

**How it works within everything:** Styled by CSS in styles.css (lines 316-351) with flexbox layout and type-specific colors.

---

#### Build Account Details (Lines 89-103)
```javascript
        // Build account details
        const details = document.createElement('div');
        details.className = 'account-details';

        const accountIdContainer = document.createElement('div');
        accountIdContainer.className = 'account-id';

        const accountIdLabel = document.createElement('strong');
        accountIdLabel.textContent = 'Account ID:';

        // Add a space between label and ID value
        accountIdContainer.appendChild(accountIdLabel);
        accountIdContainer.appendChild(document.createTextNode(' ' + account.id));

        details.appendChild(accountIdContainer);
```
**What it does:** Creates the details section showing account ID.

**Why it was chosen:**
- **Strong tag:** Makes "Account ID:" label bold
- **Text node:** Safer than innerHTML for displaying user data
- **Explicit space:** `' ' + account.id` ensures spacing between label and value
- **Extensible:** Easy to add more details (balance, account number, etc.)

**Why text node instead of textContent:** Allows mixing formatted elements (strong) with plain text in same container.

**Structure created:**
```
<div class="account-details">
  <div class="account-id">
    <strong>Account ID:</strong> 123
  </div>
</div>
```

**How it works within everything:** Displays account ID in a styled section below the header. Styled by CSS (lines 353-365).

---

#### Assemble and Return Card (Lines 105-110)
```javascript
        // Assemble card
        card.appendChild(header);
        card.appendChild(details);
        
        return card;
    }
```
**What it does:** Combines header and details into complete card, returns it.

**Why it was chosen:**
- **Bottom-up construction:** Build pieces, then assemble
- **Return element:** Caller decides where/when to insert into DOM
- **Clean API:** Function takes account object, returns DOM element

**How it works within everything:** Caller (displayAccounts) adds returned element to `accountsList` container.

---

### Lines 112-132: Display Accounts Function
```javascript
    /**
     * Display accounts list
     */
    function displayAccounts(accounts) {
        accountsList.innerHTML = '';
        
        if (!accounts || accounts.length === 0) {
            noAccountsMessage.classList.remove('hidden');
            return;
        }
        
        noAccountsMessage.classList.add('hidden');
        
        accounts.forEach((account, index) => {
            const card = createAccountCard(account);
            // Add slight delay for animation effect
            setTimeout(() => {
                accountsList.appendChild(card);
            }, index * 100);
        });
    }
```
**What it does:** 
- Clears existing cards
- Shows "no accounts" message if array is empty
- Creates and animates card insertion for each account

**Why it was chosen:**
- **Clear first:** `innerHTML = ''` removes old cards before adding new ones
- **Empty state handling:** Shows helpful message when no accounts exist
- **Staggered animation:** Each card appears 100ms after previous one
- **forEach with index:** Index used for animation timing

**Animation effect:**
- Card 0: appears immediately (0 * 100 = 0ms)
- Card 1: appears after 100ms (1 * 100 = 100ms)
- Card 2: appears after 200ms (2 * 100 = 200ms)
- Creates a smooth cascading effect

**Why setTimeout:** Delays DOM insertion, allowing CSS transition/animation to trigger for each card. The `slideIn` animation is defined in styles.css (lines 300-309).

**How it works within everything:** Called by `loadDashboard()` (line 159) with accounts fetched from API. Creates visual card grid in dashboard.

---

### Lines 134-172: Load Dashboard Function

#### Function Declaration (Lines 134-137)
```javascript
    /**
     * Load dashboard data
     */
    async function loadDashboard() {
```
**What it does:** Main function that orchestrates dashboard data loading.

**Why it was chosen:**
- **Async function:** Allows await for API calls
- **Single entry point:** All dashboard initialization in one place
- **Descriptive name:** Clear what function does

**How it works within everything:** Called at page load (line 184).

---

#### Error Handling and Loading State (Lines 138-140)
```javascript
        try {
            hideError();
            loadingIndicator.classList.remove('hidden');
```
**What it does:** Hides any previous errors and shows loading indicator.

**Why it was chosen:**
- **try-catch:** Handle errors gracefully
- **Clear old errors:** Don't show stale error messages
- **Loading feedback:** User sees progress indicator

**How it works within everything:** Loading spinner (defined in dashboard.html line 27-30) is shown while data loads.

---

#### Get User Data from Session (Lines 142-147)
```javascript
            // Get user data from session
            const userData = Auth.getUserData();
            
            if (!userData || !userData.id) {
                throw new Error('User data not found. Please login again.');
            }
```
**What it does:** Retrieves user data from sessionStorage and validates it.

**Why it was chosen:**
- **Session storage:** Data persists across page refreshes
- **Validation:** Ensure user data exists and has required fields
- **Explicit error:** Clear message if data is missing
- **Fail fast:** Don't proceed if no user data

**Why this could fail:** If user manually deletes sessionStorage data or session expires.

**How it works within everything:** User data was stored by `Auth.login()` in login.js (line 151).

---

#### Display User Info (Lines 149-150)
```javascript
            // Display user info
            displayUserInfo(userData);
```
**What it does:** Updates DOM with user's name.

**Why it was chosen:**
- **Early display:** Show user info before fetching accounts
- **Delegated rendering:** Uses dedicated function
- **No await needed:** Synchronous operation

**How it works within everything:** User sees their name in header immediately.

---

#### Fetch Accounts (Lines 152-153)
```javascript
            // Fetch user's accounts
            const accounts = await API.accounts.getByUserId(userData.id);
```
**What it does:** Makes API call to get user's accounts.

**Why it was chosen:**
- **Await:** Pauses execution until data arrives
- **API module:** Uses centralized API client
- **User ID parameter:** Fetches only current user's accounts

**How it works within everything:** Calls `api.js` (line 135) which makes GET request to `/users/{userId}/accounts`. Backend returns array of account objects.

---

#### Hide Loading and Display Accounts (Lines 155-159)
```javascript
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            // Display accounts
            displayAccounts(accounts);
```
**What it does:** Hides loading spinner and renders account cards.

**Why it was chosen:**
- **Hide loading first:** Clear loading state before showing data
- **Delegated rendering:** Uses dedicated display function
- **Clean separation:** Loading state and data display are separate concerns

**How it works within everything:** User sees loading spinner disappear and account cards animate into view.

---

#### Error Handling (Lines 161-171)
```javascript
        } catch (error) {
            console.error('Dashboard error:', error);
            showError(error.message || 'Failed to load dashboard. Please try again.');
            
            // If authentication error, logout after a delay
            if (error.message.includes('login')) {
                setTimeout(() => {
                    Auth.logout();
                }, 2000);
            }
        }
```
**What it does:** Catches errors, shows message, and logs out if authentication failed.

**Why it was chosen:**
- **console.error:** Logs full error for debugging
- **User-friendly message:** Shows error message or fallback
- **Conditional logout:** Only logout for auth-related errors
- **Delayed logout:** 2-second delay lets user read error message

**Why check for 'login' in message:** If error message contains "login", it's likely an authentication issue.

**How it works within everything:** If API call fails (network error, 401, etc.), user sees error. If it's authentication-related, they're logged out after 2 seconds.

---

### Lines 174-181: Logout Button Handler
```javascript
    /**
     * Handle logout
     */
    logoutButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            Auth.logout();
        }
    });
```
**What it does:** Attaches logout handler to logout button.

**Why it was chosen:**
- **Confirmation dialog:** Prevents accidental logout
- **Arrow function:** Concise syntax
- **Delegated logout:** Uses Auth module

**Why confirm dialog:** Banking apps should confirm destructive actions. If user clicks "Cancel", `confirm()` returns false and logout doesn't happen.

**How it works within everything:** When user clicks logout button (dashboard.html line 16), they see confirmation. If they confirm, `Auth.logout()` (auth.js line 79) clears session and redirects to login.

---

### Lines 183-185: Initialize Dashboard
```javascript
    // Load dashboard on page load
    loadDashboard();
});
```
**What it does:** Calls `loadDashboard()` when DOM is ready.

**Why it was chosen:**
- **Immediate load:** Dashboard data loads as soon as page is ready
- **Comment:** Clarifies intent
- **Closing brace:** Closes DOMContentLoaded listener

**How it works within everything:** This starts the entire dashboard flow: get user data → display user info → fetch accounts → display accounts.

---

## Integration Points

### Dependencies:
- **config.js** - Indirectly via Auth and API modules
- **auth.js** - Uses `Auth.requireAuth()`, `Auth.getUserData()`, `Auth.logout()`
- **api.js** - Uses `API.accounts.getByUserId()`
- **dashboard.html** - Manipulates DOM elements defined in HTML

### Used by:
- None directly (this is a leaf module)

### Load Order:
Must load after config.js, auth.js, and api.js:
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
<script src="js/api.js"></script>
<script src="js/dashboard.js"></script>
```

---

## Security Features

1. **Route protection:** `Auth.requireAuth()` prevents unauthorized access
2. **Session validation:** Checks for valid user data before proceeding
3. **Auto-logout:** Logs out on authentication errors
4. **Confirmation dialogs:** Prevents accidental logout
5. **No sensitive data exposure:** Only displays account IDs (not balances, etc.)

---

## UX Features

1. **Loading states:** Visual feedback during data fetch
2. **Error handling:** Clear error messages for failures
3. **Empty states:** Helpful message when no accounts exist
4. **Staggered animations:** Cards appear with cascading effect
5. **Personalization:** Shows user's name in header and greeting
6. **Visual account types:** Different colors and icons per account type
7. **Logout confirmation:** Prevents accidental session termination

---

## Design Patterns

1. **Separation of Concerns:** Display logic separated from data fetching
2. **Error Handling:** Try-catch with graceful fallbacks
3. **Component Pattern:** Each account card is self-contained component
4. **Event-Driven Architecture:** Uses DOM events for user interactions
5. **Loading States:** Clear feedback for async operations
6. **Empty States:** Graceful handling of no-data scenarios

---

## Animation and Visual Design

1. **Staggered card entrance:** 100ms delay between cards
2. **CSS animations:** Cards use slideIn animation from styles.css
3. **Type-specific styling:** Account cards colored by type (checking=blue, savings=green)
4. **Icon system:** Unicode emojis for visual interest
5. **Responsive grid:** CSS Grid adapts to screen size

---

## Potential Enhancements

The structure supports easy addition of:
- Account balance display
- Transaction history per account
- Account filtering/sorting
- Account detail view on click
- Refresh button to reload data
- Pull-to-refresh on mobile
- Account creation flow
- Error retry mechanism

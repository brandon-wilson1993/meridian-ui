# dashboard.html Documentation

**File Path:** `dashboard.html`

**Purpose:** Dashboard page structure for Meridian Bank UI. Provides the HTML skeleton for displaying user information, account cards, loading states, and error messages after successful authentication.

---

## Code Documentation

### Lines 1-2: DOCTYPE and HTML Tag
```html
<!DOCTYPE html>
<html lang="en">
```
**What it does:** Declares HTML5 document type and sets language to English.

**Why it was chosen:**
- **HTML5 DOCTYPE:** Modern standard for browser rendering
- **lang="en":** Helps accessibility tools and search engines

**How it works within everything:** Same as index.html - establishes HTML5 document with proper language declaration.

---

### Lines 3-8: Head Section - Meta Tags, Title, and Stylesheet
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Bank - Dashboard</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
```

#### Meta Tags (Lines 4-5)
```html
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**What it does:** Sets UTF-8 encoding and responsive viewport.

**Why it was chosen:**
- Same as index.html - ensures emojis and responsive design work
- Critical for mobile experience

**How it works within everything:** Enables responsive CSS (styles.css lines 416-460) and proper character display.

---

#### Title Tag (Line 6)
```html
    <title>Meridian Bank - Dashboard</title>
```
**What it does:** Sets browser tab title.

**Why it was chosen:**
- **Consistent branding:** "Meridian Bank" matches login page
- **Page identification:** "Dashboard" clarifies user is on main page
- **User orientation:** Clear indication of current location

**How it works within everything:** Shows in browser tab, helping users identify the page among multiple tabs.

---

#### Stylesheet Link (Line 7)
```html
    <link rel="stylesheet" href="css/styles.css">
```
**What it does:** Links shared CSS file.

**Why it was chosen:**
- **Shared styles:** Same stylesheet as login page for consistency
- **Single file:** Reduces HTTP requests and ensures unified design

**How it works within everything:** Loads styles for dashboard-specific elements (lines 200-414 in styles.css).

---

### Lines 9-10: Body Opening and Dashboard Container
```html
<body>
    <div class="dashboard-container">
```

#### Body Tag (Line 9)
```html
<body>
```
**What it does:** Contains all visible page content.

**Why it was chosen:** Standard HTML structure.

**How it works within everything:** Styled by base CSS rules (styles.css lines 25-30).

---

#### Dashboard Container (Line 10)
```html
    <div class="dashboard-container">
```
**What it does:** Main wrapper for entire dashboard layout.

**Why it was chosen:**
- **CSS class:** `.dashboard-container` enables styling (styles.css lines 201-204)
- **Layout structure:** Establishes full-height container for header + content
- **Scoped styling:** All dashboard elements are children of this container

**How it works within everything:** Creates full-height page with light gray background, containing header and main content sections.

---

### Lines 11-19: Dashboard Header Section
```html
        <header class="dashboard-header">
            <div class="header-content">
                <h1>Meridian Bank</h1>
                <div class="user-actions">
                    <span id="userName" class="user-name"></span>
                    <button id="logoutButton" class="btn btn-secondary">Logout</button>
                </div>
            </div>
        </header>
```

#### Header Element (Line 11)
```html
        <header class="dashboard-header">
```
**What it does:** Semantic header section for page header.

**Why it was chosen:**
- **Semantic HTML5:** `<header>` tag clearly indicates page header
- **CSS class:** `.dashboard-header` for styling (styles.css lines 206-211)
- **Accessibility:** Screen readers announce as header landmark

**How it works within everything:** Creates prominent blue gradient header at top of page.

---

#### Header Content Container (Line 12)
```html
            <div class="header-content">
```
**What it does:** Inner container for header content with max-width.

**Why it was chosen:**
- **Centered content:** `.header-content` class (styles.css lines 213-221)
- **Max-width constraint:** Keeps content readable on wide screens (max-width: 1200px)
- **Flexbox layout:** Spaces brand and user actions apart

**How it works within everything:** Creates responsive flexbox layout that adapts to different screen sizes.

---

#### Bank Name Heading (Line 13)
```html
                <h1>Meridian Bank</h1>
```
**What it does:** Displays bank name in header.

**Why it was chosen:**
- **Brand consistency:** Same name as login page
- **H1 tag:** Main page heading for SEO and accessibility
- **White color:** Contrasts with blue gradient background (styles.css lines 223-226)

**How it works within everything:** Prominent brand identity in header.

---

#### User Actions Container (Line 14)
```html
                <div class="user-actions">
```
**What it does:** Groups user name and logout button.

**Why it was chosen:**
- **Logical grouping:** User-related actions together
- **CSS class:** `.user-actions` for flexbox layout (styles.css lines 228-232)
- **Responsive:** Adapts layout on mobile

**How it works within everything:** Creates horizontal layout with spacing between user name and logout button.

---

#### User Name Span (Line 15)
```html
                    <span id="userName" class="user-name"></span>
```
**What it does:** Container for displaying user's full name.

**Why it was chosen:**
- **ID attribute:** `userName` used by dashboard.js (line 10) to set content
- **CSS class:** `.user-name` for styling (styles.css lines 234-237)
- **Empty initially:** Populated by JavaScript after fetching user data
- **Span tag:** Inline element for text display

**How it works within everything:** JavaScript calls `userNameElement.textContent = fullName` (dashboard.js line 49) to show "John Doe".

---

#### Logout Button (Line 16)
```html
                    <button id="logoutButton" class="btn btn-secondary">Logout</button>
```
**What it does:** Button to log out of application.

**Why each attribute was chosen:**
- **id="logoutButton":** JavaScript reference (dashboard.js line 12) for click handler
- **class="btn btn-secondary":** Styled as secondary button (styles.css lines 146-158)
- **Text "Logout":** Clear action label

**How it works within everything:** When clicked, triggers confirmation dialog (dashboard.js line 178) and logs user out if confirmed.

---

### Lines 21-25: Main Content Area and Welcome Section
```html
        <main class="dashboard-main">
            <div class="welcome-section">
                <h2>Your Accounts</h2>
                <p class="welcome-message">Welcome back, <span id="userGreeting"></span>!</p>
            </div>
```

#### Main Element (Line 21)
```html
        <main class="dashboard-main">
```
**What it does:** Semantic main content section.

**Why it was chosen:**
- **Semantic HTML5:** `<main>` indicates primary page content
- **CSS class:** `.dashboard-main` for styling (styles.css lines 240-244)
- **Accessibility:** Screen readers announce as main content landmark
- **Max-width:** Constrained for readability (1200px)

**How it works within everything:** Contains all dashboard content below header.

---

#### Welcome Section (Line 22)
```html
            <div class="welcome-section">
```
**What it does:** Groups page title and greeting message.

**Why it was chosen:**
- **Logical grouping:** Related welcome content together
- **CSS class:** `.welcome-section` for spacing (styles.css lines 246-248)

**How it works within everything:** Creates introductory section above account cards.

---

#### Page Heading (Line 23)
```html
                <h2>Your Accounts</h2>
```
**What it does:** Section heading describing content below.

**Why it was chosen:**
- **H2 tag:** Proper heading hierarchy (H1 is bank name)
- **Clear label:** User knows they're viewing accounts
- **Styled prominently:** Large blue text (styles.css lines 250-254)

**How it works within everything:** Introduces the accounts grid section.

---

#### Welcome Message (Line 24)
```html
                <p class="welcome-message">Welcome back, <span id="userGreeting"></span>!</p>
```
**What it does:** Personalized greeting with user's first name.

**Why it was chosen:**
- **Personalization:** Makes user feel recognized
- **Empty span:** `userGreeting` filled by JavaScript (dashboard.js line 11)
- **CSS class:** `.welcome-message` for styling (styles.css lines 256-259)

**How it works within everything:** JavaScript sets `userGreetingElement.textContent = user.firstName` (dashboard.js line 50) to show "Welcome back, John!"

---

### Lines 27-30: Loading Indicator
```html
            <div id="loadingIndicator" class="loading-indicator">
                <div class="loading-spinner"></div>
                <p>Loading your accounts...</p>
            </div>
```

#### Loading Indicator Container (Line 27)
```html
            <div id="loadingIndicator" class="loading-indicator">
```
**What it does:** Container for loading state UI.

**Why it was chosen:**
- **ID attribute:** `loadingIndicator` used by dashboard.js (line 13) to show/hide
- **CSS class:** `.loading-indicator` for styling (styles.css lines 262-265)
- **Visible initially:** Shown while data loads, then hidden

**How it works within everything:** JavaScript toggles visibility with `classList.add('hidden')` (dashboard.js line 156).

---

#### Loading Spinner (Line 28)
```html
                <div class="loading-spinner"></div>
```
**What it does:** Animated rotating circle indicator.

**Why it was chosen:**
- **Empty div:** Appearance purely from CSS
- **CSS animation:** Spinning border (styles.css lines 267-274, 170-174)
- **Visual feedback:** Shows activity while waiting

**How it works within everything:** CSS creates rotating blue circle animation.

---

#### Loading Text (Line 29)
```html
                <p>Loading your accounts...</p>
```
**What it does:** Text explaining what's loading.

**Why it was chosen:**
- **User communication:** Clear message about what's happening
- **Accessibility:** Screen readers announce loading state

**How it works within everything:** Shows gray text below spinner while accounts are being fetched.

---

### Line 32: Error Message Container
```html
            <div id="errorMessage" class="error-message hidden"></div>
```
**What it does:** Container for error messages.

**Why it was chosen:**
- **ID attribute:** `errorMessage` used by dashboard.js (line 16) for content
- **CSS classes:** `.error-message` for styling, `.hidden` to hide initially (styles.css lines 177-185)
- **Empty initially:** Populated by JavaScript on errors

**How it works within everything:** Shown when API call fails (dashboard.js line 162), displays red error box.

---

### Lines 34-36: Accounts Grid Container
```html
            <div id="accountsList" class="accounts-grid">
                <!-- Account cards will be dynamically inserted here -->
            </div>
```

#### Accounts List Container (Line 34)
```html
            <div id="accountsList" class="accounts-grid">
```
**What it does:** Container for account cards.

**Why it was chosen:**
- **ID attribute:** `accountsList` used by dashboard.js (line 14) to insert cards
- **CSS class:** `.accounts-grid` for grid layout (styles.css lines 282-287)
- **Empty initially:** Cards added by JavaScript
- **Semantic name:** "list" indicates collection

**How it works within everything:** JavaScript creates card elements and appends them here (dashboard.js line 129). CSS creates responsive grid that adapts to screen size.

---

#### HTML Comment (Line 35)
```html
                <!-- Account cards will be dynamically inserted here -->
```
**What it does:** Documents that cards are added by JavaScript.

**Why it was chosen:**
- **Developer guidance:** Explains empty container
- **Maintenance aid:** Prevents confusion about missing content

**How it works within everything:** Helps developers understand the dynamic nature of this section.

---

### Lines 38-40: No Accounts Message
```html
            <div id="noAccounts" class="no-accounts hidden">
                <p>No accounts found. Please contact support to set up your accounts.</p>
            </div>
```

#### No Accounts Container (Line 38)
```html
            <div id="noAccounts" class="no-accounts hidden">
```
**What it does:** Container for empty state message.

**Why it was chosen:**
- **ID attribute:** `noAccounts` used by dashboard.js (line 15) to show/hide
- **CSS classes:** `.no-accounts` for styling, `.hidden` by default (styles.css lines 405-413)
- **Hidden initially:** Only shown when user has no accounts

**How it works within everything:** Shown by JavaScript (dashboard.js line 119) when accounts array is empty.

---

#### Empty State Message (Line 39)
```html
                <p>No accounts found. Please contact support to set up your accounts.</p>
```
**What it does:** Helpful message when user has no accounts.

**Why it was chosen:**
- **Clear communication:** Explains why grid is empty
- **Actionable guidance:** Tells user what to do (contact support)
- **Friendly tone:** Professional but helpful

**How it works within everything:** Better UX than showing empty grid - explains situation and provides next steps.

---

### Lines 44-47: Script Loading
```html
    <script src="js/config.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/api.js"></script>
    <script src="js/dashboard.js"></script>
```
**What it does:** Loads JavaScript files in dependency order.

**Why this order was chosen:**
1. **config.js:** Provides configuration (API URL, storage keys)
2. **auth.js:** Handles authentication (depends on config)
3. **api.js:** Makes API calls (depends on config and auth)
4. **dashboard.js:** Dashboard logic (depends on all above)

**Why synchronous loading:** Scripts loaded in order (no async/defer) to ensure dependencies are available.

**How it works within everything:**
- Each script exports to global window object
- Later scripts access earlier exports
- Dashboard.js immediately calls `Auth.requireAuth()` (line 8)

---

### Lines 48-49: Closing Tags
```html
</body>
</html>
```
**What it does:** Closes body and html tags.

**Why it was chosen:** Standard HTML structure.

**How it works within everything:** Completes the document.

---

## Integration Points

### CSS Dependencies:
- **styles.css** - Dashboard styling (lines 200-461)
  - Header styles (206-238)
  - Main content (240-280)
  - Accounts grid (282-314)
  - Account cards (290-403)
  - Responsive breakpoints (416-460)

### JavaScript Dependencies:
- **config.js** - Configuration values
- **auth.js** - Authentication and session management
- **api.js** - API calls for fetching accounts
- **dashboard.js** - Dashboard logic and DOM manipulation

### DOM Elements Used by JavaScript:

| Element ID | Used By | Purpose |
|------------|---------|---------|
| `userName` | dashboard.js line 10 | Display full name |
| `userGreeting` | dashboard.js line 11 | Display first name |
| `logoutButton` | dashboard.js line 12 | Attach click handler |
| `loadingIndicator` | dashboard.js line 13 | Show/hide loading state |
| `accountsList` | dashboard.js line 14 | Insert account cards |
| `noAccounts` | dashboard.js line 15 | Show empty state |
| `errorMessage` | dashboard.js line 16 | Display errors |

---

## Page Flow

1. **Page loads** → Scripts load in order
2. **dashboard.js executes** → Calls `Auth.requireAuth()` (redirects if not authenticated)
3. **DOM ready** → `loadDashboard()` called
4. **Loading shown** → Loading indicator visible
5. **User data retrieved** → From sessionStorage
6. **User info displayed** → Name shown in header and greeting
7. **API call made** → Fetch user accounts from backend
8. **Loading hidden** → Loading indicator removed
9. **Cards rendered** → Account cards animate into grid
10. **Ready** → User can view accounts and logout

---

## Responsive Behavior

### Desktop (>768px):
- Header: horizontal layout with brand left, actions right
- Accounts grid: multiple columns (auto-fill based on 300px minimum)
- Full spacing and padding

### Tablet (<=768px):
- Header: stacks vertically
- User actions: spans full width
- Accounts grid: single column
- Reduced padding (styles.css lines 416-442)

### Mobile (<=480px):
- Minimal padding for screen space
- Single column layout
- Touch-friendly spacing
- Font size adjustments (styles.css lines 444-460)

---

## Accessibility Features

1. **Semantic HTML:** `<header>`, `<main>` for structure
2. **Heading hierarchy:** H1 (bank name) → H2 (section title)
3. **ARIA landmarks:** Header and main are recognized by screen readers
4. **Loading state:** Text explains what's loading
5. **Error messages:** Clear communication of problems
6. **Empty states:** Helpful message when no data
7. **Button text:** Clear action labels ("Logout")

---

## Security Features

1. **Route protection:** JavaScript immediately checks authentication
2. **Session-based:** User data from sessionStorage
3. **No sensitive data:** Only shows account IDs (not balances)
4. **Logout confirmation:** Prevents accidental logout
5. **Error handling:** Graceful failures with user-friendly messages

---

## UX Enhancements

1. **Loading states:** Visual feedback during data fetch
2. **Empty states:** Helpful message when no accounts
3. **Error states:** Clear error messages with guidance
4. **Personalization:** User's name in header and greeting
5. **Visual account types:** Different colors and icons
6. **Staggered animations:** Cards appear with cascading effect
7. **Responsive design:** Adapts to all screen sizes
8. **Logout confirmation:** Safety check before logging out

---

## Design Patterns

1. **Progressive Enhancement:** Structure works without JavaScript
2. **Separation of Concerns:** HTML (structure), CSS (style), JS (behavior)
3. **Component Structure:** Each account card is independent
4. **State Management:** Clear loading/error/success states
5. **Mobile-First:** Responsive design from ground up
6. **Semantic HTML:** Proper use of HTML5 elements

---

## Potential Enhancements

The structure supports easy addition of:
- Account balance display in cards
- Click handlers for account details
- Filter/sort controls above grid
- Search functionality
- Pagination for many accounts
- Account creation button
- Refresh button
- Pull-to-refresh on mobile
- Skeleton screens instead of loading spinner

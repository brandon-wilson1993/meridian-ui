# index.html Documentation

**File Path:** `index.html`

**Purpose:** Login page structure for Meridian Bank UI. Provides the HTML skeleton for the authentication interface with form inputs, branding, error display, and script loading.

---

## Code Documentation

### Lines 1-2: DOCTYPE and HTML Tag
```html
<!DOCTYPE html>
<html lang="en">
```
**What it does:** Declares HTML5 document type and sets language to English.

**Why it was chosen:**
- **HTML5 DOCTYPE:** Modern, simple declaration for standards-compliant rendering
- **lang="en":** Helps screen readers, search engines, and browsers understand content language
- **Accessibility:** Required for proper ARIA support and screen reader functionality

**How it works within everything:** Establishes the document as HTML5, enabling modern features like semantic tags, form validation, and storage APIs used throughout the app.

---

### Lines 3-8: Head Section - Meta Tags and Title
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Bank - Login</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
```

#### Meta Charset (Line 4)
```html
    <meta charset="UTF-8">
```
**What it does:** Sets character encoding to UTF-8.

**Why it was chosen:**
- **Universal support:** UTF-8 handles all languages and special characters
- **Security:** Prevents encoding-based attacks
- **Standards:** W3C recommendation for all web pages

**How it works within everything:** Ensures emojis (💳, 💰) and special characters display correctly across all browsers.

---

#### Viewport Meta (Line 5)
```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**What it does:** Configures viewport for responsive design.

**Why it was chosen:**
- **Mobile-first:** `width=device-width` uses device's actual width
- **No zoom:** `initial-scale=1.0` prevents unwanted zoom on mobile
- **Responsive design:** Essential for mobile compatibility

**How it works within everything:** Enables CSS media queries in styles.css (lines 416-460) to adapt layout for different screen sizes.

---

#### Title Tag (Line 6)
```html
    <title>Meridian Bank - Login</title>
```
**What it does:** Sets browser tab title and bookmarks name.

**Why it was chosen:**
- **Branding:** "Meridian Bank" reinforces brand identity
- **Descriptive:** "Login" clarifies page purpose
- **SEO:** Good title helps search engine indexing

**How it works within everything:** Shows in browser tab, bookmarks, and search results.

---

#### Stylesheet Link (Line 7)
```html
    <link rel="stylesheet" href="css/styles.css">
```
**What it does:** Links external CSS file for styling.

**Why it was chosen:**
- **Separation of concerns:** Keeps styling separate from structure
- **Relative path:** `css/styles.css` works from any environment
- **Single stylesheet:** Simplifies maintenance and reduces HTTP requests

**How it works within everything:** Loads all styles for login page and dashboard, enabling consistent visual design.

---

### Lines 9-10: Body Opening and Main Container
```html
<body>
    <div class="container">
```

#### Body Tag (Line 9)
```html
<body>
```
**What it does:** Contains all visible page content.

**Why it was chosen:** Standard HTML structure for content.

**How it works within everything:** Styled by CSS (lines 25-30 in styles.css) with font and color settings.

---

#### Container Div (Line 10)
```html
    <div class="container">
```
**What it does:** Wraps entire login UI for centering and layout.

**Why it was chosen:**
- **CSS class:** `.container` enables styling (styles.css lines 33-40)
- **Flexbox layout:** Centers login card vertically and horizontally
- **Responsive:** Adapts to different screen sizes

**How it works within everything:** Creates full-height viewport with gradient background, centering the login card.

---

### Lines 11-15: Logo and Branding Section
```html
        <div class="login-card">
            <div class="logo">
                <h1>Meridian Bank</h1>
                <p class="tagline">Secure Banking Portal</p>
            </div>
```

#### Login Card (Line 11)
```html
        <div class="login-card">
```
**What it does:** Card container for login form.

**Why it was chosen:**
- **Card pattern:** Common UI pattern for forms
- **Visual hierarchy:** Stands out against gradient background
- **Scoped styling:** `.login-card` class in styles.css (lines 43-51)

**How it works within everything:** Creates white rounded card with shadow, animated entrance (fadeIn animation).

---

#### Logo Container (Line 12)
```html
            <div class="logo">
```
**What it does:** Groups branding elements.

**Why it was chosen:**
- **Semantic grouping:** Logo and tagline belong together
- **CSS target:** `.logo` class for centered styling (styles.css lines 64-67)

**How it works within everything:** Centered text container at top of card.

---

#### Bank Name Heading (Line 13)
```html
                <h1>Meridian Bank</h1>
```
**What it does:** Displays bank name as primary heading.

**Why it was chosen:**
- **H1 tag:** Semantic HTML for main page heading
- **Brand identity:** Reinforces bank name
- **SEO:** H1 is important for search engines
- **Accessibility:** Screen readers announce as main heading

**How it works within everything:** Styled with large, bold, primary color text (styles.css lines 69-73).

---

#### Tagline (Line 14)
```html
                <p class="tagline">Secure Banking Portal</p>
```
**What it does:** Displays descriptive subtitle.

**Why it was chosen:**
- **Reassurance:** "Secure" builds trust
- **Clarity:** "Banking Portal" explains purpose
- **CSS class:** `.tagline` for styling (styles.css lines 76-79)

**How it works within everything:** Shown in smaller, secondary color text below bank name.

---

### Lines 17-28: Username Input Field Group
```html
            <form id="loginForm" class="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        autocomplete="username"
                        placeholder="Enter your username"
                    >
                </div>
```

#### Form Tag (Line 17)
```html
            <form id="loginForm" class="login-form">
```
**What it does:** Creates form for login inputs.

**Why it was chosen:**
- **Semantic HTML:** Form tag enables proper form submission
- **ID attribute:** `loginForm` used by login.js (line 14) to attach submit handler
- **CSS class:** `.login-form` for styling (styles.css lines 82-84)
- **Enter key support:** Forms submit on Enter key press

**How it works within everything:** When submitted, triggers event handler in login.js (line 86).

---

#### Form Group Div (Line 18)
```html
                <div class="form-group">
```
**What it does:** Groups label and input together.

**Why it was chosen:**
- **Visual grouping:** Creates consistent spacing around each field
- **CSS styling:** `.form-group` class (styles.css lines 86-88)
- **Extensible:** Easy to add more fields

**How it works within everything:** Provides consistent spacing and layout for form fields.

---

#### Username Label (Line 19)
```html
                    <label for="username">Username</label>
```
**What it does:** Labels the username input field.

**Why it was chosen:**
- **Accessibility:** Screen readers associate label with input
- **Usability:** Clicking label focuses input
- **for attribute:** Links to input's `id="username"`
- **Clear text:** "Username" is unambiguous

**How it works within everything:** When clicked, focuses the username input. Screen readers announce "Username" when input is focused.

---

#### Username Input (Lines 20-27)
```html
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        autocomplete="username"
                        placeholder="Enter your username"
                    >
```
**What it does:** Text input field for username.

**Why each attribute was chosen:**
- **type="text":** Standard text input
- **id="username":** JavaScript reference (login.js line 15) and label association
- **name="username":** Form field name (for form submission)
- **required:** HTML5 validation - field must be filled
- **autocomplete="username":** Browser can remember/suggest usernames
- **placeholder:** Helper text shown when empty

**Why autocomplete="username":** Follows HTML specification for credential management. Browsers can save and autofill credentials securely.

**How it works within everything:** 
- JavaScript in login.js reads `usernameInput.value` (line 98)
- Browser may offer to save/autofill username
- Required attribute triggers native validation

---

### Lines 29-40: Password Input Field Group
```html
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        autocomplete="current-password"
                        placeholder="Enter your password"
                    >
                </div>
```

#### Form Group and Label (Lines 30-31)
```html
                <div class="form-group">
                    <label for="password">Password</label>
```
**What it does:** Same pattern as username field.

**Why it was chosen:** Consistent structure for all form fields.

**How it works within everything:** Provides accessible, clickable label for password field.

---

#### Password Input (Lines 32-39)
```html
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        autocomplete="current-password"
                        placeholder="Enter your password"
                    >
```
**What it does:** Password input field with masked characters.

**Why each attribute was chosen:**
- **type="password":** Masks input with dots/asterisks for security
- **id="password":** JavaScript reference (login.js line 16) and label association
- **name="password":** Form field name
- **required:** Field must be filled
- **autocomplete="current-password":** Tells browser this is login password (not new password)
- **placeholder:** Helper text

**Why autocomplete="current-password":**
- Distinguishes from "new-password" (for signup forms)
- Enables browsers to suggest saved passwords
- Follows HTML specification for password management

**Security note:** `type="password"` prevents shoulder surfing by masking input, but doesn't encrypt transmission. Always use HTTPS in production.

**How it works within everything:**
- JavaScript in login.js reads `passwordInput.value` (line 99)
- Browser may offer to save/autofill password
- Masked display protects from visual snooping

---

### Lines 42: Error Message Container
```html
                <div id="errorMessage" class="error-message hidden"></div>
```
**What it does:** Container for displaying error messages.

**Why it was chosen:**
- **ID attribute:** JavaScript reference (login.js line 18) for updating content
- **CSS classes:** `.error-message` for styling, `.hidden` to hide by default (styles.css lines 177-198)
- **Empty initially:** Populated by JavaScript when errors occur

**How it works within everything:**
- Hidden by default with `display: none`
- JavaScript calls `showError()` (login.js line 27) to set text and remove `.hidden`
- Styled with red background and border (styles.css lines 177-185)

---

### Lines 44-47: Submit Button
```html
                <button type="submit" class="btn btn-primary" id="loginButton">
                    <span class="btn-text">Login</span>
                    <span class="loading-spinner hidden"></span>
                </button>
```

#### Button Element (Line 44)
```html
                <button type="submit" class="btn btn-primary" id="loginButton">
```
**What it does:** Submit button for the form.

**Why each attribute was chosen:**
- **type="submit":** Triggers form submission
- **class="btn btn-primary":** CSS styling (styles.css lines 114-144)
- **id="loginButton":** JavaScript reference (login.js line 17) for loading states

**How it works within everything:**
- Clicking triggers form submit event
- JavaScript prevents default and handles authentication
- Styled as prominent primary action button

---

#### Button Text Span (Line 45)
```html
                    <span class="btn-text">Login</span>
```
**What it does:** Contains button text "Login".

**Why it was chosen:**
- **Separate element:** Can be hidden independently during loading
- **CSS class:** `.btn-text` for targeting

**How it works within everything:** Hidden by JavaScript (login.js line 44) when loading, shown when ready.

---

#### Loading Spinner Span (Line 46)
```html
                    <span class="loading-spinner hidden"></span>
```
**What it does:** Animated loading spinner (empty element styled with CSS).

**Why it was chosen:**
- **Empty element:** Appearance purely from CSS (styles.css lines 161-174)
- **hidden class:** Hidden by default
- **CSS animation:** Rotating circle indicates loading

**How it works within everything:**
- Hidden initially
- Shown by JavaScript (login.js line 45) during authentication
- CSS creates rotating border animation

---

### Lines 50-52: Info Text
```html
            <div class="info-text">
                <p>For demo purposes, the system will authenticate against the Meridian API</p>
            </div>
```
**What it does:** Displays informational message to users.

**Why it was chosen:**
- **User guidance:** Explains authentication mechanism
- **Demo context:** Clarifies this is demonstration
- **CSS class:** `.info-text` for subtle styling (styles.css lines 187-194)

**How it works within everything:** Shows as small, gray text at bottom of card with border separator.

---

### Lines 56-62: Script Loading
```html
    <!-- Script load order is important: config -> auth -> api -->
    <script src="js/config.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/api.js"></script>

    <!-- Ensure Auth dependency is available before loading login logic -->
    <script src="js/login.js"></script>
```
**What it does:** Loads JavaScript files in specific order.

**Why this order was chosen:**
1. **config.js first:** Defines configuration that auth and api need
2. **auth.js second:** Defines Auth object that api needs
3. **api.js third:** Defines API object (depends on config and auth)
4. **login.js last:** Uses config, Auth, and API objects

**Why not async:** Scripts are loaded synchronously (default) to ensure dependencies are available. With async/defer, order is not guaranteed.

**Why comments:** Explicit documentation of dependency chain helps prevent reordering mistakes.

**How it works within everything:**
- Each script exports to `window` object (config, Auth, API)
- Later scripts access earlier exports
- Wrong order would cause "undefined" errors

---

### Lines 63-82: Commented Dynamic Script Loading
```html
    <!-- <script>
        (function () {
            if (
                !window.Auth ||
                typeof Auth.isAuthenticated !== 'function' ||
                typeof Auth.getAuthHeader !== 'function'
            ) {
                console.error(
                    'Auth module is not initialized. ' +
                    'Ensure js/auth.js is loaded before js/api.js and login functionality.'
                );
                return;
            }

            var script = document.createElement('script');
            script.src = 'js/login.js';
            script.async = false;
            document.body.appendChild(script);
        })();
    </script> -->
```
**What it does:** Commented-out dynamic script loading with dependency checking.

**Why it exists:** Previous implementation that checked Auth availability before loading login.js.

**Why commented out:** Replaced with simpler direct script tags (lines 57-62). Kept for reference.

**What it would do if uncommented:**
- Check if Auth module loaded correctly
- Log error if Auth is missing or incomplete
- Dynamically inject login.js script

**Why not used:** Simpler to use direct script tags when load order is known. Dynamic loading adds complexity without benefit here.

---

### Lines 83-84: Closing Tags
```html
</body>
</html>
```
**What it does:** Closes body and html tags.

**Why it was chosen:** Standard HTML structure.

**How it works within everything:** Completes the document structure.

---

## Integration Points

### CSS Dependencies:
- **styles.css** - All visual styling for login page (lines 1-199)

### JavaScript Dependencies:
- **config.js** - Provides API URL and configuration
- **auth.js** - Handles authentication state
- **api.js** - Makes API requests (though login.js uses fetch directly)
- **login.js** - Implements login logic and form handling

### DOM Elements Used by JavaScript:
- `#loginForm` - Form submission handler (login.js line 14)
- `#username` - Username input (login.js line 15)
- `#password` - Password input (login.js line 16)
- `#loginButton` - Button state management (login.js line 17)
- `#errorMessage` - Error display (login.js line 18)
- `.btn-text` - Button text toggle (login.js line 19)
- `.loading-spinner` - Loading animation toggle (login.js line 20)

---

## HTML5 Features Used

1. **Semantic HTML:** `<form>`, `<label>`, `<button>` for proper structure
2. **Required attribute:** Built-in validation
3. **Placeholder attribute:** User guidance
4. **Autocomplete attribute:** Password manager integration
5. **Type="password":** Secure input masking

---

## Accessibility Features

1. **lang="en":** Declares language for screen readers
2. **label for:** Associates labels with inputs
3. **Semantic headings:** H1 for main heading
4. **Required fields:** Indicated to assistive technology
5. **Placeholder text:** Additional input guidance
6. **Alt text would be needed:** If logos were images (currently text)

---

## Security Considerations

1. **No credential storage:** Passwords not stored in HTML
2. **Type="password":** Visual security (masks input)
3. **Autocomplete values:** Proper credential management hints for browsers
4. **HTTPS required:** Should always be served over HTTPS in production
5. **No inline JavaScript:** Separation reduces XSS risk

---

## Responsive Design

- **Viewport meta:** Enables mobile responsiveness
- **CSS handles breakpoints:** Media queries in styles.css
- **Flexible layout:** Container and card adapt to screen size
- **Touch-friendly:** Input fields sized appropriately (line 458 in styles.css prevents zoom on iOS)

---

## Design Patterns

1. **Progressive Enhancement:** Works without JavaScript (form still submits)
2. **Separation of Concerns:** HTML (structure), CSS (style), JS (behavior)
3. **BEM-like naming:** `.login-card`, `.login-form`, `.form-group`
4. **Mobile-First:** Viewport meta enables responsive design
5. **Accessible Forms:** Proper labels, semantic HTML, required fields

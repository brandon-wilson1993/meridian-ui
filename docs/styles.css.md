# styles.css Documentation

**File Path:** `css/styles.css`

**Purpose:** Complete stylesheet for Meridian Bank UI. Provides theming, layout, components, animations, and responsive design for both login and dashboard pages.

---

## Code Documentation

### Lines 1-16: CSS Custom Properties (CSS Variables)
```css
/* Root Variables - Professional Banking Theme */
:root {
    --primary-color: #1a365d;
    --primary-hover: #2c5282;
    --secondary-color: #4a5568;
    --accent-color: #3182ce;
    --success-color: #38a169;
    --error-color: #e53e3e;
    --background-color: #f7fafc;
    --card-background: #ffffff;
    --text-primary: #2d3748;
    --text-secondary: #718096;
    --border-color: #e2e8f0;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

**What it does:** Defines reusable color and styling tokens.

**Why it was chosen:**
- **CSS Custom Properties:** Modern way to define theme variables
- **:root selector:** Makes variables globally available
- **-- prefix:** CSS variable syntax
- **Semantic naming:** Names describe purpose, not appearance

**Color Choices:**
- **Primary (#1a365d):** Deep blue - professional, trustworthy (banking industry standard)
- **Primary hover (#2c5282):** Lighter blue for hover states
- **Accent (#3182ce):** Bright blue for interactive elements
- **Success (#38a169):** Green for positive actions
- **Error (#e53e3e):** Red for errors and warnings
- **Background (#f7fafc):** Very light gray, easy on eyes
- **Text colors:** Dark gray for readability, lighter for secondary text

**Shadow values:** Subtle depth without overwhelming design

**How it works within everything:** Variables referenced throughout stylesheet with `var(--primary-color)`, enabling easy theme changes.

---

### Lines 18-23: CSS Reset
```css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**What it does:** Resets default browser styles.

**Why it was chosen:**
- **Universal selector (*):** Applies to all elements
- **margin/padding: 0:** Removes browser defaults for consistency
- **box-sizing: border-box:** Includes padding/border in width calculations

**Why box-sizing: border-box:** 
- Makes sizing intuitive (width: 300px means total width is 300px, not 300px + padding + border)
- Prevents layout breaking when adding padding/borders
- Industry best practice

**How it works within everything:** Creates consistent baseline across all browsers.

---

### Lines 25-30: Body Base Styles
```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--background-color);
    color: var(--text-primary);
    line-height: 1.6;
}
```

**What it does:** Sets default typography and colors.

**Why each property was chosen:**
- **font-family:** System font stack for native appearance
- **-apple-system:** macOS/iOS system font
- **BlinkMacSystemFont:** Chrome on macOS
- **Segoe UI:** Windows
- **Roboto:** Android
- **Fallbacks:** Helvetica, Arial, sans-serif
- **background-color:** Light gray from variables
- **color:** Dark text for readability
- **line-height: 1.6:** Comfortable reading (slightly more than default 1.2)

**Why system fonts:** Fast loading, familiar to users, OS-appropriate appearance.

**How it works within everything:** Base styles inherited by all elements unless overridden.

---

### Lines 32-40: Login Container
```css
/* Container Styles */
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**What it does:** Creates full-height centered container with gradient background.

**Why each property was chosen:**
- **min-height: 100vh:** Full viewport height minimum
- **display: flex:** Enables flexbox layout
- **align-items: center:** Vertical centering
- **justify-content: center:** Horizontal centering
- **padding: 20px:** Prevents card from touching edges
- **background: linear-gradient:** Vibrant purple/blue gradient

**Why gradient:** 
- Modern, professional appearance
- Creates visual interest without images
- Purple/blue evokes trust and technology

**How it works within everything:** Used on login page (index.html) to center login card.

---

### Lines 42-62: Login Card and Animation
```css
/* Login Card */
.login-card {
    background: var(--card-background);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    padding: 40px;
    width: 100%;
    max-width: 450px;
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

#### Login Card Styles (Lines 43-51)
**What it does:** Styles the white login card.

**Why each property was chosen:**
- **background:** White card stands out against gradient
- **border-radius: 12px:** Rounded corners for modern look
- **box-shadow:** Subtle depth (floating effect)
- **padding: 40px:** Generous spacing inside card
- **width: 100%:** Responsive on mobile
- **max-width: 450px:** Prevents overly wide card on desktop
- **animation:** Smooth entrance effect

**How it works within everything:** Creates the card containing login form.

---

#### fadeIn Animation (Lines 53-62)
**What it does:** Animates card entrance with fade and slide.

**Why it was chosen:**
- **@keyframes:** CSS animation definition
- **opacity:** Fades from invisible (0) to visible (1)
- **translateY:** Slides from -20px (above) to 0 (normal position)
- **0.5s duration:** Quick but noticeable
- **ease-in timing:** Starts slow, ends fast

**How it works within everything:** Card smoothly fades in and slides down when page loads.

---

### Lines 64-79: Logo Section
```css
.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo h1 {
    color: var(--primary-color);
    font-size: 32px;
    margin-bottom: 8px;
    font-weight: 700;
}

.tagline {
    color: var(--text-secondary);
    font-size: 14px;
}
```

**What it does:** Styles bank name and tagline at top of login card.

**Why each property was chosen:**
- **text-align: center:** Centered branding
- **margin-bottom: 30px:** Space below logo section
- **color: primary:** Blue reinforces banking theme
- **font-size: 32px:** Large, prominent heading
- **font-weight: 700:** Bold for emphasis
- **tagline color:** Gray for hierarchy (less important than h1)
- **tagline size:** Small for supporting text

**How it works within everything:** Creates branded header at top of login card.

---

### Lines 81-111: Form Styles
```css
/* Form Styles */
.login-form {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}
```

#### Form Group (Lines 86-88)
**What it does:** Adds spacing between form fields.

**Why it was chosen:** Vertical spacing improves readability and reduces visual clutter.

---

#### Label Styles (Lines 90-96)
**What it does:** Styles field labels.

**Why each property was chosen:**
- **display: block:** Labels on separate line above inputs
- **margin-bottom: 8px:** Space between label and input
- **font-weight: 500:** Medium weight for clarity
- **font-size: 14px:** Slightly smaller than input text

---

#### Input Styles (Lines 98-105)
**What it does:** Styles text and password inputs.

**Why each property was chosen:**
- **width: 100%:** Full-width for mobile
- **padding: 12px 16px:** Comfortable touch targets
- **border: 2px:** Visible but not overwhelming
- **border-radius: 8px:** Matches card rounding
- **font-size: 16px:** Prevents iOS zoom on focus
- **transition:** Smooth state changes

---

#### Focus Styles (Lines 107-111)
**What it does:** Highlights focused input field.

**Why each property was chosen:**
- **outline: none:** Removes default browser outline
- **border-color: accent:** Blue border shows focus
- **box-shadow:** Additional glow effect with transparency

**Why custom focus:** Default browser outlines are inconsistent; custom styling provides better UX.

---

### Lines 113-158: Button Styles
```css
/* Button Styles */
.btn {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow);
}

.btn-primary:disabled {
    background-color: var(--secondary-color);
    cursor: not-allowed;
    opacity: 0.6;
}

.btn-secondary {
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    padding: 8px 16px;
    font-size: 14px;
    width: auto;
}

.btn-secondary:hover {
    background-color: var(--primary-color);
    color: white;
}
```

#### Base Button (Lines 114-127)
**What it does:** Common button styles.

**Why each property was chosen:**
- **width: 100%:** Full-width primary buttons
- **padding:** Comfortable click area
- **border: none:** Clean appearance
- **border-radius:** Matches other elements
- **cursor: pointer:** Indicates clickability
- **transition:** Smooth hover effects
- **display: flex:** Enables centering text and spinner
- **gap: 8px:** Space between button text and spinner

---

#### Primary Button (Lines 129-144)
**What it does:** Styles main action button (login).

**Why it was chosen:**
- **Dark blue:** Prominent primary action
- **White text:** High contrast
- **:hover:not(:disabled):** Hover only when enabled
- **transform: translateY(-1px):** Subtle lift on hover
- **:disabled styles:** Visual feedback for disabled state
- **opacity: 0.6:** Grayed out appearance when disabled

---

#### Secondary Button (Lines 146-158)
**What it does:** Styles secondary action (logout).

**Why it was chosen:**
- **Transparent background:** Less prominent than primary
- **Border:** Outline style
- **width: auto:** Sizes to content (not full-width)
- **Smaller padding:** More compact
- **Hover inversion:** Fills on hover for feedback

---

### Lines 160-174: Loading Spinner
```css
/* Loading Spinner */
.loading-spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

**What it does:** Creates animated loading spinner.

**Why each property was chosen:**
- **width/height:** Small circle
- **border:** Circular outline
- **rgba(255, 255, 255, 0.3):** Semi-transparent white
- **border-top-color:** Opaque section creates spinner effect
- **border-radius: 50%:** Makes it circular
- **animation:** Continuous rotation
- **linear:** Constant speed rotation

**How animation works:** Rotating a circle with one opaque section creates spinning effect.

**How it works within everything:** Shown in buttons during loading (login, dashboard).

---

### Lines 176-198: Error and Info Messages
```css
/* Error and Info Messages */
.error-message {
    background-color: #fee;
    color: var(--error-color);
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid var(--error-color);
    font-size: 14px;
}

.info-text {
    text-align: center;
    color: var(--text-secondary);
    font-size: 13px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.hidden {
    display: none !important;
}
```

#### Error Message (Lines 177-185)
**What it does:** Styles error messages.

**Why each property was chosen:**
- **background-color: #fee:** Light red background
- **color: error:** Red text
- **border-left:** Red accent bar for emphasis
- **border-radius:** Consistent with other elements

---

#### Info Text (Lines 187-194)
**What it does:** Styles informational text at bottom of login card.

**Why it was chosen:**
- **text-align: center:** Centered below form
- **color: secondary:** De-emphasized
- **border-top:** Visual separator from main content

---

#### Hidden Class (Lines 196-198)
**What it does:** Hides elements.

**Why it was chosen:**
- **!important:** Ensures it overrides other display values
- **display: none:** Completely removes from layout

**How it works within everything:** JavaScript toggles this class to show/hide elements.

---

### Lines 200-280: Dashboard Styles

#### Dashboard Container (Lines 201-204)
```css
.dashboard-container {
    min-height: 100vh;
    background-color: var(--background-color);
}
```
**What it does:** Full-height container for dashboard page.

**Why it was chosen:** Light gray background for entire dashboard.

---

#### Dashboard Header (Lines 206-237)
```css
.dashboard-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    padding: 20px;
    box-shadow: var(--shadow);
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
}

.dashboard-header h1 {
    font-size: 24px;
    font-weight: 700;
}

.user-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-name {
    font-size: 16px;
    font-weight: 500;
}
```

**What it does:** Styles dashboard header with gradient background.

**Why gradient:** Consistent with login page gradient theme.

**Why max-width 1200px:** Keeps content readable on large screens.

**Why flexbox:** Responsive layout that adapts to mobile.

---

#### Dashboard Main (Lines 240-259)
```css
.dashboard-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.welcome-section {
    margin-bottom: 30px;
}

.welcome-section h2 {
    color: var(--primary-color);
    font-size: 28px;
    margin-bottom: 8px;
}

.welcome-message {
    color: var(--text-secondary);
    font-size: 16px;
}
```

**What it does:** Styles main content area and welcome section.

**Why it was chosen:** Centered content with comfortable padding and typography hierarchy.

---

#### Loading Indicator (Lines 262-279)
```css
.loading-indicator {
    text-align: center;
    padding: 60px 20px;
}

.loading-indicator .loading-spinner {
    width: 50px;
    height: 50px;
    border-width: 5px;
    border-color: var(--border-color);
    border-top-color: var(--accent-color);
    margin: 0 auto 20px;
}

.loading-indicator p {
    color: var(--text-secondary);
    font-size: 16px;
}
```

**What it does:** Larger loading spinner for dashboard.

**Why larger:** More prominent for main content loading (vs. button loading).

---

### Lines 282-314: Accounts Grid and Cards

#### Accounts Grid (Lines 282-287)
```css
.accounts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 30px;
}
```

**What it does:** Creates responsive grid for account cards.

**Why CSS Grid:**
- **auto-fill:** Automatically adjusts number of columns
- **minmax(300px, 1fr):** Cards minimum 300px, expand to fill space
- **gap: 24px:** Consistent spacing between cards
- **Responsive:** Adapts to screen width automatically

**How it works:** On wide screens, shows multiple columns. On narrow screens, shows single column.

---

#### Account Card (Lines 290-314)
```css
.account-card {
    background: var(--card-background);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--shadow);
    transition: transform 0.3s, box-shadow 0.3s;
    border-left: 5px solid var(--accent-color);
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.account-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
```

**What it does:** Styles individual account cards.

**Why each property was chosen:**
- **border-left:** Colored accent bar (different per account type)
- **animation:** Slides in from below when added to DOM
- **transition:** Smooth hover effect
- **:hover:** Lifts card on hover for interactivity

---

### Lines 316-365: Account Card Internal Structure
```css
.account-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 16px;
}

.account-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: var(--background-color);
}

.account-type {
    flex: 1;
}

.account-type-label {
    color: var(--text-secondary);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.account-type-name {
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 600;
    margin-top: 4px;
}

.account-details {
    padding-top: 16px;
    border-top: 1px solid var(--border-color);
}

.account-id {
    color: var(--text-secondary);
    font-size: 14px;
}

.account-id strong {
    color: var(--text-primary);
}
```

**What it does:** Styles internal card structure (icon, type, details).

**Why flexbox for header:** Aligns icon and text side-by-side.

**Why circular icon:** Modern, clean design.

**Why uppercase label:** Distinguishes label from value.

**Why border-top on details:** Visual separator between sections.

---

### Lines 367-402: Account Type Specific Colors
```css
/* Account Type Specific Colors */
.account-card[data-type="CHECKING"] {
    border-left-color: #3182ce;
}

.account-card[data-type="CHECKING"] .account-icon {
    background-color: #ebf8ff;
    color: #3182ce;
}

.account-card[data-type="SAVINGS"] {
    border-left-color: #38a169;
}

.account-card[data-type="SAVINGS"] .account-icon {
    background-color: #f0fff4;
    color: #38a169;
}

.account-card[data-type="CREDIT"] {
    border-left-color: #d69e2e;
}

.account-card[data-type="CREDIT"] .account-icon {
    background-color: #fefcbf;
    color: #d69e2e;
}

.account-card[data-type="TRADING"] {
    border-left-color: #805ad5;
}

.account-card[data-type="TRADING"] .account-icon {
    background-color: #faf5ff;
    color: #805ad5;
}
```

**What it does:** Different colors for different account types.

**Why attribute selector:** Targets cards by data-type attribute.

**Color scheme:**
- **CHECKING:** Blue - standard, everyday banking
- **SAVINGS:** Green - growth, money
- **CREDIT:** Yellow/Gold - premium
- **TRADING:** Purple - investment, upscale

**Why light backgrounds:** Subtle colored circles without overwhelming design.

**How it works within everything:** JavaScript sets `data-type` attribute (dashboard.js line 62), CSS applies appropriate colors.

---

### Lines 404-413: No Accounts Message
```css
.no-accounts {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
}

.no-accounts p {
    font-size: 16px;
}
```

**What it does:** Styles empty state message.

**Why it was chosen:** Centered, gray text indicates no data available.

---

### Lines 415-460: Responsive Design Media Queries

#### Tablet Breakpoint (768px)
```css
@media (max-width: 768px) {
    .login-card {
        padding: 30px 20px;
    }
    
    .logo h1 {
        font-size: 28px;
    }
    
    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .user-actions {
        width: 100%;
        justify-content: space-between;
    }
    
    .accounts-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-main {
        padding: 20px 15px;
    }
}
```

**What it does:** Adjusts layout for tablets and small laptops.

**Why each change:**
- **Reduced padding:** More screen space
- **Smaller heading:** Fits better on smaller screens
- **Stacked header:** Vertical layout more readable on narrow screens
- **Single column grid:** Full-width cards on tablets
- **Reduced padding:** Maximize content space

---

#### Mobile Breakpoint (480px)
```css
@media (max-width: 480px) {
    .container {
        padding: 10px;
    }
    
    .login-card {
        padding: 25px 15px;
    }
    
    .logo h1 {
        font-size: 24px;
    }
    
    .form-group input {
        font-size: 16px; /* Prevents zoom on iOS */
    }
}
```

**What it does:** Optimizes for mobile phones.

**Why each change:**
- **Minimal padding:** Maximize screen space
- **Smaller heading:** Prevents text overflow
- **font-size: 16px:** Critical iOS fix - prevents auto-zoom on input focus

**Why 16px prevents zoom:** iOS Safari zooms in on inputs with font-size < 16px. Setting to 16px prevents this behavior.

---

## Design System Summary

### Color Palette
- **Primary:** #1a365d (dark blue) - trust, stability
- **Accent:** #3182ce (bright blue) - interactive elements
- **Success:** #38a169 (green) - positive actions
- **Error:** #e53e3e (red) - errors, warnings
- **Text:** #2d3748 (dark gray) - readability
- **Background:** #f7fafc (light gray) - subtle contrast

### Typography
- **Font stack:** System fonts for performance
- **Heading sizes:** H1: 32px, H2: 28px
- **Body text:** 16px (optimal readability, prevents iOS zoom)
- **Line height:** 1.6 (comfortable reading)

### Spacing
- **Base unit:** 8px (consistent rhythm)
- **Card padding:** 40px desktop, 20px mobile
- **Element gaps:** 15-30px depending on hierarchy

### Borders and Shadows
- **Border radius:** 12px (modern, friendly)
- **Border width:** 2px (visible but not heavy)
- **Shadow:** Subtle depth (0 4px 6px rgba(0,0,0,0.1))

### Animations
- **Duration:** 0.3-0.5s (quick but noticeable)
- **Timing:** ease-in, ease-out (natural motion)
- **Hover lifts:** -1px to -4px translateY

### Responsive Breakpoints
- **Desktop:** > 768px (multi-column grid)
- **Tablet:** ≤ 768px (single column, stacked header)
- **Mobile:** ≤ 480px (minimal padding, optimized inputs)

---

## Integration with HTML/JavaScript

### Class Usage:
- JavaScript toggles `.hidden` class for show/hide
- JavaScript sets `data-type` attribute for account card colors
- CSS provides all styling, JavaScript provides behavior

### Performance Considerations:
- CSS variables enable easy theming
- System fonts load instantly (no font downloads)
- Animations use transform (GPU accelerated)
- Media queries handle responsiveness (no JavaScript)

---

## Accessibility Features

1. **High contrast:** Dark text on light backgrounds
2. **Focus states:** Clear visual indicators
3. **Touch targets:** 44px minimum (buttons, inputs)
4. **Readable fonts:** 16px minimum
5. **Color not only indicator:** Icons + color for account types

---

## Browser Compatibility

- **CSS Grid:** All modern browsers
- **CSS Variables:** All modern browsers
- **Flexbox:** All modern browsers
- **@keyframes:** All modern browsers
- **System fonts:** Fallbacks for older browsers

---

## Maintenance Best Practices

1. **CSS variables:** Change theme by updating :root
2. **Consistent spacing:** Multiples of 8px
3. **Semantic class names:** Purpose-based, not appearance-based
4. **Mobile-first:** Base styles optimized for mobile
5. **Comments:** Sections clearly labeled

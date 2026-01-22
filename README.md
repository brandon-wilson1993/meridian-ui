# Meridian Bank UI

A simple, professional bank-like user interface built with vanilla JavaScript that integrates with the Meridian backend API.

## Features

- **Login Page**: Secure authentication with username and password
- **Account Dashboard**: View all user accounts with visual indicators
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Session Management**: Automatic session timeout and security handling
- **Professional Banking Theme**: Clean, modern design with a professional color scheme

## File Structure

```
meridian-ui/
├── index.html              # Login page
├── dashboard.html          # Account dashboard page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── config.js           # Configuration (API base URL, etc.)
│   ├── auth.js             # Authentication utilities
│   ├── api.js              # API client for meridian backend
│   ├── login.js            # Login page logic
│   └── dashboard.js        # Dashboard page logic
└── README.md               # This file
```

## Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, or Edge)
- Access to the Meridian backend API (running locally or remotely)

### Configuration

1. **Configure API Base URL**

   The API base URL can be configured in `js/config.js`:

   ```javascript
   const config = {
       apiBaseUrl: 'http://localhost:8080',
       // ... other settings
   };
   ```

   Alternatively, you can set it via environment variable by defining `window.ENV_API_BASE_URL` before loading the config script:

   ```html
   <script>
       window.ENV_API_BASE_URL = 'https://api.example.com';
   </script>
   <script src="js/config.js"></script>
   ```

2. **Session Timeout**

   The default session timeout is 30 minutes. You can adjust this in `js/config.js`:

   ```javascript
   sessionTimeout: 30 * 60 * 1000,  // 30 minutes in milliseconds
   ```

### Running the Application

#### Option 1: Simple HTTP Server (Recommended)

Using Python 3:
```bash
python3 -m http.server 8000
```

Using Python 2:
```bash
python -m SimpleHTTPServer 8000
```

Using Node.js (http-server):
```bash
npx http-server -p 8000
```

Then open your browser to `http://localhost:8000`

#### Option 2: Direct File Access

You can also open `index.html` directly in your browser, but this may cause CORS issues when connecting to the API. Using a local HTTP server is recommended.

### Using the Application

1. **Login**
   - Navigate to the login page (`index.html`)
   - Enter your username and password
   - The system will authenticate against the Meridian API
   - Upon successful login, you'll be redirected to the dashboard

2. **Dashboard**
   - View your account information
   - See all accounts associated with your user
   - Each account displays:
     - Account Type (Checking, Savings, Credit, Trading)
     - Account ID
     - Visual icon for quick identification
   - Click "Logout" to end your session

## API Integration

### Authentication

The UI uses Basic Authentication with the Meridian backend. When you log in:

1. Your credentials are stored securely in session storage
2. Each API request includes Basic Auth headers
3. The system generates a mock JWT token for UI state management

### API Endpoints Used

- **GET /users** - Retrieve all users (used for login verification)
- **GET /users/{id}** - Get user details
- **GET /users/{userId}/accounts** - Get user's accounts

### Error Handling

The application handles various error scenarios:

- **Invalid Credentials**: Displays error message on login page
- **Network Errors**: Shows connection error messages
- **Session Expiry**: Automatically redirects to login after timeout
- **API Errors**: Displays user-friendly error messages

## Design Features

### Color Scheme

The application uses a professional banking color palette:

- **Primary**: Deep blue (`#1a365d`)
- **Accent**: Lighter blue (`#3182ce`)
- **Success**: Green (`#38a169`)
- **Error**: Red (`#e53e3e`)
- **Background**: Light gray (`#f7fafc`)

### Account Type Colors

Each account type has its own color scheme:

- **Checking**: Blue (`#3182ce`) 💳
- **Savings**: Green (`#38a169`) 💰
- **Credit**: Gold (`#d69e2e`) 💵
- **Trading**: Purple (`#805ad5`) 📈

### Responsive Breakpoints

- **Desktop**: Full layout with grid
- **Tablet** (≤768px): Adjusted spacing and single-column grid
- **Mobile** (≤480px): Optimized for small screens

## Security Features

- Session storage (not localStorage) for sensitive data
- Automatic session timeout
- Secure credential handling
- Authorization headers on all API requests
- Input validation and sanitization

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Cannot Connect to API

- Verify the API base URL in `js/config.js`
- Ensure the Meridian backend is running
- Check for CORS issues (backend must allow requests from your domain)

### Login Fails

- Verify your credentials are correct
- Ensure the user exists in the Meridian backend
- Check browser console for error messages

### Dashboard Shows No Accounts

- This is normal if your user has no accounts
- Accounts can be created via the Meridian API

## Development

### Code Structure

The code is organized in a modular fashion:

- **config.js**: Centralized configuration
- **auth.js**: Authentication utilities (reusable)
- **api.js**: API client (reusable, follows REST patterns)
- **login.js**: Login page-specific logic
- **dashboard.js**: Dashboard page-specific logic

### Adding New Features

To add new features:

1. Add new API methods to `js/api.js`
2. Create new page-specific JS files as needed
3. Update the HTML files with new UI elements
4. Add styles to `css/styles.css`

## License

This project is for demonstration purposes as part of the Meridian banking system.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

/**
 * Login page logic for Meridian Bank UI
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('login.js loaded');
    
    // Check if already authenticated
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const buttonText = loginButton.querySelector('.btn-text');
    const loadingSpinner = loginButton.querySelector('.loading-spinner');
    
    console.log('Elements found:', { loginForm, usernameInput, passwordInput, loginButton });
    
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
    
    /**
     * Handle login form submission
     */
    loginForm.addEventListener('submit', async (e) => {
        console.log('Submit event fired');
        e.preventDefault();
        console.log('preventDefault called');
        hideError();
        
        // Validate form
        if (!validateForm()) {
            console.log('Validation failed');
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        console.log('Attempting login for:', username);
        console.log('API URL:', `${config.apiBaseUrl}/auth`);
        
        showLoading();
        
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

            console.log('Response received:', response.status, response.ok);

            if (!response.ok) {
                // For security, do not reveal whether username or password was incorrect
                showError('Invalid username or password');
                hideLoading();
                return;
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);
            console.log('Response keys:', Object.keys(responseData));

            // Extract token
            const token = responseData.token || responseData.accessToken || responseData;
            
            // Create user object from the username we already have
            // The backend only returns a token, so we use the login username
            const user = {
                username: username
            };
            
            console.log('Extracted token:', token);
            console.log('Created user:', user);

            if (!token) {
                console.log('Missing token');
                showError('Login failed. Please try again.');
                hideLoading();
                return;
            }

            // Store authentication data (JWT token and user info)
            Auth.login(token, user);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Login error:', error);
            showError(error.message || 'Login failed. Please try again.');
            hideLoading();
        }
    });
    
    // Clear error on input
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
});

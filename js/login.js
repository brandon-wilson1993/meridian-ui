/**
 * Login page logic for Meridian Bank UI
 */

document.addEventListener('DOMContentLoaded', () => {
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
            showError('Username or password is incorrect');
            return false;
        }
        
        return true;
    }
    
    /**
     * Handle login form submission
     */
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        showLoading();
        
        try {
            // Authenticate by calling the backend login endpoint, which validates
            // the credentials and returns a JWT token and user data.
            const response = await fetch(`${config.apiBaseUrl}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                // For security, do not reveal whether username or password was incorrect
                showError('Username or password is incorrect');
                hideLoading();
                return;
            }

            const responseData = await response.json();

            // Extract token
            const token = responseData.token || responseData.accessToken || responseData;
            
            // Create user object from the username we already have
            // The backend only returns a token, so we use the login username
            const user = {
                username: username
            };

            if (!token) {
                showError('Login failed. Please try again.');
                hideLoading();
                return;
            }

            // Store authentication data (JWT token and user info)
            Auth.login(token, user);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Login failed');
            showError('Login failed. Please try again.');
            hideLoading();
        }
    });
    
    // Clear error on input
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
});

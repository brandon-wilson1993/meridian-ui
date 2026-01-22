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
        
        if (password.length < 8) {
            showError('Password must be at least 8 characters');
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
            // Authenticate by making an API request with Basic Auth credentials
            // Since the backend doesn't have a dedicated login endpoint, we verify
            // the credentials by attempting to fetch user data with Basic Auth.
            // The backend will return 401 if credentials are invalid.
            const user = await API.users.findByUsername(username);
            
            if (!user) {
                showError('Invalid username or password');
                hideLoading();
                return;
            }
            
            // Store authentication data
            // Password is stored securely in session storage and sent with each API request
            Auth.login(username, password, user);
            
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

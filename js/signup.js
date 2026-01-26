/**
 * Sign up page logic for Meridian Bank UI
 */

// Password validation constants
const PASSWORD_REQUIREMENTS = {
    // Password must contain:
    // - At least 8 characters
    // - At least one lowercase letter (a-z)
    // - At least one uppercase letter (A-Z)
    // - At least one special character (!@#$%^&*()_+-=[]{};':"\\|,.<>/?)
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    ERROR_MESSAGE: 'Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one special character'
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const signupButton = document.getElementById('signupButton');
    const errorMessage = document.getElementById('errorMessage');
    const buttonText = signupButton.querySelector('.btn-text');
    const loadingSpinner = signupButton.querySelector('.loading-spinner');
    
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
        signupButton.disabled = true;
        buttonText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
    }
    
    /**
     * Hide loading state
     */
    function hideLoading() {
        signupButton.disabled = false;
        buttonText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
    
    /**
     * Validate form inputs
     */
    function validateForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!firstName) {
            showError('Please enter your first name');
            return false;
        }
        
        if (!lastName) {
            showError('Please enter your last name');
            return false;
        }
        
        if (!username) {
            showError('Please enter a username');
            return false;
        }
        
        if (!password) {
            showError('Please enter a password');
            return false;
        }
        
        // Password validation (at least 8 characters, one uppercase, one lowercase, one special character)
        if (!PASSWORD_REQUIREMENTS.REGEX.test(password)) {
            showError(PASSWORD_REQUIREMENTS.ERROR_MESSAGE);
            return false;
        }
        
        return true;
    }
    
    /**
     * Handle sign up form submission
     */
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        showLoading();
        
        try {
            // Call POST /users endpoint
            // Note: The Meridian API requires authentication even for user registration.
            // This is an unusual but intentional API design requirement.
            const response = await fetch(`${config.apiBaseUrl}/users`, {
                method: 'POST',
                headers: Auth.getAuthHeader(),
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    password
                })
            });

            if (response.status === 201) {
                // Success - redirect to login page
                window.location.href = 'index.html';
                return;
            }

            // Handle error response
            if (!response.ok) {
                let errorText = 'Sign up failed. Please try again.';
                try {
                    const errorData = await response.json();
                    if (errorData.error) {
                        errorText = errorData.error;
                    }
                } catch (e) {
                    // If we can't parse error, use default message
                }
                showError(errorText);
                hideLoading();
                return;
            }

            // Success (for non-201 OK responses)
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Sign up failed:', error);
            showError('Unable to connect to server. Please check your connection and try again.');
            hideLoading();
        }
    });
    
    // Clear error on input
    firstNameInput.addEventListener('input', hideError);
    lastNameInput.addEventListener('input', hideError);
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
});

/**
 * Dashboard page logic for Meridian Bank UI
 * Displays user information and account list
 */

document.addEventListener('DOMContentLoaded', () => {
    // Require authentication
    Auth.requireAuth();
    
    const userNameElement = document.getElementById('userName');
    const userGreetingElement = document.getElementById('userGreeting');
    const logoutButton = document.getElementById('logoutButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const accountsList = document.getElementById('accountsList');
    const noAccountsMessage = document.getElementById('noAccounts');
    const errorMessage = document.getElementById('errorMessage');
    
    /**
     * Account type icons (using Unicode characters for simplicity)
     */
    const accountTypeIcons = {
        'CHECKING': '💳',
        'SAVINGS': '💰',
        'CREDIT': '💵',
        'TRADING': '📈'
    };
    
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
    
    /**
     * Display user information
     */
    function displayUserInfo(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        userNameElement.textContent = fullName;
        userGreetingElement.textContent = user.firstName;
    }
    
    /**
     * Create account card HTML
     */
    function createAccountCard(account) {
        const icon = accountTypeIcons[account.accountType] || '🏦';
        const accountTypeName = account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase();
        
        const card = document.createElement('div');
        card.className = 'account-card';
        card.setAttribute('data-type', account.accountType);
        
        card.innerHTML = `
            <div class="account-header">
                <div class="account-icon">${icon}</div>
                <div class="account-type">
                    <div class="account-type-label">Account</div>
                    <div class="account-type-name">${accountTypeName}</div>
                </div>
            </div>
            <div class="account-details">
                <div class="account-id">
                    <strong>Account ID:</strong> ${account.id}
                </div>
            </div>
        `;
        
        return card;
    }
    
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
    
    /**
     * Load dashboard data
     */
    async function loadDashboard() {
        try {
            hideError();
            loadingIndicator.classList.remove('hidden');
            
            // Get user data from session
            const userData = Auth.getUserData();
            
            if (!userData || !userData.id) {
                throw new Error('User data not found. Please login again.');
            }
            
            // Display user info
            displayUserInfo(userData);
            
            // Fetch user's accounts
            const accounts = await API.accounts.getByUserId(userData.id);
            
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            // Display accounts
            displayAccounts(accounts);
            
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
    }
    
    /**
     * Handle logout
     */
    logoutButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            Auth.logout();
        }
    });
    
    // Load dashboard on page load
    loadDashboard();
});

// SIGEA - Authentication System

class AuthManager {
  static currentUser = null;

  // Check if user is logged in
  static isLoggedIn() {
    const user = localStorage.getItem('sigea_current_user');
    if (user) {
      this.currentUser = JSON.parse(user);
      return true;
    }
    return false;
  }

  // Login user
  static login(username, password) {
    const user = DataManager.authenticateUser(username, password);
    if (user) {
      // Remove password from stored user data for security
      const userToStore = { ...user };
      delete userToStore.senha;
      
      localStorage.setItem('sigea_current_user', JSON.stringify(userToStore));
      this.currentUser = userToStore;
      return { success: true, user: userToStore };
    }
    return { success: false, message: 'Usuário ou senha incorretos' };
  }

  // Logout user
  static logout() {
    localStorage.removeItem('sigea_current_user');
    this.currentUser = null;
    window.location.href = 'login.html';
  }

  // Get current user
  static getCurrentUser() {
    if (!this.currentUser && this.isLoggedIn()) {
      this.currentUser = JSON.parse(localStorage.getItem('sigea_current_user'));
    }
    return this.currentUser;
  }

  // Check user permission/role
  static hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.tipo === role;
  }

  // Redirect based on user type
  static redirectByRole() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'pages/login.html';
      return;
    }

    switch (user.tipo) {
      case 'admin':
        window.location.href = 'pages/admin.html';
        break;
      case 'professor':
        window.location.href = 'pages/professor.html';
        break;
      case 'aluno':
        if (user.perfil === 'dedicado') {
          window.location.href = 'pages/aluno-dedicado.html';
        } else {
          window.location.href = 'pages/aluno-acompanhamento.html';
        }
        break;
      default:
        this.logout();
    }
  }

  // Protect pages - call this on protected pages
  static requireAuth(requiredRole = null) {
    if (!this.isLoggedIn()) {
      window.location.href = '../pages/login.html';
      return false;
    }

    if (requiredRole && !this.hasRole(requiredRole)) {
      // User doesn't have required role, redirect to their appropriate page
      this.redirectByRole();
      return false;
    }

    return true;
  }

  // Initialize auth system
  static init() {
    // Check if we're on login page
    if (window.location.pathname.includes('login.html')) {
      // If already logged in, redirect to appropriate dashboard
      if (this.isLoggedIn()) {
        this.redirectByRole();
      }
      return;
    }

    // For all other pages, require authentication
    this.requireAuth();
  }
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('loginError');
      const submitBtn = document.getElementById('submitBtn');
      
      // Show loading state
      submitBtn.innerHTML = '<span class="spinner"></span> Entrando...';
      submitBtn.disabled = true;
      
      // Clear previous errors
      errorDiv.classList.add('hidden');
      
      // Simulate network delay for better UX
      setTimeout(() => {
        const result = AuthManager.login(username, password);
        
        if (result.success) {
          // Show success message briefly then redirect
          submitBtn.innerHTML = '✓ Sucesso!';
          submitBtn.classList.remove('btn-primary');
          submitBtn.classList.add('btn-success');
          
          setTimeout(() => {
            AuthManager.redirectByRole();
          }, 500);
        } else {
          // Show error
          errorDiv.textContent = result.message;
          errorDiv.classList.remove('hidden');
          
          // Reset button
          submitBtn.innerHTML = 'Entrar';
          submitBtn.disabled = false;
          
          // Add shake animation to form
          loginForm.classList.add('shake');
          setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
      }, 1000);
    });
  }
  
  // Initialize auth system
  AuthManager.init();
});

// Logout button handler
function handleLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    AuthManager.logout();
  }
}

// CSS for shake animation
const shakeCSS = `
.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`;

// Add shake CSS to head
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);
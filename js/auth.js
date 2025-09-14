// SIGEA - Authentication System
// Sistema de Gestão de Aulas - Sistema de Autenticação e Sessão

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.sessionKey = 'sigea_session';
    this.init();
  }

  init() {
    // Verificar se existe sessão salva
    const savedSession = localStorage.getItem(this.sessionKey);
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        // Verificar se a sessão ainda é válida (24 horas)
        const sessionAge = Date.now() - sessionData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas em ms

        if (sessionAge < maxAge) {
          this.currentUser = sessionData.user;
          this.redirectToDashboard();
        } else {
          this.logout(); // Sessão expirada
        }
      } catch (e) {
        this.logout(); // Dados corrompidos
      }
    }
  }

  async login(username, password) {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validar credenciais usando dados mockados
      const user = window.SIGEA_DATA.DataManager.autenticar(username, password);
      
      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      // Salvar sessão
      const sessionData = {
        user: user,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      this.currentUser = user;

      // Disparar evento de login
      this.dispatchAuthEvent('login', user);

      return {
        success: true,
        user: user
      };

    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  logout() {
    const previousUser = this.currentUser;
    
    // Limpar sessão
    localStorage.removeItem(this.sessionKey);
    this.currentUser = null;

    // Disparar evento de logout
    this.dispatchAuthEvent('logout', previousUser);

    // Redirecionar para login
    if (window.location.pathname !== '/pages/login.html' && 
        window.location.pathname !== '/' && 
        window.location.pathname !== '/index.html') {
      window.location.href = '/pages/login.html';
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  hasRole(role) {
    return this.currentUser && this.currentUser.tipo === role;
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/login.html';
      return false;
    }
    return true;
  }

  requireRole(role) {
    if (!this.requireAuth()) return false;
    
    if (!this.hasRole(role)) {
      this.showAccessDenied();
      return false;
    }
    return true;
  }

  redirectToDashboard() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/login.html';
      return;
    }

    const user = this.getCurrentUser();
    const dashboardRoutes = {
      'admin': '/pages/admin.html',
      'professor': '/pages/professor.html',
      'aluno': '/pages/aluno.html'
    };

    const targetRoute = dashboardRoutes[user.tipo];
    if (targetRoute && window.location.pathname !== targetRoute) {
      window.location.href = targetRoute;
    }
  }

  showAccessDenied() {
    alert('Acesso negado! Você não tem permissão para acessar esta página.');
    this.redirectToDashboard();
  }

  dispatchAuthEvent(type, user) {
    const event = new CustomEvent(`auth:${type}`, {
      detail: { user }
    });
    window.dispatchEvent(event);
  }

  // Utility para atualizar informações do usuário na sessão
  updateUserInfo(updatedUser) {
    if (this.currentUser && this.currentUser.id === updatedUser.id) {
      this.currentUser = { ...this.currentUser, ...updatedUser };
      
      const sessionData = {
        user: this.currentUser,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      this.dispatchAuthEvent('userUpdated', this.currentUser);
    }
  }
}

// UI Helper para formulário de login
class LoginForm {
  constructor(formElement, authManager) {
    this.form = formElement;
    this.auth = authManager;
    this.isLoading = false;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Enter em qualquer campo submete o form
      const inputs = this.form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.handleSubmit(e);
          }
        });
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = new FormData(this.form);
    const username = formData.get('username')?.trim();
    const password = formData.get('password')?.trim();

    // Validação básica
    if (!username || !password) {
      this.showError('Por favor, preencha todos os campos');
      return;
    }

    this.setLoading(true);
    this.clearError();

    try {
      const result = await this.auth.login(username, password);
      
      if (result.success) {
        this.showSuccess('Login realizado com sucesso!');
        
        // Pequeno delay para mostrar a mensagem de sucesso
        setTimeout(() => {
          this.auth.redirectToDashboard();
        }, 1000);
      } else {
        this.showError(result.message);
      }
    } catch (error) {
      this.showError('Erro inesperado. Tente novamente.');
      console.error('Login error:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const inputs = this.form.querySelectorAll('input');
    
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> Entrando...';
      inputs.forEach(input => input.disabled = true);
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Entrar';
      inputs.forEach(input => input.disabled = false);
    }
  }

  showError(message) {
    this.clearMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error mb-md';
    errorDiv.textContent = message;
    this.form.prepend(errorDiv);
  }

  showSuccess(message) {
    this.clearMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mb-md';
    successDiv.textContent = message;
    this.form.prepend(successDiv);
  }

  clearError() {
    this.clearMessages();
  }

  clearMessages() {
    const alerts = this.form.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
  }
}

// Proteção de rotas
class RouteGuard {
  constructor(authManager) {
    this.auth = authManager;
  }

  checkPageAccess() {
    const path = window.location.pathname;
    const publicPages = ['/pages/login.html', '/', '/index.html'];
    
    // Páginas públicas não precisam de autenticação
    if (publicPages.includes(path)) {
      // Se já está logado, redirecionar para dashboard
      if (this.auth.isAuthenticated()) {
        this.auth.redirectToDashboard();
      }
      return;
    }

    // Páginas protegidas precisam de autenticação
    if (!this.auth.requireAuth()) {
      return;
    }

    // Verificar acesso específico por página
    const user = this.auth.getCurrentUser();
    const pagePermissions = {
      '/pages/admin.html': ['admin'],
      '/pages/professor.html': ['professor'],
      '/pages/aluno.html': ['aluno']
    };

    const requiredRoles = pagePermissions[path];
    if (requiredRoles && !requiredRoles.includes(user.tipo)) {
      this.auth.showAccessDenied();
    }
  }
}

// Inicialização global
window.addEventListener('DOMContentLoaded', () => {
  // Inicializar gerenciador de autenticação
  window.authManager = new AuthManager();
  
  // Inicializar proteção de rotas
  const routeGuard = new RouteGuard(window.authManager);
  routeGuard.checkPageAccess();
  
  // Inicializar formulário de login se existir
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    new LoginForm(loginForm, window.authManager);
  }
});

// Event listeners para mudanças de autenticação
window.addEventListener('auth:login', (e) => {
  console.log('User logged in:', e.detail.user);
});

window.addEventListener('auth:logout', (e) => {
  console.log('User logged out:', e.detail.user);
});

// Utilitário para elementos que precisam mostrar info do usuário
function updateUserDisplay() {
  const user = window.authManager?.getCurrentUser();
  if (!user) return;

  // Atualizar nome do usuário
  const userNameElements = document.querySelectorAll('[data-user-name]');
  userNameElements.forEach(el => {
    el.textContent = user.nome;
  });

  // Atualizar email do usuário
  const userEmailElements = document.querySelectorAll('[data-user-email]');
  userEmailElements.forEach(el => {
    el.textContent = user.email;
  });

  // Atualizar avatar do usuário
  const userAvatarElements = document.querySelectorAll('[data-user-avatar]');
  userAvatarElements.forEach(el => {
    if (user.avatar) {
      el.src = user.avatar;
      el.alt = `Avatar de ${user.nome}`;
    }
  });

  // Atualizar role/tipo do usuário
  const userRoleElements = document.querySelectorAll('[data-user-role]');
  userRoleElements.forEach(el => {
    const roleNames = {
      'admin': 'Administrador',
      'professor': 'Professor',
      'aluno': 'Aluno'
    };
    el.textContent = roleNames[user.tipo] || user.tipo;
  });
}

// Executar após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  updateUserDisplay();
});

// Executar quando o usuário fizer login
window.addEventListener('auth:login', () => {
  setTimeout(updateUserDisplay, 100);
});
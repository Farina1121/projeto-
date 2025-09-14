// SIGEA - Main Application Logic

class SigeaApp {
  static currentPage = '';
  
  static init() {
    // Initialize data manager
    DataManager.init();
    
    // Setup global error handling
    window.addEventListener('error', this.handleError);
    
    // Setup mobile responsiveness
    this.setupResponsive();
    
    // Initialize page-specific functionality
    this.initializePage();
  }
  
  static initializePage() {
    // Determine current page from URL
    const path = window.location.pathname;
    
    if (path.includes('admin')) {
      this.currentPage = 'admin';
      this.initAdminFunctions();
    } else if (path.includes('professor')) {
      this.currentPage = 'professor';
      this.initProfessorFunctions();
    } else if (path.includes('aluno')) {
      this.currentPage = 'aluno';
      this.initAlunoFunctions();
    }
    
    // Common initialization for all pages
    this.initCommonFunctions();
  }
  
  static initCommonFunctions() {
    // Setup sidebar
    this.setupSidebar();
    
    // Setup mobile navigation
    this.setupMobileNav();
    
    // Setup logout functionality
    this.setupLogout();
  }
  
  static setupSidebar() {
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
      const user = AuthManager.getCurrentUser();
      if (user) {
        sidebarContainer.innerHTML = Sidebar.render(user.tipo, this.getCurrentPageName());
      }
    }
  }
  
  static setupMobileNav() {
    const mobileNavContainer = document.getElementById('mobile-nav');
    if (mobileNavContainer) {
      mobileNavContainer.innerHTML = MobileNav.render();
    }
  }
  
  static setupLogout() {
    // Global logout function
    window.handleLogout = () => {
      Modal.confirm('Tem certeza que deseja sair?', 'AuthManager.logout()');
    };
  }
  
  static setupResponsive() {
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Initial responsive setup
    this.handleResize();
  }
  
  static handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 1024) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.remove('open');
      }
    }
  }
  
  static handleError(error) {
    console.error('SIGEA Error:', error);
    Notification.error('Ocorreu um erro inesperado. Tente novamente.');
  }
  
  static getCurrentPageName() {
    const path = window.location.pathname;
    if (path.includes('-')) {
      return path.split('-')[1].replace('.html', '');
    }
    return path.split('/').pop().replace('.html', '');
  }
  
  // Admin-specific functions
  static initAdminFunctions() {
    // Load dashboard data
    if (window.location.pathname.includes('admin.html')) {
      this.loadAdminDashboard();
    }
  }
  
  static loadAdminDashboard() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (statsContainer) {
      const stats = DataManager.getDashboardStats();
      
      const dashboardData = [
        { value: stats.totalTurmas, label: 'Total de Turmas' },
        { value: stats.totalProfessores, label: 'Professores Ativos' },
        { value: stats.totalAlunos, label: 'Alunos Matriculados' },
        { value: `${stats.taxaPresenca}%`, label: 'Taxa de Presença' }
      ];
      
      statsContainer.innerHTML = DashboardStats.render(dashboardData);
    }
    
    // Load recent activity or alerts
    this.loadRecentActivity();
  }
  
  static loadRecentActivity() {
    const activityContainer = document.getElementById('recent-activity');
    if (activityContainer) {
      // Mock recent activity data
      const recentActivity = [
        { message: 'Nova turma criada: 3º Ano B', time: '2h atrás', type: 'info' },
        { message: 'Professor João Costa adicionado', time: '1 dia atrás', type: 'success' },
        { message: 'Aluno Lucas com muitas faltas', time: '2 dias atrás', type: 'warning' }
      ];
      
      activityContainer.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3>Atividades Recentes</h3>
          </div>
          <div class="card-body">
            ${recentActivity.map(activity => `
              <div class="activity-item" style="padding: 10px 0; border-bottom: 1px solid var(--color-gray-300);">
                <div class="activity-message">${activity.message}</div>
                <div class="activity-time" style="font-size: 0.875rem; color: var(--color-gray-600);">${activity.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
  
  // Professor-specific functions
  static initProfessorFunctions() {
    if (window.location.pathname.includes('professor.html')) {
      this.loadProfessorDashboard();
    }
  }
  
  static loadProfessorDashboard() {
    const user = AuthManager.getCurrentUser();
    const turmas = DataManager.getTurmasByProfessor(user.id);
    
    const turmasContainer = document.getElementById('turmas-professor');
    if (turmasContainer) {
      turmasContainer.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3>Minhas Turmas</h3>
          </div>
          <div class="card-body">
            ${turmas.map(turma => `
              <div class="turma-card" style="padding: 15px; border: 1px solid var(--color-gray-300); border-radius: 8px; margin-bottom: 15px;">
                <h4>${turma.nome}</h4>
                <p>Sala: ${turma.sala} | Período: ${turma.periodo}</p>
                <p>Total de Alunos: ${turma.totalAlunos}</p>
                <div style="margin-top: 10px;">
                  <button class="btn btn-primary btn-sm" onclick="viewTurmaDetails(${turma.id})">Ver Detalhes</button>
                  <button class="btn btn-secondary btn-sm" onclick="openChamada(${turma.id})">Fazer Chamada</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
  
  // Student-specific functions
  static initAlunoFunctions() {
    const user = AuthManager.getCurrentUser();
    
    if (user.perfil === 'dedicado') {
      this.loadDedicadoDashboard();
    } else {
      this.loadAcompanhamentoDashboard();
    }
  }
  
  static loadDedicadoDashboard() {
    const user = AuthManager.getCurrentUser();
    const notas = DataManager.getNotasByAluno(user.id);
    const presencas = DataManager.getPresencasByAluno(user.id);
    
    // Calculate attendance percentage
    const totalPresencas = presencas.length;
    const presenteCount = presencas.filter(p => p.presente).length;
    const taxaPresenca = totalPresencas > 0 ? (presenteCount / totalPresencas * 100).toFixed(1) : 0;
    
    const statsContainer = document.getElementById('aluno-stats');
    if (statsContainer) {
      const stats = [
        { value: notas.length, label: 'Disciplinas' },
        { value: `${taxaPresenca}%`, label: 'Presença' },
        { value: notas.length > 0 ? notas[0].media.toFixed(1) : '0.0', label: 'Média Geral' }
      ];
      
      statsContainer.innerHTML = DashboardStats.render(stats);
    }
  }
  
  static loadAcompanhamentoDashboard() {
    const user = AuthManager.getCurrentUser();
    const atividades = DataManager.getAtividadesByTurma(user.turmaId);
    
    const proximasContainer = document.getElementById('proximas-atividades');
    if (proximasContainer) {
      // Filter upcoming activities
      const hoje = new Date();
      const proximasAtividades = atividades.filter(atividade => {
        const dataVencimento = new Date(atividade.dataVencimento);
        return dataVencimento >= hoje;
      }).slice(0, 3); // Show only next 3
      
      proximasContainer.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3>🎯 Próximas Atividades</h3>
          </div>
          <div class="card-body">
            ${proximasAtividades.map(atividade => `
              <div class="atividade-card" style="padding: 15px; background: var(--color-primary-light); border-radius: 8px; margin-bottom: 10px;">
                <div style="font-weight: 600; color: var(--color-primary);">${atividade.titulo}</div>
                <div style="font-size: 0.875rem; margin: 5px 0;">${atividade.descricao}</div>
                <div style="font-size: 0.875rem; color: var(--color-warning);">📅 Vence em: ${formatDate(atividade.dataVencimento)}</div>
              </div>
            `).join('')}
            ${proximasAtividades.length === 0 ? '<p>🎉 Parabéns! Você está em dia com as atividades!</p>' : ''}
          </div>
        </div>
      `;
    }
    
    // Motivational messages
    this.showMotivationalMessage();
  }
  
  static showMotivationalMessage() {
    const messages = [
      '🌟 Você está indo muito bem! Continue assim!',
      '💪 Cada pequeno passo conta para o seu sucesso!',
      '🎯 Foque nas próximas atividades, você consegue!',
      '📚 O conhecimento é o seu maior tesouro!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setTimeout(() => {
      Notification.show(randomMessage, 'info', 7000);
    }, 2000);
  }
}

// Global functions that will be called from HTML
window.viewTurmaDetails = function(turmaId) {
  const turma = DataManager.findItem('turmas', turmaId);
  if (turma) {
    Modal.show('Detalhes da Turma', `
      <h4>${turma.nome}</h4>
      <p><strong>Professor:</strong> ${turma.professorNome}</p>
      <p><strong>Sala:</strong> ${turma.sala}</p>
      <p><strong>Período:</strong> ${turma.periodo}</p>
      <p><strong>Total de Alunos:</strong> ${turma.totalAlunos}</p>
    `);
  }
};

window.openChamada = function(turmaId) {
  window.location.href = `professor-chamada.html?turma=${turmaId}`;
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  SigeaApp.init();
});

// Export for global use
window.SigeaApp = SigeaApp;
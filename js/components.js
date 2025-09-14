// SIGEA - Reusable Components

// Sidebar Component
class Sidebar {
  static render(userType, currentPage = '') {
    const user = AuthManager.getCurrentUser();
    
    const menuItems = this.getMenuItems(userType);
    
    return `
      <div class="sidebar">
        <div class="sidebar-header">
          <h2 class="mb-md">SIGEA</h2>
          <div class="user-info">
            <div class="user-avatar">
              <img src="../${user.avatar || 'assets/avatar.png'}" alt="${user.nome}" style="width: 40px; height: 40px; border-radius: 50%;">
            </div>
            <div class="user-details">
              <div class="user-name">${user.nome}</div>
              <div class="user-role">${this.getRoleLabel(user.tipo)}</div>
            </div>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <ul class="nav-sidebar">
            ${menuItems.map(item => `
              <li class="nav-item">
                <a href="${item.href}" class="nav-link ${currentPage === item.page ? 'active' : ''}">
                  <span class="nav-icon">${item.icon}</span>
                  ${item.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
        
        <div class="sidebar-footer">
          <button onclick="handleLogout()" class="btn btn-secondary w-100">
            <span class="nav-icon">🚪</span>
            Sair
          </button>
        </div>
      </div>
    `;
  }
  
  static getMenuItems(userType) {
    const menus = {
      admin: [
        { page: 'dashboard', href: 'admin.html', icon: '📊', label: 'Dashboard' },
        { page: 'turmas', href: 'admin-turmas.html', icon: '🎓', label: 'Gerenciar Turmas' },
        { page: 'professores', href: 'admin-professores.html', icon: '👨‍🏫', label: 'Gerenciar Professores' },
        { page: 'alunos', href: 'admin-alunos.html', icon: '👥', label: 'Gerenciar Alunos' },
        { page: 'relatorios', href: 'admin-relatorios.html', icon: '📈', label: 'Relatórios' }
      ],
      professor: [
        { page: 'dashboard', href: 'professor.html', icon: '📚', label: 'Minhas Turmas' },
        { page: 'chamada', href: 'professor-chamada.html', icon: '✓', label: 'Chamada' },
        { page: 'notas', href: 'professor-notas.html', icon: '📝', label: 'Notas' },
        { page: 'atividades', href: 'professor-atividades.html', icon: '📋', label: 'Atividades' }
      ],
      aluno: [
        { page: 'dashboard', href: 'aluno-dedicado.html', icon: '🏠', label: 'Início' },
        { page: 'notas', href: 'aluno-notas.html', icon: '📊', label: 'Minhas Notas' },
        { page: 'presencas', href: 'aluno-presencas.html', icon: '📅', label: 'Presenças' },
        { page: 'atividades', href: 'aluno-atividades.html', icon: '📚', label: 'Atividades' }
      ]
    };
    
    return menus[userType] || [];
  }
  
  static getRoleLabel(tipo) {
    const labels = {
      'admin': 'Coordenador',
      'professor': 'Professor',
      'aluno': 'Aluno'
    };
    return labels[tipo] || tipo;
  }
}

// Mobile Navigation Component
class MobileNav {
  static render() {
    return `
      <div class="mobile-nav d-mobile-none">
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
          <span class="nav-icon">☰</span>
        </button>
        <div class="mobile-title">SIGEA</div>
        <button onclick="handleLogout()" class="mobile-menu-btn">
          <span class="nav-icon">🚪</span>
        </button>
      </div>
    `;
  }
}

// Dashboard Stats Component
class DashboardStats {
  static render(stats) {
    return `
      <div class="dashboard-stats">
        ${stats.map(stat => `
          <div class="stat-card">
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
            ${stat.change ? `<div class="stat-change ${stat.change > 0 ? 'positive' : 'negative'}">
              ${stat.change > 0 ? '+' : ''}${stat.change}%
            </div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Data Table Component
class DataTable {
  static render(columns, data, actions = []) {
    return `
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              ${columns.map(col => `<th>${col.label}</th>`).join('')}
              ${actions.length > 0 ? '<th>Ações</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${columns.map(col => `<td>${this.formatCellData(row[col.key], col.type)}</td>`).join('')}
                ${actions.length > 0 ? `
                  <td>
                    ${actions.map(action => `
                      <button class="btn btn-sm ${action.class}" onclick="${action.onclick}(${row.id})">
                        ${action.label}
                      </button>
                    `).join(' ')}
                  </td>
                ` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
  
  static formatCellData(value, type) {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');
      case 'status':
        return `<span class="badge badge-${value === 'ativo' ? 'success' : 'warning'}">${value}</span>`;
      case 'presence':
        return `<span class="badge badge-${value ? 'success' : 'error'}">${value ? 'Presente' : 'Ausente'}</span>`;
      case 'grade':
        return parseFloat(value).toFixed(1);
      default:
        return value;
    }
  }
}

// Form Component
class FormComponent {
  static render(fields, submitText = 'Salvar', onSubmit = '') {
    return `
      <form onsubmit="${onSubmit}">
        ${fields.map(field => this.renderField(field)).join('')}
        <div class="form-group">
          <button type="submit" class="btn btn-primary">${submitText}</button>
        </div>
      </form>
    `;
  }
  
  static renderField(field) {
    const { type, name, label, value = '', options = [], required = false, placeholder = '' } = field;
    
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
        return `
          <div class="form-group">
            <label class="form-label" for="${name}">${label}</label>
            <input 
              type="${type}" 
              id="${name}" 
              name="${name}" 
              class="form-input" 
              value="${value}"
              placeholder="${placeholder}"
              ${required ? 'required' : ''}
            >
          </div>
        `;
      
      case 'select':
        return `
          <div class="form-group">
            <label class="form-label" for="${name}">${label}</label>
            <select id="${name}" name="${name}" class="form-select" ${required ? 'required' : ''}>
              <option value="">Selecione...</option>
              ${options.map(opt => `
                <option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>
                  ${opt.label}
                </option>
              `).join('')}
            </select>
          </div>
        `;
      
      case 'textarea':
        return `
          <div class="form-group">
            <label class="form-label" for="${name}">${label}</label>
            <textarea 
              id="${name}" 
              name="${name}" 
              class="form-textarea" 
              placeholder="${placeholder}"
              rows="4"
              ${required ? 'required' : ''}
            >${value}</textarea>
          </div>
        `;
      
      default:
        return '';
    }
  }
}

// Modal Component
class Modal {
  static show(title, content, actions = []) {
    const modalHTML = `
      <div class="modal-overlay" id="modal-overlay" onclick="Modal.hide()">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h3>${title}</h3>
            <button onclick="Modal.hide()" class="btn btn-sm btn-secondary">×</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${actions.length > 0 ? `
            <div class="modal-footer">
              ${actions.map(action => `
                <button class="btn ${action.class}" onclick="${action.onclick}">
                  ${action.label}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // Remove existing modal
    const existing = document.getElementById('modal-overlay');
    if (existing) existing.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  static hide() {
    const modal = document.getElementById('modal-overlay');
    if (modal) modal.remove();
  }
  
  static confirm(message, onConfirm) {
    this.show('Confirmação', `<p>${message}</p>`, [
      { label: 'Cancelar', class: 'btn-secondary', onclick: 'Modal.hide()' },
      { label: 'Confirmar', class: 'btn-primary', onclick: `${onConfirm}; Modal.hide()` }
    ]);
  }
}

// Notification System
class Notification {
  static show(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1001';
    notification.style.minWidth = '300px';
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
  }
  
  static success(message) {
    this.show(message, 'success');
  }
  
  static error(message) {
    this.show(message, 'error');
  }
  
  static warning(message) {
    this.show(message, 'warning');
  }
}

// Utility Functions
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
}

// Export for use in other files
window.Sidebar = Sidebar;
window.MobileNav = MobileNav;
window.DashboardStats = DashboardStats;
window.DataTable = DataTable;
window.FormComponent = FormComponent;
window.Modal = Modal;
window.Notification = Notification;
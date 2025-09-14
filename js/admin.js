// SIGEA - Admin Dashboard JavaScript
// Sistema de Gestão de Aulas - Funcionalidades do Painel Administrativo

class AdminDashboard {
    constructor() {
        this.data = window.SIGEA_DATA;
        this.currentView = 'dashboard';
        this.init();
    }

    init() {
        // Verificar autenticação e permissão
        if (!window.authManager?.requireRole('admin')) {
            return;
        }

        this.loadDashboardData();
        this.setupEventListeners();
        this.setupNavigation();
        this.renderFrequencyChart();
        this.populateSelectOptions();
    }

    loadDashboardData() {
        const metrics = this.data.metricas;
        
        // Atualizar KPIs
        document.getElementById('totalAlunos').textContent = metrics.totalAlunos;
        document.getElementById('totalProfessores').textContent = metrics.totalProfessores;
        document.getElementById('totalTurmas').textContent = metrics.totalTurmas;
        document.getElementById('presencaMedia').textContent = `${metrics.presencaMedia}%`;
        document.getElementById('alunosRisco').textContent = metrics.alunosRisco;
        document.getElementById('aprovacaoMedia').textContent = `${metrics.aprovacaoMedia}%`;
    }

    setupEventListeners() {
        // Event listeners para ações rápidas
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item')) {
                e.preventDefault();
                this.handleNavigation(e.target);
            }
        });

        // Fechar modais clicando fora
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-overlay')) {
                this.closeModal(e.target.id);
            }
        });

        // ESC para fechar modais
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    this.closeModal(activeModal.id);
                }
            }
        });
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remover classe active de todos
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Adicionar classe active ao clicado
                item.classList.add('active');
                
                // Obter a seção do href
                const section = item.getAttribute('href').replace('#', '');
                this.loadSection(section);
            });
        });
    }

    loadSection(section) {
        this.currentView = section;
        const mainBody = document.querySelector('.main-body');
        
        switch(section) {
            case 'dashboard':
                location.reload(); // Recarregar dashboard
                break;
            case 'turmas':
                mainBody.innerHTML = this.renderTurmasSection();
                break;
            case 'professores':
                mainBody.innerHTML = this.renderProfessoresSection();
                break;
            case 'alunos':
                mainBody.innerHTML = this.renderAlunosSection();
                break;
            case 'relatorios':
                mainBody.innerHTML = this.renderRelatoriosSection();
                break;
            case 'configuracoes':
                mainBody.innerHTML = this.renderConfiguracoesSection();
                break;
        }
    }

    renderTurmasSection() {
        const turmas = this.data.turmas;
        
        return `
            <div class="section-header flex justify-between items-center mb-xl">
                <div>
                    <h2 class="text-h2 mb-sm">Gerenciar Turmas</h2>
                    <p class="text-small text-neutral-600">Cadastre, edite e gerencie as turmas da escola</p>
                </div>
                <button class="btn btn-primary" onclick="adminDashboard.openModal('addTurmaModal')">
                    ➕ Nova Turma
                </button>
            </div>

            <div class="table">
                <thead>
                    <tr>
                        <th>Turma</th>
                        <th>Professor</th>
                        <th>Alunos</th>
                        <th>Frequência</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${turmas.map(turma => `
                        <tr>
                            <td>
                                <strong>${turma.nome}</strong><br>
                                <small class="text-neutral-500">${turma.horario} - ${turma.sala}</small>
                            </td>
                            <td>${turma.professor}</td>
                            <td>
                                <span class="badge badge-primary">${turma.alunosPresentes}/${turma.totalAlunos}</span>
                            </td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${(turma.alunosPresentes/turma.totalAlunos)*100}%"></div>
                                </div>
                                ${Math.round((turma.alunosPresentes/turma.totalAlunos)*100)}%
                            </td>
                            <td>
                                <span class="badge ${turma.ativa ? 'badge-success' : 'badge-error'}">
                                    ${turma.ativa ? 'Ativa' : 'Inativa'}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-secondary" onclick="adminDashboard.editTurma(${turma.id})">Editar</button>
                                <button class="btn btn-sm btn-error" onclick="adminDashboard.deleteTurma(${turma.id})">Excluir</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </div>
        `;
    }

    renderProfessoresSection() {
        const professores = this.data.professores;
        
        return `
            <div class="section-header flex justify-between items-center mb-xl">
                <div>
                    <h2 class="text-h2 mb-sm">Gerenciar Professores</h2>
                    <p class="text-small text-neutral-600">Cadastre e gerencie os professores da escola</p>
                </div>
                <button class="btn btn-primary" onclick="adminDashboard.openModal('addProfessorModal')">
                    ➕ Novo Professor
                </button>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
                ${professores.map(professor => `
                    <div class="card">
                        <div class="card-content text-center">
                            <div class="mb-md">👨‍🏫</div>
                            <h3 class="text-h4 mb-sm">${professor.nome}</h3>
                            <p class="text-small text-neutral-600 mb-md">${professor.email}</p>
                            <div class="mb-md">
                                ${professor.disciplinas.map(disc => 
                                    `<span class="badge badge-primary mr-xs">${disc}</span>`
                                ).join('')}
                            </div>
                            <p class="text-xs text-neutral-500 mb-md">
                                ${professor.experiencia} de experiência<br>
                                ${professor.formacao}
                            </p>
                            <div class="flex gap-sm justify-center">
                                <button class="btn btn-sm btn-secondary" onclick="adminDashboard.editProfessor(${professor.id})">
                                    Editar
                                </button>
                                <button class="btn btn-sm btn-accent" onclick="adminDashboard.viewProfessorTurmas(${professor.id})">
                                    Turmas
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAlunosSection() {
        const alunos = this.data.alunos;
        
        return `
            <div class="section-header flex justify-between items-center mb-xl">
                <div>
                    <h2 class="text-h2 mb-sm">Gerenciar Alunos</h2>
                    <p class="text-small text-neutral-600">Cadastre e acompanhe os alunos da escola</p>
                </div>
                <button class="btn btn-primary" onclick="adminDashboard.openModal('addAlunoModal')">
                    ➕ Novo Aluno
                </button>
            </div>

            <div class="table">
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Matrícula</th>
                        <th>Turma</th>
                        <th>Frequência</th>
                        <th>Média</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${alunos.map(aluno => {
                        const turma = this.data.turmas.find(t => t.id === aluno.turmaId);
                        const notas = this.data.notas.filter(n => n.alunoId === aluno.id);
                        const frequencia = this.data.DataManager.calcularFrequencia(aluno.id);
                        const mediaGeral = notas.length > 0 ? 
                            notas.reduce((acc, n) => acc + n.media, 0) / notas.length : 0;
                        
                        const statusColor = frequencia < 75 || mediaGeral < 6 ? 'badge-error' : 
                                          frequencia < 85 || mediaGeral < 7 ? 'badge-warning' : 'badge-success';
                        const statusText = frequencia < 75 || mediaGeral < 6 ? 'Risco' : 
                                         frequencia < 85 || mediaGeral < 7 ? 'Atenção' : 'Normal';
                        
                        return `
                            <tr>
                                <td>
                                    <strong>${aluno.nome}</strong><br>
                                    <small class="text-neutral-500">${aluno.email}</small>
                                </td>
                                <td>${aluno.matricula}</td>
                                <td>${turma ? turma.nome : 'N/A'}</td>
                                <td>
                                    <div class="progress progress-${frequencia < 75 ? 'error' : frequencia < 85 ? 'warning' : 'success'}">
                                        <div class="progress-bar" style="width: ${frequencia}%"></div>
                                    </div>
                                    ${frequencia}%
                                </td>
                                <td>
                                    <span class="text-${mediaGeral < 6 ? 'error' : mediaGeral < 7 ? 'warning' : 'success'}">
                                        ${mediaGeral.toFixed(1)}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge ${statusColor}">${statusText}</span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="adminDashboard.viewStudent(${aluno.id})">Ver</button>
                                    <button class="btn btn-sm btn-accent" onclick="adminDashboard.editStudent(${aluno.id})">Editar</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </div>
        `;
    }

    renderRelatoriosSection() {
        return `
            <div class="section-header mb-xl">
                <h2 class="text-h2 mb-sm">Relatórios e Análises</h2>
                <p class="text-small text-neutral-600">Gere relatórios detalhados e analise o desempenho</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
                <div class="card action-card" onclick="adminDashboard.generateReport('frequencia')">
                    <div class="card-content text-center">
                        <div class="action-icon">📊</div>
                        <h3 class="action-title">Relatório de Frequência</h3>
                        <p class="action-description">Análise detalhada de presença por turma e período</p>
                    </div>
                </div>

                <div class="card action-card" onclick="adminDashboard.generateReport('notas')">
                    <div class="card-content text-center">
                        <div class="action-icon">📈</div>
                        <h3 class="action-title">Relatório de Notas</h3>
                        <p class="action-description">Performance acadêmica por disciplina</p>
                    </div>
                </div>

                <div class="card action-card" onclick="adminDashboard.generateReport('aprovacao')">
                    <div class="card-content text-center">
                        <div class="action-icon">🎯</div>
                        <h3 class="action-title">Taxa de Aprovação</h3>
                        <p class="action-description">Índices de aprovação e reprovação</p>
                    </div>
                </div>

                <div class="card action-card" onclick="adminDashboard.generateReport('professores')">
                    <div class="card-content text-center">
                        <div class="action-icon">👨‍🏫</div>
                        <h3 class="action-title">Desempenho Docente</h3>
                        <p class="action-description">Análise do trabalho dos professores</p>
                    </div>
                </div>

                <div class="card action-card" onclick="adminDashboard.generateReport('turmas')">
                    <div class="card-content text-center">
                        <div class="action-icon">🏫</div>
                        <h3 class="action-title">Relatório por Turma</h3>
                        <p class="action-description">Comparativo entre turmas</p>
                    </div>
                </div>

                <div class="card action-card" onclick="adminDashboard.generateReport('geral')">
                    <div class="card-content text-center">
                        <div class="action-icon">📋</div>
                        <h3 class="action-title">Relatório Geral</h3>
                        <p class="action-description">Visão completa da escola</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderConfiguracoesSection() {
        return `
            <div class="section-header mb-xl">
                <h2 class="text-h2 mb-sm">Configurações do Sistema</h2>
                <p class="text-small text-neutral-600">Gerencie as configurações gerais do SIGEA</p>
            </div>

            <div class="grid md:grid-cols-2 gap-xl">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-h4">⚙️ Configurações Gerais</h3>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label class="form-label">Nome da Escola</label>
                            <input type="text" class="form-input" value="Escola Estadual SIGEA" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Ano Letivo</label>
                            <input type="text" class="form-input" value="2024" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Frequência Mínima (%)</label>
                            <input type="number" class="form-input" value="75" min="0" max="100" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nota Mínima para Aprovação</label>
                            <input type="number" class="form-input" value="6.0" min="0" max="10" step="0.1" />
                        </div>
                        <button class="btn btn-primary">Salvar Configurações</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="text-h4">👥 Gerenciar Perfis</h3>
                    </div>
                    <div class="card-content">
                        <p class="text-small text-neutral-600 mb-md">Configure permissões e tipos de usuário</p>
                        <div class="flex flex-col gap-md">
                            <button class="btn btn-secondary">Gerenciar Administradores</button>
                            <button class="btn btn-secondary">Configurar Permissões</button>
                            <button class="btn btn-secondary">Backup do Sistema</button>
                            <button class="btn btn-secondary">Logs de Atividade</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFrequencyChart() {
        const chart = document.getElementById('frequencyChart');
        const data = this.data.metricas.frequenciaUltimaSemana;
        
        chart.innerHTML = data.map(day => {
            const percentage = Math.round((day.presente / day.total) * 100);
            const height = (percentage / 100) * 120; // Max height 120px
            
            return `
                <div class="chart-bar" style="height: ${height}px;" title="${day.dia}: ${day.presente}/${day.total} (${percentage}%)">
                    ${percentage}%
                </div>
            `;
        }).join('');
    }

    populateSelectOptions() {
        // Popular select de professores no modal de turma
        const professorSelect = document.querySelector('#addTurmaModal select[name="professorId"]');
        if (professorSelect) {
            professorSelect.innerHTML = '<option value="">Selecione...</option>' +
                this.data.professores.map(prof => 
                    `<option value="${prof.id}">${prof.nome} - ${prof.disciplinas.join(', ')}</option>`
                ).join('');
        }
    }

    // Métodos de Modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Ações de CRUD
    saveTurma() {
        const form = document.getElementById('addTurmaForm');
        const formData = new FormData(form);
        
        const novaTurma = {
            id: this.data.turmas.length + 1,
            nome: formData.get('nome'),
            serie: formData.get('serie'),
            disciplina: formData.get('disciplina'),
            professorId: parseInt(formData.get('professorId')),
            professor: this.data.professores.find(p => p.id === parseInt(formData.get('professorId')))?.nome || '',
            totalAlunos: 0,
            alunosPresentes: 0,
            ativa: true,
            horario: '08:00 - 09:40',
            sala: 'A definir',
            periodo: '2024.1'
        };

        this.data.turmas.push(novaTurma);
        this.showToast('Turma criada com sucesso!', 'success');
        this.closeModal('addTurmaModal');
        form.reset();
        
        if (this.currentView === 'turmas') {
            this.loadSection('turmas');
        }
    }

    editTurma(id) {
        const turma = this.data.turmas.find(t => t.id === id);
        if (turma) {
            this.showToast(`Editando turma: ${turma.nome}`, 'info');
            // Implementar modal de edição
        }
    }

    deleteTurma(id) {
        if (confirm('Tem certeza que deseja excluir esta turma?')) {
            const index = this.data.turmas.findIndex(t => t.id === id);
            if (index !== -1) {
                this.data.turmas.splice(index, 1);
                this.showToast('Turma excluída com sucesso!', 'success');
                if (this.currentView === 'turmas') {
                    this.loadSection('turmas');
                }
            }
        }
    }

    viewStudent(id) {
        const aluno = this.data.alunos.find(a => a.id === id);
        if (aluno) {
            this.showToast(`Visualizando aluno: ${aluno.nome}`, 'info');
            // Implementar modal de visualização do aluno
        }
    }

    editStudent(id) {
        const aluno = this.data.alunos.find(a => a.id === id);
        if (aluno) {
            this.showToast(`Editando aluno: ${aluno.nome}`, 'info');
            // Implementar modal de edição do aluno
        }
    }

    generateReport(type) {
        this.showToast(`Gerando relatório de ${type}...`, 'info');
        
        // Simular geração de relatório
        setTimeout(() => {
            this.showToast(`Relatório de ${type} gerado com sucesso!`, 'success');
            // Aqui seria implementada a geração real do relatório
        }, 2000);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} show`;
        toast.innerHTML = `
            <div class="flex items-center gap-sm">
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Funções globais para serem chamadas do HTML
function openModal(modalId) {
    window.adminDashboard?.openModal(modalId);
}

function closeModal(modalId) {
    window.adminDashboard?.closeModal(modalId);
}

function saveTurma() {
    window.adminDashboard?.saveTurma();
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.authManager?.logout();
    }
}

function showQuickAdd() {
    window.adminDashboard?.openModal('addTurmaModal');
}

function exportData() {
    window.adminDashboard?.generateReport('geral');
}

function viewStudent(id) {
    window.adminDashboard?.viewStudent(id);
}

function viewClass(id) {
    // Navegar para turmas e destacar a turma específica
    window.adminDashboard?.loadSection('turmas');
}

function contactTeacher(id) {
    const professor = window.SIGEA_DATA.professores.find(p => p.id === id);
    if (professor) {
        window.adminDashboard?.showToast(`Entrando em contato com ${professor.nome}...`, 'info');
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});
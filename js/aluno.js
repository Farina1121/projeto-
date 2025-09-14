// SIGEA - Student Dashboard JavaScript
// Sistema de Gestão de Aulas - Funcionalidades do Painel do Aluno

class StudentDashboard {
    constructor() {
        this.data = window.SIGEA_DATA;
        this.currentUser = null;
        this.studentProfile = null;
        this.currentView = 'dashboard';
        this.init();
    }

    init() {
        // Verificar autenticação e permissão
        if (!window.authManager?.requireRole('aluno')) {
            return;
        }

        this.currentUser = window.authManager.getCurrentUser();
        this.studentProfile = this.currentUser.perfil; // 'dedicada' ou 'acompanhamento'
        
        this.setupInterface();
        this.loadContent();
    }

    setupInterface() {
        // Configurar navegação baseada no perfil
        const nav = document.getElementById('studentNav');
        const headerTitle = document.getElementById('headerTitle');
        
        if (this.studentProfile === 'dedicada') {
            // Interface detalhada para Ana (aluna dedicada)
            headerTitle.textContent = 'Painel Detalhado';
            nav.innerHTML = `
                <a href="#dashboard" class="nav-item active">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">Dashboard</span>
                </a>
                <a href="#notas" class="nav-item">
                    <span class="nav-icon">📈</span>
                    <span class="nav-text">Notas</span>
                </a>
                <a href="#frequencia" class="nav-item">
                    <span class="nav-icon">📅</span>
                    <span class="nav-text">Frequência</span>
                </a>
                <a href="#progresso" class="nav-item">
                    <span class="nav-icon">🎯</span>
                    <span class="nav-text">Progresso</span>
                </a>
                <a href="#agenda" class="nav-item">
                    <span class="nav-icon">📋</span>
                    <span class="nav-text">Agenda</span>
                </a>
            `;
        } else {
            // Interface simplificada para Lucas (aluno que precisa de acompanhamento)
            headerTitle.textContent = 'Meu Painel';
            nav.innerHTML = `
                <a href="#dashboard" class="nav-item active">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Início</span>
                </a>
                <a href="#tarefas" class="nav-item">
                    <span class="nav-icon">✅</span>
                    <span class="nav-text">Tarefas</span>
                </a>
                <a href="#notas" class="nav-item">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">Minhas Notas</span>
                </a>
                <a href="#conquistas" class="nav-item">
                    <span class="nav-icon">🏆</span>
                    <span class="nav-text">Conquistas</span>
                </a>
            `;
        }

        this.setupNavigation();
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
        
        if (this.studentProfile === 'dedicada') {
            this.loadDedicatedSection(section);
        } else {
            this.loadSimplifiedSection(section);
        }
    }

    loadContent() {
        if (this.studentProfile === 'dedicada') {
            this.loadDedicatedDashboard();
        } else {
            this.loadSimplifiedDashboard();
        }
    }

    // === INTERFACE DEDICADA (ANA) ===
    loadDedicatedDashboard() {
        const studentData = this.getStudentData();
        const progresso = this.data.DataManager.calcularProgresso(this.currentUser.id);
        
        document.getElementById('studentInterface').innerHTML = `
            <div class="dedicated-interface">
                <!-- Header do Estudante -->
                <div class="student-header">
                    <div class="student-avatar">${this.getInitials()}</div>
                    <h2 class="student-name">${this.currentUser.nome}</h2>
                    <p class="student-info">${studentData.turma} • Matrícula: ${studentData.matricula}</p>
                </div>

                <!-- Visão Geral do Progresso -->
                <div class="progress-overview">
                    <div class="progress-card">
                        <div class="progress-circle ${this.getProgressClass(progresso.frequencia)}">
                            ${progresso.frequencia}%
                        </div>
                        <h3 class="text-h4">Frequência</h3>
                        <p class="text-small text-neutral-600">Presença geral</p>
                    </div>
                    <div class="progress-card">
                        <div class="progress-circle ${this.getProgressClass(progresso.notas * 10)}">
                            ${progresso.notas.toFixed(1)}
                        </div>
                        <h3 class="text-h4">Média Geral</h3>
                        <p class="text-small text-neutral-600">Todas as disciplinas</p>
                    </div>
                    <div class="progress-card">
                        <div class="progress-circle ${this.getProgressClass(progresso.atividades)}">
                            ${progresso.atividades}%
                        </div>
                        <h3 class="text-h4">Atividades</h3>
                        <p class="text-small text-neutral-600">Entregas completas</p>
                    </div>
                </div>

                <!-- Notas Detalhadas -->
                <div class="grades-container">
                    <h3 class="text-h3 mb-lg">📊 Notas por Disciplina</h3>
                    ${this.renderDetailedGrades()}
                </div>

                <!-- Frequência Recente -->
                <div class="attendance-summary">
                    <h3 class="text-h3 mb-md">📅 Frequência dos Últimos 5 Dias</h3>
                    <div class="attendance-chart">
                        ${this.renderAttendanceChart()}
                    </div>
                    <p class="text-small text-neutral-600 mt-md text-center">
                        Verde = Presente • Vermelho = Ausente • Cinza = Futuro
                    </p>
                </div>

                <!-- Próximas Atividades -->
                <div class="detailed-stats">
                    <h3 class="text-h3 mb-lg">📋 Próximas Atividades</h3>
                    ${this.renderUpcomingActivities()}
                </div>
            </div>
        `;
    }

    loadDedicatedSection(section) {
        const interface = document.getElementById('studentInterface');
        
        switch(section) {
            case 'dashboard':
                this.loadDedicatedDashboard();
                break;
            case 'notas':
                interface.innerHTML = this.renderDetailedGradesSection();
                break;
            case 'frequencia':
                interface.innerHTML = this.renderDetailedAttendanceSection();
                break;
            case 'progresso':
                interface.innerHTML = this.renderProgressSection();
                break;
            case 'agenda':
                interface.innerHTML = this.renderAgendaSection();
                break;
        }
    }

    // === INTERFACE SIMPLIFICADA (LUCAS) ===
    loadSimplifiedDashboard() {
        const studentData = this.getStudentData();
        const nextAction = this.getNextPriorityAction();
        const achievements = this.getRecentAchievements();
        
        document.getElementById('studentInterface').innerHTML = `
            <div class="simplified-interface">
                <!-- Header Motivacional -->
                <div class="motivational-header">
                    <div class="student-avatar">${this.getInitials()}</div>
                    <h2 class="student-name">Olá, ${this.currentUser.nome.split(' ')[0]}! 👋</h2>
                    <p class="student-info">Vamos conquistar mais um dia de aprendizado!</p>
                </div>

                <!-- Conquistas Recentes -->
                ${achievements.length > 0 ? `
                    <div class="encouragement-banner">
                        <h3>🎉 Parabéns pelas conquistas!</h3>
                        <div style="margin-top: var(--space-md);">
                            ${achievements.map(achievement => 
                                `<span class="achievement-badge">${achievement.icon} ${achievement.text}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Próxima Ação Prioritária -->
                <div class="next-action-card">
                    <div class="action-icon">${nextAction.icon}</div>
                    <h3 class="action-title">${nextAction.title}</h3>
                    <p class="action-description">${nextAction.description}</p>
                    <button class="btn btn-accent btn-lg" onclick="studentDashboard.completeAction('${nextAction.id}')">
                        ${nextAction.actionText}
                    </button>
                </div>

                <!-- Lista de Prioridades -->
                <div class="priority-list">
                    ${this.renderPriorityList()}
                </div>
            </div>
        `;
    }

    loadSimplifiedSection(section) {
        const interface = document.getElementById('studentInterface');
        
        switch(section) {
            case 'dashboard':
                this.loadSimplifiedDashboard();
                break;
            case 'tarefas':
                interface.innerHTML = this.renderSimplifiedTasksSection();
                break;
            case 'notas':
                interface.innerHTML = this.renderSimplifiedGradesSection();
                break;
            case 'conquistas':
                interface.innerHTML = this.renderAchievementsSection();
                break;
        }
    }

    // === MÉTODOS AUXILIARES ===
    getStudentData() {
        const aluno = this.data.alunos.find(a => a.id === this.currentUser.id);
        const turma = this.data.turmas.find(t => t.id === aluno?.turmaId);
        
        return {
            aluno: aluno,
            turma: turma?.nome || 'Turma não encontrada',
            matricula: aluno?.matricula || 'N/A'
        };
    }

    getInitials() {
        return this.currentUser.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    }

    getProgressClass(percentage) {
        if (percentage >= 90) return 'excellent';
        if (percentage >= 75) return 'good';
        if (percentage >= 60) return 'warning';
        return 'danger';
    }

    renderDetailedGrades() {
        const notas = this.data.DataManager.notasPorAluno(this.currentUser.id);
        
        if (notas.length === 0) {
            return '<p class="text-neutral-600">Nenhuma nota disponível ainda.</p>';
        }

        return notas.map(nota => `
            <div class="grade-item">
                <div class="grade-subject">${nota.disciplina}</div>
                <div class="grade-values">
                    <span class="grade-value">N1: ${nota.nota1}</span>
                    <span class="grade-value">N2: ${nota.nota2}</span>
                    <span class="grade-value grade-average">Média: ${nota.media.toFixed(1)}</span>
                    <span class="badge ${nota.situacao === 'aprovado' ? 'badge-success' : 'badge-warning'}">
                        ${nota.situacao === 'aprovado' ? 'Aprovado' : 'Em andamento'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    renderAttendanceChart() {
        // Simular últimos 5 dias de aula
        const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
        const attendance = [true, true, false, true, true]; // Mock data
        
        return days.map((day, index) => {
            const status = attendance[index] ? 'present' : 'absent';
            return `<div class="attendance-day ${status}">${day}</div>`;
        }).join('');
    }

    renderUpcomingActivities() {
        const atividades = this.data.DataManager.atividadesPorAluno(this.currentUser.id)
            .filter(a => a.status !== 'entregue')
            .slice(0, 3);

        if (atividades.length === 0) {
            return '<p class="text-neutral-600">Nenhuma atividade pendente. Parabéns! 🎉</p>';
        }

        return atividades.map(atividade => {
            const vencimento = new Date(atividade.dataVencimento);
            const hoje = new Date();
            const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
            
            return `
                <div class="flex justify-between items-center p-md border-bottom-1 border-neutral-100">
                    <div>
                        <h4 class="text-body font-medium">${atividade.titulo}</h4>
                        <p class="text-small text-neutral-600">${atividade.disciplina}</p>
                    </div>
                    <div class="text-right">
                        <span class="badge ${diasRestantes <= 1 ? 'badge-error' : diasRestantes <= 3 ? 'badge-warning' : 'badge-primary'}">
                            ${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getNextPriorityAction() {
        const atividades = this.data.DataManager.atividadesPorAluno(this.currentUser.id)
            .filter(a => a.status !== 'entregue');

        if (atividades.length === 0) {
            return {
                id: 'review',
                icon: '📖',
                title: 'Revisar Conteúdo',
                description: 'Que tal revisar o que você aprendeu hoje?',
                actionText: 'Começar Revisão'
            };
        }

        const proxima = atividades[0];
        return {
            id: proxima.id,
            icon: '📝',
            title: proxima.titulo,
            description: `Vencimento: ${new Date(proxima.dataVencimento).toLocaleDateString('pt-BR')}`,
            actionText: 'Começar Atividade'
        };
    }

    getRecentAchievements() {
        // Mock achievements - em um sistema real, viria do backend
        const achievements = [];
        
        const frequencia = this.data.DataManager.calcularFrequencia(this.currentUser.id);
        if (frequencia >= 95) {
            achievements.push({ icon: '🏆', text: 'Frequência Exemplar!' });
        }
        
        const progresso = this.data.DataManager.calcularProgresso(this.currentUser.id);
        if (progresso.atividades >= 80) {
            achievements.push({ icon: '⭐', text: 'Entregador Dedicado!' });
        }
        
        return achievements;
    }

    renderPriorityList() {
        const atividades = this.data.DataManager.atividadesPorAluno(this.currentUser.id)
            .filter(a => a.status !== 'entregue')
            .slice(0, 5);

        if (atividades.length === 0) {
            return `
                <div class="priority-item low">
                    <div class="priority-icon">🎉</div>
                    <div class="priority-content">
                        <div class="priority-title">Parabéns!</div>
                        <div class="priority-meta">Todas as atividades estão em dia</div>
                    </div>
                    <button class="priority-action" onclick="studentDashboard.celebrateCompletion()">
                        Comemorar!
                    </button>
                </div>
            `;
        }

        return atividades.map(atividade => {
            const vencimento = new Date(atividade.dataVencimento);
            const hoje = new Date();
            const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
            
            const priority = diasRestantes <= 1 ? 'high' : diasRestantes <= 3 ? 'medium' : 'low';
            const icon = priority === 'high' ? '🚨' : priority === 'medium' ? '⚠️' : '📝';
            
            return `
                <div class="priority-item ${priority}">
                    <div class="priority-icon">${icon}</div>
                    <div class="priority-content">
                        <div class="priority-title">${atividade.titulo}</div>
                        <div class="priority-meta">
                            ${atividade.disciplina} • Vence em ${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <button class="priority-action" onclick="studentDashboard.startActivity(${atividade.id})">
                        Começar
                    </button>
                </div>
            `;
        }).join('');
    }

    renderSimplifiedTasksSection() {
        return `
            <div class="simplified-interface">
                <h2 class="text-h2 mb-xl text-center">✅ Minhas Tarefas</h2>
                <div class="priority-list">
                    ${this.renderPriorityList()}
                </div>
            </div>
        `;
    }

    renderSimplifiedGradesSection() {
        const notas = this.data.DataManager.notasPorAluno(this.currentUser.id);
        
        return `
            <div class="simplified-interface">
                <h2 class="text-h2 mb-xl text-center">📊 Minhas Notas</h2>
                <div class="grades-container">
                    ${notas.length > 0 ? notas.map(nota => `
                        <div class="grade-item">
                            <div class="grade-subject">${nota.disciplina}</div>
                            <div class="grade-values">
                                <span class="grade-value grade-average">Média: ${nota.media.toFixed(1)}</span>
                                <span class="badge ${nota.media >= 7 ? 'badge-success' : nota.media >= 6 ? 'badge-warning' : 'badge-error'}">
                                    ${nota.media >= 7 ? '😊 Ótimo!' : nota.media >= 6 ? '😐 Pode melhorar' : '😟 Precisa de ajuda'}
                                </span>
                            </div>
                        </div>
                    `).join('') : '<p class="text-center text-neutral-600">Aguardando notas dos professores...</p>'}
                </div>
            </div>
        `;
    }

    renderAchievementsSection() {
        const achievements = this.getAllAchievements();
        
        return `
            <div class="simplified-interface">
                <h2 class="text-h2 mb-xl text-center">🏆 Minhas Conquistas</h2>
                <div class="grid md:grid-cols-2 gap-lg">
                    ${achievements.map(achievement => `
                        <div class="card ${achievement.earned ? '' : 'opacity-50'}">
                            <div class="card-content text-center">
                                <div style="font-size: 3rem; margin-bottom: var(--space-md);">
                                    ${achievement.icon}
                                </div>
                                <h3 class="text-h4 mb-sm">${achievement.title}</h3>
                                <p class="text-small text-neutral-600 mb-md">${achievement.description}</p>
                                <span class="badge ${achievement.earned ? 'badge-success' : 'badge-neutral'}">
                                    ${achievement.earned ? 'Conquistado!' : 'Em progresso'}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getAllAchievements() {
        const progresso = this.data.DataManager.calcularProgresso(this.currentUser.id);
        
        return [
            {
                icon: '🎯',
                title: 'Pontualidade',
                description: 'Frequência acima de 95%',
                earned: progresso.frequencia >= 95
            },
            {
                icon: '📚',
                title: 'Estudioso',
                description: 'Média acima de 8.0',
                earned: progresso.notas >= 8.0
            },
            {
                icon: '⚡',
                title: 'Entregador',
                description: '90% das atividades entregues',
                earned: progresso.atividades >= 90
            },
            {
                icon: '🌟',
                title: 'Destaque',
                description: 'Excelência em todas as áreas',
                earned: progresso.frequencia >= 95 && progresso.notas >= 8.0 && progresso.atividades >= 90
            }
        ];
    }

    // === AÇÕES DO ESTUDANTE ===
    completeAction(actionId) {
        this.showToast('Ação iniciada! Continue assim! 🎉', 'success');
        // Implementar lógica específica da ação
    }

    startActivity(activityId) {
        this.showToast('Atividade iniciada! Boa sorte! 💪', 'success');
        // Implementar lógica para iniciar atividade
    }

    celebrateCompletion() {
        this.showToast('🎉 Parabéns! Você está em dia com tudo! Continue assim!', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} show`;
        toast.innerHTML = `
            <div class="flex items-center gap-sm">
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
}

// Funções globais
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.authManager?.logout();
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.studentDashboard = new StudentDashboard();
});
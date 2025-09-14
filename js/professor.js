// SIGEA - Professor Dashboard JavaScript
// Sistema de Gestão de Aulas - Funcionalidades do Painel do Professor

class ProfessorDashboard {
    constructor() {
        this.data = window.SIGEA_DATA;
        this.currentUser = null;
        this.currentTurma = null;
        this.currentView = 'turmas';
        this.chamadaData = {};
        this.currentDate = this.getCurrentDate();
        this.init();
    }

    init() {
        // Verificar autenticação e permissão
        if (!window.authManager?.requireRole('professor')) {
            return;
        }

        this.currentUser = window.authManager.getCurrentUser();
        this.setupEventListeners();
        this.setupNavigation();
        this.loadTurmas();
    }

    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Definir data atual no input de data
        const dateInput = document.getElementById('chamadaDate');
        if (dateInput) {
            dateInput.value = this.currentDate;
        }
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
        
        // Esconder todas as seções
        const sections = ['turmasSection', 'chamadaSection', 'notasSection'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('hidden');
            }
        });

        // Mostrar seção selecionada
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Carregar dados específicos da seção
        switch(section) {
            case 'turmas':
                this.loadTurmas();
                break;
            case 'chamada':
                if (this.currentTurma) {
                    this.loadChamada(this.currentTurma.id);
                } else {
                    this.showTurmas();
                }
                break;
            case 'notas':
                if (this.currentTurma) {
                    this.loadNotas(this.currentTurma.id);
                } else {
                    this.showTurmas();
                }
                break;
        }
    }

    loadTurmas() {
        const professorTurmas = this.data.DataManager.turmasPorProfessor(this.currentUser.id);
        const turmasGrid = document.getElementById('turmasGrid');
        
        if (!turmasGrid) return;

        turmasGrid.innerHTML = professorTurmas.map(turma => {
            const alunos = this.data.DataManager.alunosPorTurma(turma.id);
            const frequenciaHoje = this.getFrequenciaHoje(turma.id);
            const mediaNotas = this.getMediaNotasTurma(turma.id);

            return `
                <div class="turma-card" onclick="professorDashboard.selectTurma(${turma.id})">
                    <div class="turma-header">
                        <div>
                            <h3 class="turma-title">${turma.nome}</h3>
                            <p class="turma-info">${turma.horario} • ${turma.sala}</p>
                        </div>
                        <div class="badge ${turma.ativa ? 'badge-success' : 'badge-error'}">
                            ${turma.ativa ? 'Ativa' : 'Inativa'}
                        </div>
                    </div>
                    
                    <div class="turma-stats">
                        <div class="stat-item">
                            <div class="stat-number">${alunos.length}</div>
                            <div class="stat-label">Alunos</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${frequenciaHoje}%</div>
                            <div class="stat-label">Freq. Hoje</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${mediaNotas.toFixed(1)}</div>
                            <div class="stat-label">Média</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (professorTurmas.length === 0) {
            turmasGrid.innerHTML = `
                <div class="card text-center p-xl">
                    <h3 class="text-h4 mb-md">📚 Nenhuma turma encontrada</h3>
                    <p class="text-neutral-600">Você ainda não possui turmas atribuídas.</p>
                </div>
            `;
        }
    }

    selectTurma(turmaId) {
        this.currentTurma = this.data.turmas.find(t => t.id === turmaId);
        if (!this.currentTurma) return;

        // Mostrar seção de chamada por padrão
        this.loadSection('chamada');
        
        // Atualizar navegação
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[href="#chamada"]').classList.add('active');
    }

    loadChamada(turmaId) {
        this.currentTurma = this.data.turmas.find(t => t.id === turmaId);
        if (!this.currentTurma) return;

        // Atualizar título
        document.getElementById('chamadaTurmaTitle').textContent = this.currentTurma.nome;
        
        // Carregar alunos da turma
        const alunos = this.data.DataManager.alunosPorTurma(turmaId);
        const alunosList = document.getElementById('alunosList');
        
        if (!alunosList) return;

        // Inicializar dados de chamada se não existir
        if (!this.chamadaData[this.currentDate]) {
            this.chamadaData[this.currentDate] = {};
        }

        alunosList.innerHTML = alunos.map(aluno => {
            const presencaStatus = this.chamadaData[this.currentDate][aluno.id] || 'neutro';
            const iniciais = aluno.nome.split(' ').map(n => n[0]).join('').toUpperCase();
            
            return `
                <div class="aluno-item">
                    <div class="aluno-info">
                        <div class="aluno-avatar">${iniciais}</div>
                        <div class="aluno-details">
                            <h4>${aluno.nome}</h4>
                            <p>Matrícula: ${aluno.matricula}</p>
                        </div>
                    </div>
                    <div class="presenca-controls">
                        <button class="presenca-btn ${presencaStatus === 'presente' ? 'presente' : 'neutro'}" 
                                onclick="professorDashboard.marcarPresenca(${aluno.id}, 'presente')">
                            ✓ Presente
                        </button>
                        <button class="presenca-btn ${presencaStatus === 'ausente' ? 'ausente' : 'neutro'}" 
                                onclick="professorDashboard.marcarPresenca(${aluno.id}, 'ausente')">
                            ✗ Ausente
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.updateChamadaSummary();
    }

    marcarPresenca(alunoId, status) {
        if (!this.chamadaData[this.currentDate]) {
            this.chamadaData[this.currentDate] = {};
        }
        
        this.chamadaData[this.currentDate][alunoId] = status;
        
        // Atualizar interface
        this.loadChamada(this.currentTurma.id);
        this.showToast(`Presença marcada: ${status}`, 'success');
    }

    marcarTodosPresentes() {
        const alunos = this.data.DataManager.alunosPorTurma(this.currentTurma.id);
        alunos.forEach(aluno => {
            this.marcarPresenca(aluno.id, 'presente');
        });
        this.showToast('Todos os alunos marcados como presentes', 'success');
    }

    marcarTodosAusentes() {
        const alunos = this.data.DataManager.alunosPorTurma(this.currentTurma.id);
        alunos.forEach(aluno => {
            this.marcarPresenca(aluno.id, 'ausente');
        });
        this.showToast('Todos os alunos marcados como ausentes', 'success');
    }

    updateChamadaSummary() {
        const chamadaDate = this.chamadaData[this.currentDate] || {};
        const presentes = Object.values(chamadaDate).filter(status => status === 'presente').length;
        const ausentes = Object.values(chamadaDate).filter(status => status === 'ausente').length;
        const total = this.data.DataManager.alunosPorTurma(this.currentTurma.id).length;

        document.getElementById('presentesCount').textContent = presentes;
        document.getElementById('ausentesCount').textContent = ausentes;
        document.getElementById('totalAlunosCount').textContent = total;
    }

    updateChamadaDate() {
        const dateInput = document.getElementById('chamadaDate');
        if (dateInput) {
            this.currentDate = dateInput.value;
            if (this.currentTurma) {
                this.loadChamada(this.currentTurma.id);
            }
        }
    }

    salvarChamada() {
        if (!this.currentTurma || !this.chamadaData[this.currentDate]) {
            this.showToast('Nenhuma chamada para salvar', 'warning');
            return;
        }

        // Simular salvamento
        this.showToast('Chamada salva com sucesso!', 'success');
        
        // Aqui seria implementada a persistência real dos dados
        console.log('Salvando chamada:', {
            turmaId: this.currentTurma.id,
            data: this.currentDate,
            presencas: this.chamadaData[this.currentDate]
        });
    }

    loadNotas(turmaId) {
        this.currentTurma = this.data.turmas.find(t => t.id === turmaId);
        if (!this.currentTurma) return;

        // Atualizar título
        document.getElementById('notasTurmaTitle').textContent = this.currentTurma.nome;
        
        // Carregar alunos e suas notas
        const alunos = this.data.DataManager.alunosPorTurma(turmaId);
        const notasTable = document.getElementById('notasTable');
        
        if (!notasTable) return;

        notasTable.innerHTML = alunos.map(aluno => {
            const notasAluno = this.data.DataManager.notasPorAluno(aluno.id);
            const nota = notasAluno.find(n => n.turmaId === turmaId) || 
                         { nota1: 0, nota2: 0, media: 0, situacao: 'pendente' };
            
            const situacaoClass = nota.situacao === 'aprovado' ? 'badge-success' : 
                                  nota.situacao === 'reprovado' ? 'badge-error' : 
                                  'badge-warning';
            
            return `
                <tr>
                    <td>
                        <strong>${aluno.nome}</strong><br>
                        <small class="text-neutral-500">${aluno.matricula}</small>
                    </td>
                    <td>
                        <input type="number" 
                               class="form-input" 
                               style="width: 80px;" 
                               min="0" max="10" step="0.1"
                               value="${nota.nota1 || ''}" 
                               onchange="professorDashboard.updateNota(${aluno.id}, 'nota1', this.value)">
                    </td>
                    <td>
                        <input type="number" 
                               class="form-input" 
                               style="width: 80px;" 
                               min="0" max="10" step="0.1"
                               value="${nota.nota2 || ''}" 
                               onchange="professorDashboard.updateNota(${aluno.id}, 'nota2', this.value)">
                    </td>
                    <td>
                        <strong class="text-${nota.media >= 7 ? 'success' : nota.media >= 6 ? 'warning' : 'error'}">
                            ${nota.media.toFixed(1)}
                        </strong>
                    </td>
                    <td>
                        <span class="badge ${situacaoClass}">
                            ${nota.situacao === 'aprovado' ? 'Aprovado' : 
                              nota.situacao === 'reprovado' ? 'Reprovado' : 
                              'Pendente'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary" 
                                onclick="professorDashboard.calcularMedia(${aluno.id})">
                            Calcular
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateNota(alunoId, tipoNota, valor) {
        // Encontrar ou criar registro de nota
        let notaIndex = this.data.notas.findIndex(n => 
            n.alunoId === alunoId && n.turmaId === this.currentTurma.id
        );
        
        if (notaIndex === -1) {
            // Criar nova nota
            this.data.notas.push({
                id: this.data.notas.length + 1,
                alunoId: alunoId,
                turmaId: this.currentTurma.id,
                disciplina: this.currentTurma.disciplina,
                nota1: 0,
                nota2: 0,
                media: 0,
                situacao: 'pendente',
                periodo: '2024.1'
            });
            notaIndex = this.data.notas.length - 1;
        }
        
        // Atualizar nota
        this.data.notas[notaIndex][tipoNota] = parseFloat(valor) || 0;
        
        // Recalcular média automaticamente
        this.calcularMedia(alunoId);
    }

    calcularMedia(alunoId) {
        const notaIndex = this.data.notas.findIndex(n => 
            n.alunoId === alunoId && n.turmaId === this.currentTurma.id
        );
        
        if (notaIndex === -1) return;
        
        const nota = this.data.notas[notaIndex];
        nota.media = (nota.nota1 + nota.nota2) / 2;
        
        // Determinar situação
        if (nota.media >= 7) {
            nota.situacao = 'aprovado';
        } else if (nota.media >= 6) {
            nota.situacao = 'recuperacao';
        } else {
            nota.situacao = 'reprovado';
        }
        
        // Recarregar tabela de notas
        this.loadNotas(this.currentTurma.id);
        this.showToast('Média calculada!', 'success');
    }

    getFrequenciaHoje(turmaId) {
        // Simular cálculo de frequência para hoje
        const alunos = this.data.DataManager.alunosPorTurma(turmaId);
        if (alunos.length === 0) return 0;
        
        // Usar dados mockados de frequência
        return Math.round(Math.random() * 30 + 70); // 70-100%
    }

    getMediaNotasTurma(turmaId) {
        const alunos = this.data.DataManager.alunosPorTurma(turmaId);
        if (alunos.length === 0) return 0;
        
        const notas = this.data.notas.filter(n => n.turmaId === turmaId);
        if (notas.length === 0) return 0;
        
        const somaMedias = notas.reduce((acc, n) => acc + n.media, 0);
        return somaMedias / notas.length;
    }

    showTurmas() {
        this.currentTurma = null;
        this.loadSection('turmas');
        
        // Atualizar navegação
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[href="#turmas"]').classList.add('active');
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
        }, 3000);
    }
}

// Funções globais
function quickChamada() {
    const professorTurmas = window.SIGEA_DATA.DataManager.turmasPorProfessor(
        window.authManager.getCurrentUser().id
    );
    
    if (professorTurmas.length === 1) {
        // Se só tem uma turma, ir direto para chamada
        window.professorDashboard.selectTurma(professorTurmas[0].id);
    } else if (professorTurmas.length > 1) {
        // Se tem múltiplas turmas, mostrar seleção
        window.professorDashboard.showToast('Selecione uma turma para fazer a chamada', 'info');
    } else {
        window.professorDashboard.showToast('Nenhuma turma encontrada', 'warning');
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.authManager?.logout();
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.professorDashboard = new ProfessorDashboard();
});
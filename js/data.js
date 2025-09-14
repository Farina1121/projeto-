// SIGEA - Mock Data Management
// This file contains all the mock data and data management functions

// Mock Users Database
const mockUsers = [
  {
    id: 1,
    login: 'claudia',
    senha: 'admin123',
    tipo: 'admin',
    nome: 'Cláudia Costa',
    email: 'claudia.costa@escola.edu.br',
    avatar: 'assets/avatar-claudia.png'
  },
  {
    id: 2,
    login: 'marcos',
    senha: 'prof123',
    tipo: 'professor',
    nome: 'Marcos Silva',
    email: 'marcos.silva@escola.edu.br',
    avatar: 'assets/avatar-marcos.png',
    disciplinas: ['Matemática']
  },
  {
    id: 3,
    login: 'ana',
    senha: 'aluna123',
    tipo: 'aluno',
    nome: 'Ana Santos',
    email: 'ana.santos@estudante.edu.br',
    avatar: 'assets/avatar-ana.png',
    perfil: 'dedicado',
    turmaId: 1
  },
  {
    id: 4,
    login: 'lucas',
    senha: 'aluno123',
    tipo: 'aluno',
    nome: 'Lucas Oliveira',
    email: 'lucas.oliveira@estudante.edu.br',
    avatar: 'assets/avatar-lucas.png',
    perfil: 'acompanhamento',
    turmaId: 1
  }
];

// Mock Turmas (Classes)
const mockTurmas = [
  {
    id: 1,
    nome: '3º Ano A - Matemática',
    disciplina: 'Matemática',
    professorId: 2,
    professorNome: 'Marcos Silva',
    alunos: [3, 4],
    totalAlunos: 25,
    anoLetivo: 2024,
    periodo: 'Matutino',
    sala: 'A-201'
  },
  {
    id: 2,
    nome: '2º Ano B - História',
    disciplina: 'História',
    professorId: 5,
    professorNome: 'Maria Santos',
    alunos: [],
    totalAlunos: 28,
    anoLetivo: 2024,
    periodo: 'Vespertino',
    sala: 'B-105'
  },
  {
    id: 3,
    nome: '1º Ano C - Português',
    disciplina: 'Português',
    professorId: 6,
    professorNome: 'João Costa',
    alunos: [],
    totalAlunos: 22,
    anoLetivo: 2024,
    periodo: 'Matutino',
    sala: 'A-103'
  }
];

// Mock Professores
const mockProfessores = [
  {
    id: 2,
    nome: 'Marcos Silva',
    email: 'marcos.silva@escola.edu.br',
    disciplinas: ['Matemática'],
    turmas: [1],
    telefone: '(11) 99999-1234',
    status: 'ativo'
  },
  {
    id: 5,
    nome: 'Maria Santos',
    email: 'maria.santos@escola.edu.br',
    disciplinas: ['História', 'Geografia'],
    turmas: [2],
    telefone: '(11) 99999-5678',
    status: 'ativo'
  },
  {
    id: 6,
    nome: 'João Costa',
    email: 'joao.costa@escola.edu.br',
    disciplinas: ['Português', 'Literatura'],
    turmas: [3],
    telefone: '(11) 99999-9101',
    status: 'ativo'
  }
];

// Mock Alunos
const mockAlunos = [
  {
    id: 3,
    nome: 'Ana Santos',
    email: 'ana.santos@estudante.edu.br',
    turmaId: 1,
    turma: '3º Ano A - Matemática',
    perfil: 'dedicado',
    matricula: '2024001',
    nascimento: '2007-03-15',
    responsavel: 'Maria Santos',
    telefone: '(11) 88888-1234',
    status: 'ativo'
  },
  {
    id: 4,
    nome: 'Lucas Oliveira',
    email: 'lucas.oliveira@estudante.edu.br',
    turmaId: 1,
    turma: '3º Ano A - Matemática',
    perfil: 'acompanhamento',
    matricula: '2024002',
    nascimento: '2008-07-22',
    responsavel: 'Carlos Oliveira',
    telefone: '(11) 88888-5678',
    status: 'ativo'
  }
];

// Mock Presença (Attendance)
const mockPresencas = [
  {
    id: 1,
    alunoId: 3,
    turmaId: 1,
    data: '2024-01-15',
    presente: true,
    observacao: ''
  },
  {
    id: 2,
    alunoId: 4,
    turmaId: 1,
    data: '2024-01-15',
    presente: false,
    observacao: 'Falta justificada'
  },
  {
    id: 3,
    alunoId: 3,
    turmaId: 1,
    data: '2024-01-16',
    presente: true,
    observacao: ''
  },
  {
    id: 4,
    alunoId: 4,
    turmaId: 1,
    data: '2024-01-16',
    presente: true,
    observacao: ''
  }
];

// Mock Notas (Grades)
const mockNotas = [
  {
    id: 1,
    alunoId: 3,
    turmaId: 1,
    disciplina: 'Matemática',
    nota1: 8.5,
    nota2: 9.0,
    media: 8.75,
    situacao: 'aprovado',
    bimestre: 1
  },
  {
    id: 2,
    alunoId: 4,
    turmaId: 1,
    disciplina: 'Matemática',
    nota1: 6.0,
    nota2: 7.5,
    media: 6.75,
    situacao: 'recuperacao',
    bimestre: 1
  }
];

// Mock Atividades (Activities/Assignments)
const mockAtividades = [
  {
    id: 1,
    turmaId: 1,
    titulo: 'Exercícios de Álgebra',
    descricao: 'Resolver exercícios do capítulo 5',
    dataVencimento: '2024-01-20',
    tipo: 'exercicio',
    status: 'ativo',
    professorId: 2
  },
  {
    id: 2,
    turmaId: 1,
    titulo: 'Prova de Geometria',
    descricao: 'Avaliação sobre geometria plana',
    dataVencimento: '2024-01-25',
    tipo: 'prova',
    status: 'ativo',
    professorId: 2
  }
];

// Data Management Functions
class DataManager {
  
  // Initialize data in localStorage if not exists
  static init() {
    if (!localStorage.getItem('sigea_users')) {
      localStorage.setItem('sigea_users', JSON.stringify(mockUsers));
    }
    if (!localStorage.getItem('sigea_turmas')) {
      localStorage.setItem('sigea_turmas', JSON.stringify(mockTurmas));
    }
    if (!localStorage.getItem('sigea_professores')) {
      localStorage.setItem('sigea_professores', JSON.stringify(mockProfessores));
    }
    if (!localStorage.getItem('sigea_alunos')) {
      localStorage.setItem('sigea_alunos', JSON.stringify(mockAlunos));
    }
    if (!localStorage.getItem('sigea_presencas')) {
      localStorage.setItem('sigea_presencas', JSON.stringify(mockPresencas));
    }
    if (!localStorage.getItem('sigea_notas')) {
      localStorage.setItem('sigea_notas', JSON.stringify(mockNotas));
    }
    if (!localStorage.getItem('sigea_atividades')) {
      localStorage.setItem('sigea_atividades', JSON.stringify(mockAtividades));
    }
  }

  // Generic CRUD operations
  static getData(key) {
    return JSON.parse(localStorage.getItem(`sigea_${key}`) || '[]');
  }

  static setData(key, data) {
    localStorage.setItem(`sigea_${key}`, JSON.stringify(data));
  }

  static addItem(key, item) {
    const data = this.getData(key);
    const newId = Math.max(...data.map(i => i.id || 0)) + 1;
    item.id = newId;
    data.push(item);
    this.setData(key, data);
    return item;
  }

  static updateItem(key, id, updates) {
    const data = this.getData(key);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      this.setData(key, data);
      return data[index];
    }
    return null;
  }

  static deleteItem(key, id) {
    const data = this.getData(key);
    const filtered = data.filter(item => item.id !== id);
    this.setData(key, filtered);
    return filtered.length < data.length;
  }

  static findItem(key, id) {
    const data = this.getData(key);
    return data.find(item => item.id === id);
  }

  // Authentication
  static authenticateUser(login, senha) {
    const users = this.getData('users');
    return users.find(user => user.login === login && user.senha === senha);
  }

  // Specific business logic functions
  static getTurmasByProfessor(professorId) {
    const turmas = this.getData('turmas');
    return turmas.filter(turma => turma.professorId === professorId);
  }

  static getAlunosByTurma(turmaId) {
    const alunos = this.getData('alunos');
    return alunos.filter(aluno => aluno.turmaId === turmaId);
  }

  static getPresencasByAluno(alunoId) {
    const presencas = this.getData('presencas');
    return presencas.filter(presenca => presenca.alunoId === alunoId);
  }

  static getNotasByAluno(alunoId) {
    const notas = this.getData('notas');
    return notas.filter(nota => nota.alunoId === alunoId);
  }

  static getAtividadesByTurma(turmaId) {
    const atividades = this.getData('atividades');
    return atividades.filter(atividade => atividade.turmaId === turmaId);
  }

  // Dashboard statistics
  static getDashboardStats() {
    const turmas = this.getData('turmas');
    const professores = this.getData('professores');
    const alunos = this.getData('alunos');
    const presencas = this.getData('presencas');

    // Calculate attendance rate
    const totalPresencas = presencas.length;
    const presentesCount = presencas.filter(p => p.presente).length;
    const taxaPresenca = totalPresencas > 0 ? (presentesCount / totalPresencas * 100).toFixed(1) : 0;

    // Students at risk (attendance < 75%)
    const alunosEmRisco = alunos.filter(aluno => {
      const presencasAluno = presencas.filter(p => p.alunoId === aluno.id);
      const presentesAluno = presencasAluno.filter(p => p.presente).length;
      const taxaAluno = presencasAluno.length > 0 ? (presentesAluno / presencasAluno.length) : 1;
      return taxaAluno < 0.75;
    }).length;

    return {
      totalTurmas: turmas.length,
      totalProfessores: professores.filter(p => p.status === 'ativo').length,
      totalAlunos: alunos.filter(a => a.status === 'ativo').length,
      taxaPresenca: parseFloat(taxaPresenca),
      alunosEmRisco
    };
  }

  // Generate sample attendance for demonstration
  static generateSampleAttendance() {
    const alunos = this.getData('alunos');
    const presencas = [];
    const today = new Date();
    
    // Generate attendance for last 10 days
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      alunos.forEach(aluno => {
        presencas.push({
          id: presencas.length + 1,
          alunoId: aluno.id,
          turmaId: aluno.turmaId,
          data: dateStr,
          presente: Math.random() > 0.2, // 80% chance of being present
          observacao: ''
        });
      });
    }
    
    this.setData('presencas', presencas);
  }
}

// Initialize data when script loads
DataManager.init();
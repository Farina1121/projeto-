// SIGEA - Mock Data
// Sistema de Gestão de Aulas - Dados mockados para desenvolvimento

// Usuários do sistema
const usuarios = [
  {
    id: 1,
    login: "claudia",
    senha: "admin123",
    tipo: "admin",
    nome: "Cláudia Costa",
    email: "claudia.costa@escola.edu.br",
    avatar: "./assets/avatars/claudia.jpg"
  },
  {
    id: 2,
    login: "marcos",
    senha: "prof123",
    tipo: "professor",
    nome: "Marcos Silva",
    email: "marcos.silva@escola.edu.br",
    avatar: "./assets/avatars/marcos.jpg",
    disciplinas: ["Matemática", "Física"]
  },
  {
    id: 3,
    login: "ana",
    senha: "aluna123",
    tipo: "aluno",
    nome: "Ana Rodrigues",
    email: "ana.rodrigues@escola.edu.br",
    avatar: "./assets/avatars/ana.jpg",
    perfil: "dedicada",
    turmaId: 1
  },
  {
    id: 4,
    login: "lucas",
    senha: "aluno123",
    tipo: "aluno",
    nome: "Lucas Mendes",
    email: "lucas.mendes@escola.edu.br",
    avatar: "./assets/avatars/lucas.jpg",
    perfil: "acompanhamento",
    turmaId: 1
  }
];

// Turmas
const turmas = [
  {
    id: 1,
    nome: "3º Ano A - Matemática",
    serie: "3º Ano",
    disciplina: "Matemática",
    professorId: 2,
    professor: "Marcos Silva",
    totalAlunos: 25,
    alunosPresentes: 23,
    ativa: true,
    horario: "08:00 - 09:40",
    sala: "Sala 15",
    periodo: "2024.1"
  },
  {
    id: 2,
    nome: "2º Ano B - História",
    serie: "2º Ano",
    disciplina: "História",
    professorId: 5,
    professor: "Maria Santos",
    totalAlunos: 28,
    alunosPresentes: 26,
    ativa: true,
    horario: "10:00 - 11:40",
    sala: "Sala 08",
    periodo: "2024.1"
  },
  {
    id: 3,
    nome: "1º Ano C - Português",
    serie: "1º Ano",
    disciplina: "Português",
    professorId: 6,
    professor: "João Costa",
    totalAlunos: 30,
    alunosPresentes: 28,
    ativa: true,
    horario: "14:00 - 15:40",
    sala: "Sala 12",
    periodo: "2024.1"
  }
];

// Alunos detalhados
const alunos = [
  {
    id: 3,
    nome: "Ana Rodrigues",
    email: "ana.rodrigues@escola.edu.br",
    turmaId: 1,
    matricula: "2024001",
    dataNascimento: "2007-03-15",
    responsavel: "Carlos Rodrigues",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    situacao: "ativa",
    perfil: "dedicada"
  },
  {
    id: 4,
    nome: "Lucas Mendes",
    email: "lucas.mendes@escola.edu.br",
    turmaId: 1,
    matricula: "2024002",
    dataNascimento: "2008-07-22",
    responsavel: "Patricia Mendes",
    telefone: "(11) 91234-5678",
    endereco: "Av. Principal, 456",
    situacao: "ativa",
    perfil: "acompanhamento"
  },
  {
    id: 5,
    nome: "Pedro Santos",
    email: "pedro.santos@escola.edu.br",
    turmaId: 1,
    matricula: "2024003",
    dataNascimento: "2007-11-08",
    responsavel: "Roberto Santos",
    telefone: "(11) 99876-5432",
    endereco: "Rua do Sol, 789",
    situacao: "ativa",
    perfil: "regular"
  }
];

// Professores detalhados
const professores = [
  {
    id: 2,
    nome: "Marcos Silva",
    email: "marcos.silva@escola.edu.br",
    disciplinas: ["Matemática", "Física"],
    turmas: [1],
    telefone: "(11) 94567-8901",
    formacao: "Licenciatura em Matemática",
    experiencia: "8 anos",
    situacao: "ativo"
  },
  {
    id: 5,
    nome: "Maria Santos",
    email: "maria.santos@escola.edu.br",
    disciplinas: ["História"],
    turmas: [2],
    telefone: "(11) 93456-7890",
    formacao: "Licenciatura em História",
    experiencia: "12 anos",
    situacao: "ativo"
  },
  {
    id: 6,
    nome: "João Costa",
    email: "joao.costa@escola.edu.br",
    disciplinas: ["Português", "Literatura"],
    turmas: [3],
    telefone: "(11) 92345-6789",
    formacao: "Licenciatura em Letras",
    experiencia: "15 anos",
    situacao: "ativo"
  }
];

// Frequência/Chamada
const frequencia = [
  {
    id: 1,
    turmaId: 1,
    alunoId: 3,
    data: "2024-03-15",
    presente: true,
    professorId: 2
  },
  {
    id: 2,
    turmaId: 1,
    alunoId: 4,
    data: "2024-03-15",
    presente: false,
    professorId: 2,
    justificativa: "Consulta médica"
  },
  {
    id: 3,
    turmaId: 1,
    alunoId: 3,
    data: "2024-03-14",
    presente: true,
    professorId: 2
  },
  {
    id: 4,
    turmaId: 1,
    alunoId: 4,
    data: "2024-03-14",
    presente: true,
    professorId: 2
  }
];

// Notas
const notas = [
  {
    id: 1,
    alunoId: 3,
    turmaId: 1,
    disciplina: "Matemática",
    nota1: 8.5,
    nota2: 9.0,
    media: 8.75,
    situacao: "aprovado",
    periodo: "2024.1"
  },
  {
    id: 2,
    alunoId: 4,
    turmaId: 1,
    disciplina: "Matemática",
    nota1: 6.0,
    nota2: 7.5,
    media: 6.75,
    situacao: "recuperacao",
    periodo: "2024.1"
  },
  {
    id: 3,
    alunoId: 5,
    turmaId: 1,
    disciplina: "Matemática",
    nota1: 7.0,
    nota2: 8.0,
    media: 7.5,
    situacao: "aprovado",
    periodo: "2024.1"
  }
];

// Atividades e Agenda
const atividades = [
  {
    id: 1,
    titulo: "Prova de Matemática - Funções",
    disciplina: "Matemática",
    turmaId: 1,
    professorId: 2,
    dataVencimento: "2024-03-25",
    dataEntrega: null,
    tipo: "prova",
    peso: 3,
    descricao: "Avaliação sobre funções do 1º e 2º grau",
    status: "agendada"
  },
  {
    id: 2,
    titulo: "Trabalho sobre Equações",
    disciplina: "Matemática",
    turmaId: 1,
    professorId: 2,
    dataVencimento: "2024-03-20",
    dataEntrega: "2024-03-18",
    tipo: "trabalho",
    peso: 2,
    descricao: "Pesquisa sobre aplicações de equações no cotidiano",
    status: "entregue"
  },
  {
    id: 3,
    titulo: "Lista de Exercícios - Álgebra",
    disciplina: "Matemática",
    turmaId: 1,
    professorId: 2,
    dataVencimento: "2024-03-18",
    dataEntrega: null,
    tipo: "exercicio",
    peso: 1,
    descricao: "Exercícios práticos de álgebra básica",
    status: "pendente",
    prioridade: "alta"
  }
];

// KPIs e Métricas para Dashboard Admin
const metricas = {
  totalAlunos: 83,
  totalProfessores: 12,
  totalTurmas: 15,
  presencaMedia: 92.5,
  alunosRisco: 8,
  aprovacaoMedia: 87.3,
  frequenciaUltimaSemana: [
    { dia: "Seg", presente: 89, total: 95 },
    { dia: "Ter", presente: 92, total: 95 },
    { dia: "Qua", presente: 88, total: 95 },
    { dia: "Qui", presente: 90, total: 95 },
    { dia: "Sex", presente: 85, total: 95 }
  ],
  notasPorDisciplina: [
    { disciplina: "Matemática", media: 7.2 },
    { disciplina: "Português", media: 7.8 },
    { disciplina: "História", media: 8.1 },
    { disciplina: "Física", media: 6.9 },
    { disciplina: "Química", media: 7.4 }
  ]
};

// Notificações e Alertas
const notificacoes = [
  {
    id: 1,
    usuarioId: 4, // Lucas
    tipo: "prazo",
    titulo: "⚠️ Atividade vence hoje!",
    mensagem: "Lista de Exercícios - Álgebra vence às 23:59",
    urgencia: "alta",
    lida: false,
    dataHora: "2024-03-18T14:30:00"
  },
  {
    id: 2,
    usuarioId: 3, // Ana
    tipo: "nota",
    titulo: "📊 Nova nota disponível",
    mensagem: "Nota do Trabalho sobre Equações: 9.0",
    urgencia: "media",
    lida: false,
    dataHora: "2024-03-18T10:15:00"
  },
  {
    id: 3,
    usuarioId: 1, // Cláudia
    tipo: "alerta",
    titulo: "🚨 Aluno em risco",
    mensagem: "Lucas Mendes: 3 faltas consecutivas",
    urgencia: "alta",
    lida: false,
    dataHora: "2024-03-18T08:00:00"
  }
];

// Funções auxiliares para manipulação de dados
const DataManager = {
  // Autenticação
  autenticar(login, senha) {
    return usuarios.find(u => u.login === login && u.senha === senha);
  },

  // Buscar dados por ID
  buscarUsuario(id) {
    return usuarios.find(u => u.id === id);
  },

  buscarTurma(id) {
    return turmas.find(t => t.id === id);
  },

  buscarAluno(id) {
    return alunos.find(a => a.id === id);
  },

  // Buscar dados por usuário
  turmasPorProfessor(professorId) {
    return turmas.filter(t => t.professorId === professorId);
  },

  alunosPorTurma(turmaId) {
    return alunos.filter(a => a.turmaId === turmaId);
  },

  notasPorAluno(alunoId) {
    return notas.filter(n => n.alunoId === alunoId);
  },

  frequenciaPorAluno(alunoId) {
    return frequencia.filter(f => f.alunoId === alunoId);
  },

  atividadesPorAluno(alunoId) {
    const aluno = this.buscarAluno(alunoId);
    if (!aluno) return [];
    return atividades.filter(a => a.turmaId === aluno.turmaId);
  },

  notificacoesPorUsuario(usuarioId) {
    return notificacoes.filter(n => n.usuarioId === usuarioId);
  },

  // Cálculos
  calcularFrequencia(alunoId) {
    const freq = this.frequenciaPorAluno(alunoId);
    if (freq.length === 0) return 0;
    const presencas = freq.filter(f => f.presente).length;
    return Math.round((presencas / freq.length) * 100);
  },

  calcularProgresso(alunoId) {
    const notasAluno = this.notasPorAluno(alunoId);
    const atividadesAluno = this.atividadesPorAluno(alunoId);
    
    const atividadesConcluidas = atividadesAluno.filter(a => 
      a.status === 'entregue' || a.dataEntrega
    ).length;
    
    const progressoAtividades = atividadesAluno.length > 0 ? 
      (atividadesConcluidas / atividadesAluno.length) * 100 : 0;
    
    const mediaNotas = notasAluno.length > 0 ? 
      notasAluno.reduce((acc, n) => acc + n.media, 0) / notasAluno.length : 0;
    
    return {
      atividades: Math.round(progressoAtividades),
      notas: mediaNotas,
      frequencia: this.calcularFrequencia(alunoId)
    };
  }
};

// Exportar dados para uso global
if (typeof window !== 'undefined') {
  window.SIGEA_DATA = {
    usuarios,
    turmas,
    alunos,
    professores,
    frequencia,
    notas,
    atividades,
    metricas,
    notificacoes,
    DataManager
  };
}
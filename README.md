# SIGEA - Sistema de Gestão de Aulas

Um sistema completo de gestão escolar desenvolvido com HTML5, CSS3 e JavaScript Vanilla.

## 🎯 Sobre o Projeto

O SIGEA (Sistema de Gestão de Aulas) é uma aplicação web moderna e responsiva que oferece funcionalidades específicas para diferentes perfis de usuários educacionais:

### 👥 Perfis de Usuário

**🔹 Administrador (Cláudia)**
- Dashboard com KPIs e métricas gerais
- Gerenciamento completo de turmas, professores e alunos
- Alertas automáticos para alunos em risco
- Sistema de relatórios e análises

**🔹 Professor (Marcos)**
- Interface otimizada para eficiência
- Sistema de chamada rápida (< 2 minutos)
- Gerenciamento de notas com cálculo automático
- Visualização de turmas atribuídas

**🔹 Aluna Dedicada (Ana)**
- Dashboard detalhado com progresso por disciplina
- Histórico completo de frequência
- Consulta de notas e médias
- Agenda unificada de atividades

**🔹 Aluno com Acompanhamento (Lucas)**
- Interface simplificada e motivacional
- Priorização clara de próximas atividades
- Sistema de conquistas e feedback positivo
- Notificações visuais de prazos

## 🚀 Como Usar

### 1. Iniciando o Sistema

```bash
# Clone o repositório
git clone https://github.com/Farina1121/projeto-.git
cd projeto-

# Inicie um servidor HTTP local
python3 -m http.server 8000
# ou
npx serve .

# Acesse http://localhost:8000
```

### 2. Credenciais de Demonstração

| Perfil | Usuário | Senha | Descrição |
|--------|---------|-------|-----------|
| **Admin** | `claudia` | `admin123` | Coordenadora Pedagógica |
| **Professor** | `marcos` | `prof123` | Professor de Matemática |
| **Aluna** | `ana` | `aluna123` | Estudante Dedicada |
| **Aluno** | `lucas` | `aluno123` | Aluno que Precisa de Acompanhamento |

### 3. Navegação

1. **Acesse** `http://localhost:8000`
2. **Clique** em "Usar" ao lado da credencial desejada
3. **Explore** as funcionalidades específicas do perfil
4. **Use** a navegação lateral para acessar diferentes seções

## 🎨 Design System

### Paleta de Cores
- **Primária**: #1D4ED8 (Azul) - Navegação e CTAs
- **Acento**: #F97316 (Laranja) - Ações secundárias
- **Sucesso**: #10B981 (Verde) - Confirmações
- **Aviso**: #F59E0B (Âmbar) - Alertas de atenção
- **Erro**: #DC2626 (Vermelho) - Erros e faltas

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Escala**: H1(30px), H2(24px), H3(20px), Body(16px)

## 📁 Estrutura do Projeto

```
projeto-/
├── index.html              # Página inicial com redirecionamento
├── DESIGN.md              # Documentação completa de design
├── README.md              # Documentação do projeto
├── css/
│   ├── design-system.css  # Variáveis e utilitários
│   └── components.css     # Componentes reutilizáveis
├── js/
│   ├── data.js           # Dados mockados do sistema
│   ├── auth.js           # Sistema de autenticação
│   ├── admin.js          # Funcionalidades do admin
│   ├── professor.js      # Funcionalidades do professor
│   └── aluno.js          # Funcionalidades dos alunos
├── pages/
│   ├── login.html        # Página de login
│   ├── admin.html        # Painel administrativo
│   ├── professor.html    # Painel do professor
│   └── aluno.html        # Painel dos alunos
└── assets/               # Recursos (imagens, ícones)
```

## 🔧 Funcionalidades Principais

### ✅ Sistema de Autenticação
- Login baseado em roles
- Sessão persistente (localStorage)
- Redirecionamento automático por perfil
- Proteção de rotas

### ✅ Dashboard Administrativo
- KPIs em tempo real (83 alunos, 12 professores, 92.5% frequência)
- Alertas para alunos em risco
- CRUD completo para entidades
- Sistema de relatórios

### ✅ Interface do Professor
- Seleção rápida de turmas
- Sistema de chamada eficiente
- Gerenciamento de notas intuitivo
- Cálculo automático de médias

### ✅ Interfaces dos Alunos
- **Dedicada**: Dados detalhados, progresso visual, histórico completo
- **Simplificada**: Próximas ações, motivação, conquistas

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Touch Friendly**: Botões e áreas de toque adequadas
- **Adaptativo**: Layout flexível para todos os tamanhos

## ♿ Acessibilidade

- **WCAG 2.1 AA**: Conformidade com padrões de acessibilidade
- **Contraste**: Mínimo 4.5:1 para texto normal
- **Navegação**: Suporte completo a teclado
- **Semântica**: HTML semântico e ARIA labels
- **Focus**: Estados de foco claramente visíveis

## 🔍 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design system moderno, Grid/Flexbox, Custom Properties
- **JavaScript ES6+**: Funcionalidades interativas, Classes, Modules
- **LocalStorage**: Persistência de sessão
- **Mock Data**: Sistema de dados simulados realistas

## 📊 Dados de Demonstração

O sistema inclui dados mockados realistas:
- **Usuários**: 4 perfis com dados completos
- **Turmas**: 3 turmas ativas com estatísticas
- **Notas**: Sistema completo de avaliações
- **Frequência**: Registros de presença/ausência
- **Atividades**: Agenda com prazos e status

## 🎯 Diferenciais

### vs Google Classroom
✅ Interface mais atrativa e motivacional  
✅ Elementos de gamificação para engajamento  
✅ Dashboards personalizados por perfil  

### vs Moodle
✅ Navegação intuitiva e moderna  
✅ Design contemporâneo e limpo  
✅ Menor curva de aprendizado  

### vs Canvas
✅ Foco específico em ensino básico/médio  
✅ Interfaces motivacionais para alunos  
✅ Alertas pedagógicos inteligentes  

## 🚀 Próximos Passos

- [ ] Integração com backend real
- [ ] Sistema de notificações em tempo real
- [ ] Aplicativo mobile (PWA)
- [ ] Relatórios em PDF
- [ ] Sistema de backup automático
- [ ] API REST para integrações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ♥ para educação de qualidade**
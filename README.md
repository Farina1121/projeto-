# SIGEA - Sistema de Gestão de Aulas

<p align="center">
<img alt="SIGEA" src="https://img.shields.io/badge/SIGEA-Sistema%20de%20Gestão%20de%20Aulas-1D4ED8?style=for-the-badge">
<img alt="Status" src="https://img.shields.io/badge/Status-Concluído-10B981?style=for-the-badge">
<img alt="License" src="https://img.shields.io/badge/License-MIT-F97316?style=for-the-badge">
</p>

## 📋 Sobre o Projeto

O SIGEA é um sistema completo de gestão educacional desenvolvido com foco na **experiência do usuário** e **personalização por perfil**. Cada tipo de usuário possui uma interface otimizada para suas necessidades específicas, proporcionando eficiência e engajamento.

### ✨ Diferenciais

- **Interfaces Personalizadas**: Cada perfil tem uma experiência única
- **Design Motivacional**: Elementos visuais que engajam e motivam
- **Acessibilidade**: Contrastes adequados e navegação por teclado
- **Responsividade**: Mobile-first com adaptação perfeita
- **Feedback Inteligente**: Micro-interações e notificações contextuais

## 👥 Personas e Interfaces

### 🔧 Cláudia (Coordenadora Pedagógica)
- Dashboard com KPIs e métricas gerais
- CRUD completo para turmas, professores e alunos
- Relatórios exportáveis e alertas automáticos
- Visão macro do sistema educacional

### 👨‍🏫 Marcos (Professor)
- Chamada rápida (máximo 2 minutos)
- Gestão simplificada de notas
- Reutilização de atividades
- Interface mobile otimizada

### 📚 Ana (Aluna Dedicada)
- Histórico detalhado de presenças
- Acompanhamento granular de notas
- Agenda unificada com metas
- Análise completa de performance

### 🎯 Lucas (Aluno em Acompanhamento)
- Interface simplificada e intuitiva
- Priorização clara de atividades
- Feedback motivacional constante
- Notificações visuais importantes

## 🚀 Tecnologias Utilizadas

- **HTML5**: Semântica moderna e acessível
- **CSS3**: Custom Properties, Grid, Flexbox
- **JavaScript ES6+**: Vanilla JS com padrões modernos
- **Design System**: Tokens consistentes e componentes reutilizáveis
- **localStorage**: Gerenciamento de dados mock realistas

## 🎨 Sistema de Design

### Paleta de Cores
```css
--color-primary: #1D4ED8;        /* Azul principal */
--color-primary-hover: #153EAE;   /* Azul hover */
--color-primary-light: #E0ECFF;   /* Azul claro */
--color-accent: #F97316;          /* Laranja acento */
--color-success: #10B981;         /* Verde sucesso */
--color-warning: #F59E0B;         /* Âmbar aviso */
--color-error: #DC2626;           /* Vermelho erro */
```

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Escala**: Responsiva e acessível
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold)

## 📂 Estrutura do Projeto

```
/
├── index.html              # Página inicial com redirecionamento
├── DESIGN.md              # Documentação completa do design
├── README.md              # Este arquivo
├── /css
│   ├── styles.css         # Estilos base e design tokens
│   ├── components.css     # Componentes reutilizáveis
│   └── responsive.css     # Media queries e responsividade
├── /js
│   ├── app.js            # Lógica principal da aplicação
│   ├── auth.js           # Sistema de autenticação
│   ├── data.js           # Gerenciamento de dados mock
│   └── components.js     # Componentes JavaScript
├── /assets
│   └── *.png             # Avatares e recursos visuais
└── /pages
    ├── login.html                    # Tela de login
    ├── admin.html                    # Dashboard administrativo
    ├── professor.html                # Painel do professor
    ├── aluno-dedicado.html          # Interface da aluna Ana
    └── aluno-acompanhamento.html    # Interface do aluno Lucas
```

## 🔐 Credenciais de Teste

| Perfil | Usuário | Senha | Persona |
|--------|---------|-------|---------|
| **Admin** | `claudia` | `admin123` | Cláudia (Coordenadora) |
| **Professor** | `marcos` | `prof123` | Marcos (Professor) |
| **Aluna Dedicada** | `ana` | `aluna123` | Ana (Estudante) |
| **Aluno Acompanhamento** | `lucas` | `aluno123` | Lucas (Precisa apoio) |

## 🌐 Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Farina1121/projeto-.git
   cd projeto-
   ```

2. **Abra o projeto**
   - Abra o arquivo `index.html` em um navegador
   - **Ou** use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acesse o sistema**
   - Abra `http://localhost:8000` no navegador
   - Use as credenciais de teste acima
   - Explore as diferentes interfaces por perfil

## 🎯 Casos de Uso Demonstrados

### Coordenadora (Cláudia)
- "Preciso ver rapidamente quais alunos estão em risco"
- Acessa dashboard → visualiza alertas → toma ações preventivas

### Professor (Marcos)  
- "Quero lançar a chamada de hoje em 2 minutos"
- Login → chamada rápida → seleciona turma → marca presenças

### Aluna Dedicada (Ana)
- "Onde posso ver meu progresso detalhado?"
- Dashboard → métricas pessoais → histórico → metas

### Aluno Acompanhamento (Lucas)
- "O que preciso fazer hoje?"
- Interface simplificada → prioridades claras → ações direcionadas

## 📱 Responsividade

- **Mobile**: < 768px - Interface colapsível, touch-friendly
- **Tablet**: 768px - 1024px - Layout híbrido
- **Desktop**: > 1024px - Experiência completa

## ♿ Acessibilidade

- Contrastes WCAG AA compliant
- Navegação por teclado completa
- Textos alternativos em imagens
- Semântica HTML5 adequada
- Focus indicators claros

## 📊 Funcionalidades Implementadas

- [x] Sistema de autenticação com redirecionamento por perfil
- [x] Dashboard administrativo com KPIs
- [x] Painel do professor com chamada rápida
- [x] Interface dedicada para aluna organizada
- [x] Interface simplificada para aluno em acompanhamento
- [x] Sistema de notificações motivacionais
- [x] Dados mock realistas com localStorage
- [x] Design system completo e consistente
- [x] Responsividade mobile-first
- [x] Acessibilidade e boas práticas

## 🔄 Próximas Melhorias

- [ ] Implementação de backend real
- [ ] Sistema de relatórios avançados
- [ ] Integração com calendário
- [ ] Notificações push
- [ ] Sistema de mensagens
- [ ] Gamificação para alunos
- [ ] PWA (Progressive Web App)
- [ ] Tema escuro

## 📄 Documentação

- **[DESIGN.md](DESIGN.md)**: Análise de concorrentes, personas e sistema de design completo
- **Comentários no código**: Explicações detalhadas da implementação
- **Estrutura modular**: Código organizado e reutilizável

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
Desenvolvido com ❤️ para revolucionar a gestão educacional<br>
<strong>SIGEA</strong> - Onde cada usuário tem sua experiência única
</p>
# SIGEA - Sistema de Gestão de Aulas
## Design Document

### 🎯 Visão Geral
O SIGEA é um sistema de gestão escolar focado em simplicidade, eficiência e personalização por perfil de usuário. Nossa abordagem prioriza interfaces intuitivas e feedback motivacional para diferentes personas educacionais.

---

## 📚 Análise de Concorrentes

### 1. Google Classroom
**Pontos Fortes:**
- Interface limpa e minimalista
- Integração perfeita com Google Workspace
- Facilidade de compartilhamento de materiais
- Notificações em tempo real

**Pontos Fracos:**
- Limitado para gestão administrativa completa
- Falta de personalização visual
- Relatórios básicos e pouco detalhados
- Interface pouco motivacional para alunos

**Lições Aprendidas:**
- Simplicidade é fundamental
- Integrações são valiosas
- Notificações devem ser estratégicas

### 2. Moodle
**Pontos Fortes:**
- Extremamente customizável
- Rico em funcionalidades
- Suporte a múltiplos tipos de atividades
- Relatórios detalhados

**Pontos Fracos:**
- Interface complexa e confusa
- Curva de aprendizado elevada
- Design antiquado
- Navegação não intuitiva

**Lições Aprendidas:**
- Funcionalidade não deve comprometer usabilidade
- Design moderno é essencial
- Navegação clara é crítica

### 3. Canvas
**Pontos Fortes:**
- Interface moderna e responsiva
- Excelente experiência mobile
- Sistema de notificações eficiente
- Analytics avançados

**Pontos Fracos:**
- Custo elevado
- Complexidade desnecessária para escolas básicas
- Foco excessivo em ensino superior

**Lições Aprendidas:**
- Responsividade é obrigatória
- Analytics agregam valor
- Simplicidade adequada ao contexto

---

## 👥 Personas

### 1. Cláudia Costa (42 anos) - Coordenadora Pedagógica
**Perfil:** Administradora eficiente que precisa de visão macro e controle total
- **Objetivos:** Monitorar desempenho geral, gerenciar recursos, tomar decisões baseadas em dados
- **Frustações:** Relatórios complexos, interfaces confusas, falta de alertas automáticos
- **Comportamento:** Acessa o sistema múltiplas vezes ao dia, prioriza eficiência
- **Necessidades:**
  - Dashboard com KPIs claros
  - CRUD completo para turmas, professores e alunos
  - Relatórios exportáveis
  - Alertas de alunos em risco

### 2. Marcos Silva (35 anos) - Professor de Matemática
**Perfil:** Educador dedicado que busca praticidade no dia a dia
- **Objetivos:** Registrar presença rapidamente, acompanhar notas, reutilizar atividades
- **Frustrações:** Sistemas lentos, interfaces complexas, perda de tempo com burocracia
- **Comportamento:** Uso intensivo durante períodos de aula, acesso mobile frequente
- **Necessidades:**
  - Chamada rápida (máximo 2 minutos)
  - Gestão simples de notas
  - Visualização clara dos alunos
  - Interface mobile otimizada

### 3. Ana Santos (17 anos) - Estudante Dedicada
**Perfil:** Aluna organizada que quer controle total sobre seu desempenho
- **Objetivos:** Acompanhar notas detalhadamente, organizar agenda, monitorar progresso
- **Frustrações:** Falta de transparência, informações dispersas, interface infantilizada
- **Comportamento:** Acesso diário, comparação constante de desempenho
- **Necessidades:**
  - Histórico detalhado de presenças
  - Acompanhamento de notas em tempo real
  - Agenda unificada
  - Métricas de progresso

### 4. Lucas Oliveira (16 anos) - Aluno que Precisa de Acompanhamento
**Perfil:** Estudante com dificuldades de organização que precisa de motivação
- **Objetivos:** Entender o que precisa fazer hoje, receber feedback positivo
- **Frustrações:** Interfaces complexas, muita informação simultânea, falta de direção
- **Comportamento:** Acesso esporádico, precisa de lembretes e incentivos
- **Necessidades:**
  - Interface simplificada
  - Priorização clara de tarefas
  - Feedback motivacional
  - Notificações visuais importantes

---

## 🎨 Sistema de Design

### Paleta de Cores

#### Cores Primárias
- **Azul Principal:** `#1D4ED8` - Navegação, CTAs principais, elementos de destaque
- **Azul Hover:** `#153EAE` - Estados de interação
- **Azul Claro:** `#E0ECFF` - Tags, destaques suaves, backgrounds secundários

#### Cores de Acento
- **Laranja:** `#F97316` - Ações secundárias, alertas importantes
- **Verde Sucesso:** `#10B981` - Confirmações, sucessos, progresso positivo
- **Âmbar Aviso:** `#F59E0B` - Avisos, atenção necessária
- **Vermelho Erro:** `#DC2626` - Erros, ações destrutivas

#### Tons Neutros
- **Cinza Escuro:** `#111827` - Textos principais, ícones
- **Cinza Médio:** `#4B5563` - Textos secundários
- **Cinza Claro:** `#D1D5DB` - Bordas, divisores
- **Cinza Muito Claro:** `#F3F4F6` - Backgrounds sutis
- **Branco Puro:** `#F9FAFB` - Backgrounds principais
- **Branco:** `#FFFFFF` - Cards, modais

### Tipografia

#### Fonte Principal: Inter
**Justificativa:** Excelente legibilidade, ampla disponibilidade, consistência entre diferentes pesos

#### Escala Tipográfica
- **H1:** `1.875rem (30px)` - Títulos principais de página
- **H2:** `1.5rem (24px)` - Títulos de seção
- **H3:** `1.25rem (20px)` - Subtítulos, títulos de card
- **Body:** `1rem (16px)` - Texto padrão
- **Small:** `0.875rem (14px)` - Textos auxiliares, legendas

#### Pesos
- **Títulos:** `600 (Semi-bold)` - Hierarquia clara
- **Corpo:** `400 (Regular)` - Leitura confortável
- **Destaque:** `500 (Medium)` - Ênfase moderada

### Componentes Base

#### Cards
- **Background:** Branco com sombra sutil
- **Border-radius:** `8px`
- **Padding:** `24px`
- **Shadow:** `0 1px 3px rgba(0, 0, 0, 0.1)`

#### Botões
- **Primário:** Background azul principal, texto branco
- **Secundário:** Background transparente, borda azul, texto azul
- **Estados:** Hover com escurecimento de 10%
- **Border-radius:** `6px`
- **Padding:** `12px 24px`

#### Navegação
- **Sidebar:** Largura fixa 280px
- **Items:** Padding 12px, border-radius 6px
- **Active state:** Background azul claro, texto azul escuro

#### Ícones
- **Estilo:** Heroicons (outline para estados normais, solid para ativos)
- **Tamanho:** 20px padrão, 24px para ações principais
- **Cor:** Herda do contexto, cinza médio por padrão

---

## 🎯 Design Rationale

### Por que este Design?

#### 1. Simplicidade Focada
Diferente do Moodle, priorizamos interfaces limpas que não sobrecarregam o usuário. Cada tela tem um propósito claro e elementos visuais que guiam naturalmente a ação desejada.

#### 2. Personalização por Persona
Cada perfil tem interfaces otimizadas para suas necessidades específicas:
- **Admin:** Densidade de informação alta, foco em métricas
- **Professor:** Velocidade de execução, interface prática
- **Ana:** Detalhamento e controle granular
- **Lucas:** Simplicidade e motivação visual

#### 3. Feedback Motivacional
Implementamos micro-interações e feedback positivo para manter engajamento, especialmente importante para o perfil do Lucas.

#### 4. Acessibilidade Primeira
Contrastes adequados, navegação por teclado, textos alternativos e semântica HTML5 são fundamentais desde o início.

#### 5. Responsividade Mobile-First
Com professores usando dispositivos móveis durante aulas, a experiência mobile é crítica para o sucesso do sistema.

---

## 🚀 Tokens de Design

### Espaçamento
```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
```

### Sombras
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Transições
```css
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-full: 9999px;
```

---

## 📱 Responsividade

### Breakpoints
- **Mobile:** `< 768px`
- **Tablet:** `768px - 1024px`
- **Desktop:** `> 1024px`

### Adaptações por Device
- **Mobile:** Navegação colapsível, cards full-width, tipografia ajustada
- **Tablet:** Layout híbrido, sidebar colapsível
- **Desktop:** Layout completo com sidebar fixa

---

## ✅ Checklist de Implementação

### Design System
- [ ] Implementar CSS custom properties para tokens
- [ ] Criar componentes base reutilizáveis
- [ ] Definir sistema de grid responsivo
- [ ] Implementar sistema de ícones consistente

### Acessibilidade
- [ ] Contrastes mínimos WCAG AA
- [ ] Navegação por teclado
- [ ] Screen reader friendly
- [ ] Textos alternativos em imagens

### Performance
- [ ] Otimização de imagens
- [ ] CSS minificado
- [ ] Lazy loading quando aplicável
- [ ] Fonts com display: swap

Este design system garante consistência visual, usabilidade otimizada por persona e experiência moderna que supera os concorrentes analisados.
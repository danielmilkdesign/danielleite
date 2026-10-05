<!-- AGENTS.md: Universal AI Pair-Programming & System Contract -->
# AGENTS.md — Protocolo de Operação & Inteligência do Projeto

Este arquivo define o contrato de operação para assistentes e agentes autônomos (Google Antigravity, Gemini CLI, Claude Code, Cursor) atuando no repositório do **Portfolio de Daniel Leite — Senior Product Designer & Design Engineer**.

---

## 1. Identidade e Escopo do Projeto

- **Proprietário:** Daniel Leite (Senior Product Designer & Design Engineer).
- **Missão:** Portfolio de altíssimo nível visual (editorial, high-craft, dark aesthetic) e excelência técnica (120fps, zero layout shifts, acessibilidade e micro-interações fluidas).
- **Stack Tecnológico:**
  - **Estrutura:** HTML5 semântico, componentização modular em páginas estáticas.
  - **Estilos:** Vanilla CSS3 moderno com Custom Properties (design tokens), Grid responsivo (`minmax(0, 1fr)`), Flexbox, transições aceleradas por GPU (`transform`, `opacity`). Sem Tailwind ou frameworks CSS pesados.
  - **Interatividade:** Vanilla JavaScript (ES modules, IntersectionObserver, Drag-Scroll com física de inércia, Lightbox modal, 3D tilt).
  - **Mídia:** Imagens e mockups em formato WebP otimizado, vídeo de background responsivo.
  - **Hospedagem & Deploy:** GitHub Pages direto na branch `main` (`https://github.com/danielmilkdesign/danielleite.git`).

---

## 2. AG Kit — Integração com o Diretório `.agents/`

O repositório possui o toolkit completo de inteligência do **AG Kit** configurado em [`.agents/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents). Qualquer agente operando aqui **deve** seguir a hierarquia de regras:

- **P0 (Regras Globais):** [`.agents/rules/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/rules/)
  - `core-protocol.md`: Protocolo de carregamento e anúncios obrigatórios.
  - `request-routing.md`: Classificação e roteamento automático de requisições.
  - `universal-rules.md`: Clean code, idioma e testes.
  - `code-rules.md`: Socratic gate, plan mode e checklist de verificação.
  - `design-rules.md`: Gate de tokens e restrições visuais.
- **P1 (Agentes Especialistas):** [`.agents/agent/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/agent/)
- **P2 (Skills Especializadas):** [`.agents/skills/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/skills/)
- **Memória Persistente:** [`.agents/memory/MEMORY.md`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/memory/MEMORY.md) (consultar no início de cada sessão).

---

## 3. Protocolo de Anúncio e Roteamento de Agentes (MANDATÓRIO)

Antes de executar qualquer código, design ou diagnóstico, o assistente **deve** identificar o domínio, aplicar o agente especialista adequado e anunciar explicitamente ao usuário:

```markdown
🤖 **Applying knowledge of `@[agent-name]`...**
📚 **Using skill: `@[skill-name]`...**
```

### Matriz de Especialistas para este Projeto:

| Domínio / Tarefa | Agente Recomendado | Skills Principais |
| :--- | :--- | :--- |
| **UI / Layout / CSS / Animações** | `frontend-specialist` | `frontend-design`, `design-spec`, `clean-code` |
| **Investigação de Bugs / Quebras** | `debugger` | `systematic-debugging`, `clean-code` |
| **Performance / 120fps / Web Vitals** | `performance-optimizer`| `performance-profiling`, `clean-code` |
| **Deploy / Git / Produção** | `devops-engineer` | `deployment-procedures`, `server-management` |
| **Coordenação de Múltiplos Passos** | `orchestrator` | `coordinator-mode`, `parallel-agents`, `verify-changes` |
| **Planejamento / Novos Cases** | `project-planner` | `plan-writing`, `brainstorming`, `architecture` |

---

## 4. Diretrizes de Design & Anti-Slop (High-Craft)

1. **Estética Editorial & Dark Mode:**
   - Paleta escura rica (`#0a0a0c`, `#121216`, bordas sutis `rgba(255, 255, 255, 0.08)`).
   - Tipografia de impacto (Syne nos títulos display, Inter no corpo de texto, JetBrains Mono em metadados/código).
   - Proibição de "Visual IA Genérico": evitar gradientes púrpuras genéricos, layouts clonados de templates e elementos sem propósito narrativo.
2. **Responsividade Estrita:**
   - Todo container deve respeitar os limites de viewport (`overflow: hidden` ou rolagem deliberada com scrollbar oculta/estilizada).
   - Testar sempre em Desktop (1536px+) e Mobile (375px a 420px).
   - Grids com flex wrap ou `grid-template-columns: repeat(auto-fit, minmax(..., 1fr))` usando `minmax(0, 1fr)` para evitar overflow por min-width intrínseco.
3. **Fluidez e Micro-interações:**
   - Animações a 60-120fps utilizando apenas `transform` e `opacity`.
   - Event listeners de scroll e touch sempre com `{ passive: true }`.
   - Elementos arrastáveis devem conter física de arraste (drag scroll) e cursor interativo (`grab` / `grabbing`).

---

## 5. Idioma e Comunicação

- **Comunicação com o Usuário:** Português do Brasil (PT-BR), direto, técnico e profissional.
- **Código & Commits:** Nomes de classes, variáveis, atributos e funções em inglês ou termos de domínio claros. Commits semânticos no padrão conventional commits (ex: `feat:`, `fix:`, `perf:`).

---

## 6. Comandos e Workflows Úteis

- `/plan` — Planejamento estruturado de novas funcionalidades ou seções.
- `/verify` — Execução e prova de funcionamento através de testes práticos.
- `/debug` — Investigação sistemática de 4 fases para bugs ou layout quebrado.
- `/deploy` — Procedimentos de commit seguro e publicação no GitHub Pages.
- `/remember` — Persistir decisões arquiteturais no arquivo de memória de longo prazo.

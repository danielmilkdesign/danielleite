<!-- AGENTS.md: Universal AI Pair-Programming, Squads & System Contract -->
# AGENTS.md — Protocolo de Operação: Squads & Agentes Integrados

Este arquivo define o contrato de operação definitivo para assistentes e agentes autônomos (Google Antigravity, Gemini CLI) atuando no ecossistema do **Portfolio de Daniel Leite (Senior Product Designer & Design Engineer)** e da **Milk Tech Studio**.

---

## 1. Identidade e Escopo do Ecossistema

- **Proprietário:** Daniel Leite (Senior Product Designer, Design Engineer & Fundador da Milk Tech Studio).
- **Missão:** Portfolio de altíssimo nível visual (editorial, high-craft, dark aesthetic) e excelência técnica (120fps, zero layout shifts, acessibilidade e micro-interações fluidas), servindo como o canal principal de conversão, autoridade técnica e demonstração dos produtos e serviços do estúdio.
- **Stack Tecnológico:**
  - **Estrutura:** HTML5 semântico, componentização modular em páginas estáticas.
  - **Estilos:** Vanilla CSS3 moderno com Custom Properties (design tokens), Grid responsivo (`minmax(0, 1fr)`), Flexbox, transições aceleradas por GPU (`transform`, `opacity`). Sem Tailwind ou frameworks CSS pesados.
  - **Interatividade:** Vanilla JavaScript (ES modules, IntersectionObserver, Drag-Scroll com física de inércia, Lightbox modal, 3D tilt).
  - **Mídia:** Imagens e mockups em formato WebP otimizado, vídeo de background responsivo.
  - **Hospedagem & Deploy:** GitHub Pages direto na branch `main` (`https://github.com/danielmilkdesign/danielleite.git`).

---

## 2. Squads da Milk Tech Studio & Atuação em Conjunto

O projeto adota o modelo híbrido de **Squads de Negócio + Agentes Técnicos**. Enquanto os Agentes operam diretamente no código, as Squads atuam como os núcleos multidisciplinares de produto, copy, crescimento e vendas.

### 🏢 As 5 Squads Ativas (`~/.squads-registry.json` / `C:\Users\danie\squads`):

1. **`milk-content-ops` (Operações de Conteúdo & Autoridade):**
   - **Foco:** Transforma os cases do portfolio (Reino das Feras, RecruiterSys, Horuz, PetPlant, VentiHome) em autoridade técnica no LinkedIn, carrosséis educativos para Instagram e artigos de blog/SEO.
   - **Entregáveis:** Posts B2B, carrosséis de design system, narrativas editoriais de UX.

2. **`milk-sales-pipeline` (Pipeline de Vendas & Conversão):**
   - **Foco:** Conexão dos pontos de contato do site (`proposal.html`, wizard de contato) com a qualificação de leads, propostas comerciais de design/engenharia e follow-up B2B.
   - **Entregáveis:** Fluxos de qualificação, templates de propostas de valor, copies de CTA e fechamento.

3. **`milk-product-launch` (Lançamento de Produtos & Cases):**
   - **Foco:** Estruturação de lançamentos de novos cases ou produtos próprios do estúdio, aplicando o framework Launch Formula em landing pages de alta conversão.
   - **Entregáveis:** Estrutura de funil, narrativas de pré/lançamento/pós-lançamento e design de conversão.

4. **`milk-growth-analytics` (Analytics & Otimização de Métricas):**
   - **Foco:** Monitoramento e melhoria contínua das métricas do portfolio: Core Web Vitals, taxas de conversão de leads nos CTAs, tempo de permanência nos cases e mapas de calor/leitura.
   - **Entregáveis:** Dashboards, planos de testes A/B, relatórios de performance e recomendações de CRO.

5. **`milk-automation-dev` (Automação & Integrações):**
   - **Foco:** Automação de pipelines, integrações de formulários com CRM/webhooks, scripts de otimização de assets e rotinas de deploy.
   - **Entregáveis:** Webhooks, pipelines de CI/CD, scripts de manutenção automatizada.

---

## 3. Matriz de Atuação Conjunta (Squads + Agentes)

Sempre que uma demanda for solicitada, identifique a intersecção entre o objetivo estratégico (Squad) e a implementação técnica (Agente):

| Demanda / Tipo de Tarefa | Squad Líder (Negócio/Copy) | Agente Especialista (Código/UI) | Skills Chave |
| :--- | :--- | :--- | :--- |
| **Novo Case Study / Redação de Case** | `milk-content-ops` | `@frontend-specialist` | `squads`, `frontend-design`, `design-spec` |
| **Formulário de Contato / Proposta Comercial** | `milk-sales-pipeline` | `@backend-specialist` / `@frontend-specialist` | `squads`, `api-patterns`, `clean-code` |
| **Lançamento de Produto / Novo Destaque** | `milk-product-launch` | `@project-planner` / `@orchestrator` | `squads`, `plan-writing`, `architecture` |
| **Auditoria de Conversão & Web Vitals** | `milk-growth-analytics` | `@performance-optimizer` | `squads`, `performance-profiling`, `seo-fundamentals` |
| **Automações de Formulários / CI/CD** | `milk-automation-dev` | `@devops-engineer` | `squads`, `deployment-procedures`, `server-management` |
| **Bugs / Ajustes Responsivos / CSS Puro** | *(Suporte direto)* | `@debugger` / `@frontend-specialist` | `systematic-debugging`, `clean-code` |

---

## 4. Protocolo de Anúncio Híbrido (MANDATÓRIO)

Ao responder a qualquer tarefa que envolva a atuação de uma Squad e de Agentes especialistas, declare explicitamente no início da resposta:

```markdown
🏢 **Applying squad: `@[squad-name]`...**
🤖 **Applying knowledge of `@[agent-name]`...**
📚 **Using skills: `@[skill-name-1]` + `@[skill-name-2]`...**
```

*Exemplo:*
> 🏢 **Applying squad: `@milk-content-ops`...**  
> 🤖 **Applying knowledge of `@frontend-specialist`...**  
> 📚 **Using skills: `@squads` + `@frontend-design`...**

---

## 5. AG Kit — Integração com o Diretório `.agents/`

O repositório possui o toolkit completo de inteligência do **AG Kit** em [`.agents/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents). Qualquer agente operando aqui **deve** seguir a hierarquia de regras:

- **P0 (Regras Globais):** [`.agents/rules/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/rules/)
  - `core-protocol.md`: Protocolo de carregamento e anúncios obrigatórios.
  - `request-routing.md`: Classificação e roteamento automático de requisições.
  - `universal-rules.md`: Clean code, idioma e testes.
  - `code-rules.md`: Socratic gate, plan mode e checklist de verificação.
  - `design-rules.md`: Gate de tokens e restrições visuais.
- **P1 (Agentes Especialistas):** [`.agents/agent/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/agent/)
- **P2 (Skills Especializadas):** [`.agents/skills/`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/skills/) (incluindo `squads` e `harness`).
- **Memória Persistente:** [`.agents/memory/MEMORY.md`](file:///d:/portfolio%20daniel%20leite%20site/SITE%20FINAL/.agents/memory/MEMORY.md).

---

## 6. Diretrizes de Design & Anti-Slop (High-Craft)

1. **Estética Editorial & Dark Mode:**
   - Paleta escura rica (`#0a0a0c`, `#121216`, bordas sutis `rgba(255, 255, 255, 0.08)`).
   - Tipografia de impacto (Syne nos títulos display, Inter no corpo de texto, JetBrains Mono em metadados/código).
   - Proibição de "Visual IA Genérico": sem gradientes roxos genéricos, sem clones de templates, elementos com função clara.
2. **Responsividade Estrita:**
   - Todo container deve respeitar os limites de viewport (`overflow: hidden` ou rolagem deliberada com scrollbar estilizada).
   - Testar em Desktop (1536px+) e Mobile (375px a 420px).
   - Grids usando `minmax(0, 1fr)` para evitar overflow por min-width intrínseco.
3. **Fluidez e Micro-interações:**
   - Animações a 60-120fps utilizando apenas `transform` e `opacity`.
   - Event listeners de scroll e touch sempre com `{ passive: true }`.
   - Elementos com drag-scroll devem ter inércia física e cursor interativo (`grab` / `grabbing`).

---

## 7. Idioma e Comunicação

- **Comunicação com o Usuário:** Português do Brasil (PT-BR), direto, técnico e profissional.
- **Código & Commits:** Nomes de classes, variáveis, atributos e funções em inglês ou termos de domínio claros. Commits semânticos no padrão conventional commits (ex: `feat:`, `fix:`, `perf:`).

---

## 8. Comandos e Workflows Úteis

- `/coordinate` — Orquestração avançada com despacho de Squads e Agentes em paralelo.
- `/plan` — Planejamento estruturado de novos cases ou seções.
- `/verify` — Execução e prova de funcionamento através de testes práticos.
- `/debug` — Investigação sistemática de 4 fases para bugs ou layout quebrado.
- `/deploy` — Procedimentos de commit seguro e publicação no GitHub Pages.
- `/remember` — Persistir decisões arquiteturais no arquivo de memória de longo prazo.

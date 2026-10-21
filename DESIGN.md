---
version: alpha
name: Daniel Leite Portfolio
description: Editorial dark portfolio for a senior product designer and design engineer.
colors:
  background: "#070707"
  surface: "#0E1217"
  surface-hover: "#141B24"
  text: "#FFFFFF"
  text-dim: "#CBD5E1"
  muted: "#828C9B"
  line: "#1C2430"
  line-strong: "#2C384A"
  accent: "#06B6D4"
  accent-hover: "#22D3EE"
  kintaw-accent: "#FF6E3D"
typography:
  headline-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 112px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.055em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -0.045em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.035em
  body-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 2px
  md: 16px
  lg: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  section: 128px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
  case-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  media-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
---

# Daniel Leite Portfolio

## Overview

Portfólio editorial dark de Daniel Leite, voltado a recrutadores, lideranças de produto e clientes que avaliam pensamento estratégico, craft e capacidade de execução. A interface deve parecer autoral, precisa e técnica. O conteúdo e as imagens do trabalho são a evidência principal.

## Colors

- **Background:** off-black contínuo para preservar profundidade sem preto puro.
- **Surface:** carvão frio para separar capítulos e componentes por contraste tonal.
- **Text:** branco para títulos; `text-dim` e `muted` para leitura longa e metadados.
- **Accent:** ciano da marca Daniel Leite, reservado a interação, foco e assinatura do portfólio.
- **Kintaw accent:** coral da identidade Kintaw, usado apenas dentro do case como sinal contextual. Não substitui o acento global.

## Typography

Plus Jakarta Sans sustenta títulos de alta presença. Manrope organiza narrativa, interface e leitura longa. JetBrains Mono é reservado a metadados, rótulos e especificações. Em telas menores, os títulos usam escalas fluidas e nunca forçam overflow.

## Layout

O sistema usa containers de até 1400px, padding fluido e narrativa vertical. Grids sempre usam `minmax(0, 1fr)`. O desktop pode explorar assimetria e grandes zonas de respiro; abaixo de 768px, tudo colapsa para uma coluna legível entre 375px e 420px.

## Elevation & Depth

A profundidade vem de superfícies tonais, bordas discretas, imagens em escala e uma camada fixa de textura sutil. Sombras fortes, blur decorativo e glows genéricos não fazem parte do sistema.

## Shapes

Estrutura editorial predominantemente nítida. Blocos de mídia usam raios de 16px a 24px; botões e controles mantêm cantos de 2px. Pílulas ficam restritas a metadados compactos.

## Components

- **Case hero:** título de grande escala, descrição curta, metadados e imagem real com dimensões reservadas.
- **Case section:** capítulo narrativo com título, texto e evidências visuais.
- **Media frame:** imagem responsiva, `width` e `height` explícitos, `loading="lazy"` fora da dobra.
- **Project card:** item editorial com número, categoria, descrição, tags, estado de hover e CTA consistente.
- **Related projects:** três links visuais para continuar a navegação sem criar um beco sem saída.

## Do's and Don'ts

- Use evidências reais do projeto e indique hipóteses, propostas e próximos testes com clareza.
- Preserve o tema dark em toda a página e um único acento contextual por case.
- Anime apenas `transform` e `opacity`, com fallback para `prefers-reduced-motion`.
- Mantenha foco visível, HTML semântico e contraste WCAG AA.
- Não use bento grid, glassmorphism, gradiente roxo, hero SaaS 50/50 ou framework novo.
- Não apresente métricas de protótipo como resultados observados.

# Tasks — plano de implementação

Fase 3 do Spec-Driven Development. Cada tarefa termina com a verificação indicada. Marque `[x]` ao concluir, `[~]` se parcial.

## Fase 0 — Análise e decisões

- [x] T-00a Captura completa do Notion (página, abas, subpáginas, blocos recolhidos, botões), itch.io, SoundCloud, YouTube, Drive e PDFs. *Verif.: [`docs/context/fontes/`](../context/fontes/).*
- [x] T-00b Documentação de contexto: perfil, projetos, mídia, identidade visual, diagnóstico do Notion, perguntas abertas.
- [x] T-01 `requirements.md`, `design.md`, `DESIGN.md`, ADR-001 (proposto).
- [x] T-02 Respostas da Juliana às 19 [perguntas abertas](../context/perguntas-abertas.md) (12/nov/2026). Restam as divergências D1–D8 e o usuário do GitHub.
- [~] T-03 Conta do GitHub Pages: será a **dela**; falta o usuário. O workflow já calcula `SITE`/`BASE` a partir do repositório.

## Fase 1 — Fundação

- [x] T-10 `git init` local, `.gitignore`, `.gitattributes`.
- [x] T-11 Scaffold Astro 7 + TypeScript strict + Tailwind v4 + sitemap + i18n (`pt-br` padrão, `en`) + `site`/`base` por variável de ambiente. *Verif.: build e testes ok com `BASE=/` e `BASE=/teste/`.*
- [x] T-12 ESLint + Prettier + `scripts/check-tokens.mjs` (copiado do Pedro). *Verif.: `npm run check` limpo.*
- [~] T-13 `tokens.css` + `@theme` a partir do DESIGN.md; fontes self-hosted (Anton, JetBrains Mono, Source Sans 3); contraste conferido pelo axe. Falta a página `/dev/tokens`.
- [x] T-14 `.cursor/rules/` (conteúdo, componentes, testes) e skills `verify-in-browser` e `adding-content`.
- [x] T-15 Playwright + axe em 390 e 1280 px contra o build; fixtures de console, overflow e "nenhum iframe inicial".
- [x] T-16 Workflow do GitHub Actions (`verify` + `build` + `deploy`); o deploy só roda em `main` no repositório dela.

## Fase 2 — Mídia e conteúdo como dado

- [x] T-20 Baixar os 25 arquivos do Google Drive para `.scratch/drive/` (anexos do Notion em `.scratch/assets/`; extras em `media-src/`).
- [x] T-21 `scripts/media/build-media.mjs` com `ffmpeg-static`: MP3 160 kbps, picos e duração; vídeos H.264 com pôster e corte de tarjas; imagens, PDFs, OG e thumbnails do YouTube; manifesto idempotente. *Verif.: teste de tamanho do manifesto; site gerado com 52,6 MB.*
- [~] T-22 `content.config.ts` com as coleções e checagem das chaves de mídia no manifesto. Falta `/dev/conteudo`.
- [x] T-23 Perfil, experiência, formação, certificados, prêmios, ferramentas e skills com dados confirmados.
- [x] T-24 Os 9 projetos do Notion: textos PT/EN, entregas, intenção sonora, SFX rotulados e categorizados, vídeos, imagens, PDFs. *Verif.: teste de termos de template; créditos de equipe.*
- [x] T-25 Projetos extras do itch.io: 4Seasons, Pétalas ao Vento, The Symphony's Awakening.

## Fase 3 — Componentes e páginas

- [x] T-30 `BaseLayout`: meta, OG, canonical, `hreflang`, JSON-LD `Person`, skip link.
- [x] T-31 Componentes `ui/`: SoundCard, SectionHeading, YouTubeFacade, SoundCloudFacade, LocalVideo, Decor (pincel, retícula, listras), caixa de seleção em CSS.
- [x] T-32 Ilha `AudioEngine` com onda clicável, teclado, `aria-pressed`, fallback sem JS e estado de erro. *Verif.: e2e "um som por vez" e "sem JS".*
- [x] T-33 Home: hero com selos, reel, destaques, sound board com filtro, projetos com filtro, processo, sobre (timeline, formação, ferramentas, skills, idiomas, conquistas, Casulo Indie), contato com cover do Traitor, avatar e gatos. *Verif.: e2e + axe, 390/1280 px.*
- [x] T-34 Estudo de caso `/projetos/[slug]/` com stems do Midnight Meow em sequência. *Verif.: e2e e capturas.*
- [x] T-35 Espelho EN em `/en/` e seletor de idioma.
- [x] T-36 CV em `/cv/juliana-acunha.pdf`, 404 com avatar e gatos.

## Fase 4 — Máquina e polimento

- [~] T-40 `/llms.txt`, sitemap, robots, OG 1200×630 a partir do banner. Falta JSON-LD `VideoGame` por projeto (R-21).
- [ ] T-41 Passe de "harden": movimento reduzido, 360–1920 px, revisão sem JS.
- [ ] T-42 Lighthouse dentro dos orçamentos (N-01). Candidato: reduzir a foto do hero.
- [ ] T-43 Revisão humana de texto, traduções PT e estética **com a Juliana**.

## Fase 5 — Lançamento

- [ ] T-50 Criar o repositório na conta dela, ligar Pages (fonte: GitHub Actions) e fazer o primeiro deploy.
- [ ] T-51 Atualizar links no itch.io, SoundCloud, YouTube, LinkedIn e no CV dela (o CV aponta para o Notion).
- [ ] T-52 Avisar o Pedro para corrigir o papel dela no Midnight Meow no site dele (D5) e alinhar créditos de Pétalas ao Vento e Symphony's Awakening (D6).

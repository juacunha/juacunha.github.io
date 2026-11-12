# Tasks — plano de implementação

Fase 3 do Spec-Driven Development. Cada tarefa termina com a verificação indicada. Marque `[x]` ao concluir, `[~]` se parcial.

## Fase 0 — Análise e decisões

- [x] T-00a Captura completa do Notion (página, abas, subpáginas, blocos recolhidos, botões), itch.io, SoundCloud, YouTube, Drive e PDFs. *Verif.: [`docs/context/fontes/`](../context/fontes/).*
- [x] T-00b Documentação de contexto: perfil, projetos, mídia, identidade visual, diagnóstico do Notion, perguntas abertas.
- [x] T-01 `requirements.md`, `design.md`, `DESIGN.md`, ADR-001 (proposto).
- [ ] T-02 Respostas da Juliana às [perguntas abertas](../context/perguntas-abertas.md) — **bloqueia** textos finais, créditos, telefone, idioma padrão e projetos extras (4Seasons, Pétalas, Symphony's).
- [ ] T-03 Decidir conta/URL do GitHub Pages (pergunta 19). **Não bloqueia** o desenvolvimento local.

## Fase 1 — Fundação

- [x] T-10 `git init` local, `.gitignore`, `.gitattributes`.
- [ ] T-11 Scaffold Astro 7 + TypeScript strict + Tailwind v4 + sitemap + i18n (`en` padrão, `pt`) + `site`/`base` por variável de ambiente. Reaproveitar configs do site do Pedro. *Verif.: `npm run build` ok com `BASE=/` e `BASE=/teste/`.*
- [ ] T-12 ESLint + Prettier + `scripts/check-tokens.mjs` (copiar do Pedro). *Verif.: violação proposital é barrada.*
- [ ] T-13 `tokens.css` + `@theme` a partir do DESIGN.md; fontes self-hosted (Anton, JetBrains Mono, Source Sans 3). Página `/dev/tokens`. *Verif.: navegador em 390 e 1280 px, fontes carregadas, contraste conferido.*
- [ ] T-14 `.cursor/rules/` (conteúdo, componentes, testes, áudio) e skills `verify-in-browser` e `adding-project` (adaptadas do Pedro).
- [ ] T-15 Playwright + axe em 390 e 1280 px contra o build; fixtures de console, rede, overflow e "nenhum iframe inicial".
- [ ] T-16 Workflow do GitHub Actions (`verify` + `deploy`), deploy desligado até T-03.

## Fase 2 — Mídia e conteúdo como dado

- [ ] T-20 Baixar os 17 áudios e 8 vídeos do Google Drive para `.scratch/` e organizar `media-src/<slug>/` (anexos do Notion já estão em `.scratch/assets/`).
- [ ] T-21 `scripts/audio/build-audio.mjs` com `ffmpeg-static`: Opus + MP3, picos e duração no manifest, idempotente. *Verif.: nenhum arquivo > 2 MB; acervo ≤ 60 MB; manifest bate com `media-src`.*
- [ ] T-22 `content.config.ts` com as coleções e checagens de referência do design.md. *Verif.: referência de áudio inexistente quebra o build; `/dev/conteudo` lista tudo.*
- [ ] T-23 Preencher perfil, experiência, formação, certificados, prêmios, ferramentas e skills com dados **confirmados** (pendências ficam vazias ou `draft`).
- [ ] T-24 Preencher os 9 projetos do Notion: textos EN (dela, com correções de digitação), traduções PT, entregas, intenção sonora, SFX rotulados e categorizados, vídeos, imagens otimizadas, PDFs. *Verif.: nenhum texto de template; créditos só os confirmados.*
- [ ] T-25 Projetos extras do itch.io conforme T-02.

## Fase 3 — Componentes e páginas

- [ ] T-30 `BaseLayout`: meta, OG, canonical, `hreflang`, JSON-LD `Person`, skip link.
- [ ] T-31 Componentes `ui/`: Button, Tag, DeliverableTag, AwardBadge, SectionHeading, fachadas (YouTube, SoundCloud, Drive), SVGs de marca (pincel, retícula, listras, caixa de seleção).
- [ ] T-32 Ilha `AudioPlayer` + `Waveform` + `SfxCard`. *Verif.: um som por vez, teclado, leitor de tela, fallback sem JS (R-12).*
- [ ] T-33 Home: hero com reel e selos (R-01), destaques (R-02), sound board com filtro (R-03), projetos com filtro (R-04), processo (R-05), conquistas (R-06), timeline (R-07), ferramentas e skills (R-08), contato (R-09). *Verif.: e2e por requisito + axe, 390/1280 px.*
- [ ] T-34 Estudo de caso `/projects/[slug]` com o template do R-10 e `StemSequence` do Midnight Meow (R-11). *Verif.: e2e R-10/R-11 para todos os projetos.*
- [ ] T-35 Espelho PT-BR e seletor de idioma (R-14).
- [ ] T-36 CV em `/cv/juliana-acunha.pdf` (R-15), 404 (R-16).

## Fase 4 — Máquina e polimento

- [ ] T-40 JSON-LD por projeto (R-21), `/llms.txt` (R-22), sitemap, robots, OG 1200×630 no estilo do banner (R-23).
- [ ] T-41 Passe de "harden": estados de erro de mídia, movimento reduzido, 360–1920 px, sem JS.
- [ ] T-42 Lighthouse dentro dos orçamentos (N-01).
- [ ] T-43 Revisão humana de texto e estética **com a Juliana**.

## Fase 5 — Lançamento

- [ ] T-50 Criar repositório na conta decidida em T-03, ligar Pages e o deploy.
- [ ] T-51 Atualizar links no itch.io, SoundCloud, YouTube, LinkedIn e no CV dela (o CV aponta para o Notion).
- [ ] T-52 Avisar o Pedro para corrigir o papel dela no Midnight Meow no site dele (D5) e alinhar créditos de Pétalas ao Vento e Symphony's Awakening (D6).

# ADR-001 — Stack e hospedagem

- **Status:** Proposto (12/nov/2026). Hospedagem no GitHub Pages decidida; conta/URL em aberto (pergunta 19 em [perguntas-abertas.md](../context/perguntas-abertas.md)).
- **Data:** 12/nov/2026

## Contexto

Portfólio de sound designer: conteúdo estático, mas com **muita mídia** (15 trilhas no SoundCloud, ~60 SFX/vozes, ~12 vídeos no YouTube, 8 vídeos de processo). Precisa carregar rápido no celular, tocar áudio na hora, ser fácil de manter quando ela publicar um projeto novo e ficar no GitHub Pages (custo zero).

O site do Pedro (`C:\Curriculo-Pedro`) já resolveu um problema parecido com Astro + conteúdo tipado + CI com Playwright, e foi desenvolvido com agentes de IA. Reaproveitar a mesma base reduz risco e permite copiar convenções (AGENTS.md, rules, skills, workflow de deploy).

## Decisão proposta

- **Astro 7 + TypeScript strict + Tailwind CSS v4** com tokens em CSS variables (mesma base do site do Pedro).
- **Content Collections (Zod)** para perfil, experiência, projetos, prêmios e mídia — um arquivo de dados por projeto, para ela (ou um agente) adicionar projetos sem tocar em componentes.
- **Ilhas de JS mínimas**, só onde há interação real:
  - player de SFX (play/pause, forma de onda, um som por vez);
  - fachadas de YouTube e SoundCloud (carregam o iframe só no clique).
- **Pipeline de áudio fora do build**: script `scripts/audio/` com `ffmpeg` que converte WAV/MP3 de origem para **Opus (`.ogg`) + MP3** e gera os **picos da forma de onda em JSON**. Os arquivos convertidos ficam versionados; os originais ficam fora do git.
- **Imagens** via `astro:assets` (AVIF/WebP responsivos).
- **Playwright + axe** contra o build, em 390px e 1280px; ESLint + Prettier.
- **Deploy:** GitHub Actions → GitHub Pages (`withastro/action` + `actions/deploy-pages`), publicando só se `verify` passar — igual ao `.github/workflows/deploy.yml` do Pedro.

## Opções consideradas

| Opção | Prós | Contras |
| --- | --- | --- |
| **Astro (proposta)** | Zero JS por padrão, conteúdo tipado, base já validada no site do Pedro | Exige Node para editar |
| Continuar no Notion | Ela já edita lá | Lento, sem identidade, problemas P1–P14 de [notion-atual.md](../context/notion-atual.md) |
| HTML/CSS puro | Simples | Sem fonte única de dados; manutenção manual de 12 projetos |
| Gerar o site a partir do Notion (API) | Ela continuaria editando no Notion | Depende de token de integração e da estrutura bagunçada atual; URLs de arquivos expiram |

## Consequências

- Conteúdo vive em `src/content/`; componentes só renderizam.
- O `ffmpeg` não está instalado nesta máquina (12/nov/2026); o script de áudio usará o pacote npm `ffmpeg-static`, então basta `npm install`.
- Embeds de terceiros (YouTube, SoundCloud) só carregam após clique: melhor performance e privacidade, um clique a mais para o visitante.
- Se a URL final for um project site (`usuario.github.io/repo`), o Astro precisa de `base` configurado.

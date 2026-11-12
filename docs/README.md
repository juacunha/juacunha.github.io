# Documentação — Site Portfólio da Juliana Acunha

Sound designer para jogos. Este site substitui o [portfólio no Notion](https://melodious-pamphlet-85e.notion.site/Portfolio-Juliana-Acunha-4107d106c759809484cbd871fb73f8cb) e será hospedado no GitHub Pages.

Status (12/nov/2026): **análise e specs concluídas** (specs em rascunho). Próximo passo: levar as [perguntas abertas](context/perguntas-abertas.md) para a Juliana e começar a fundação (Fase 1 de [tasks.md](specs/tasks.md)), que não depende das respostas.

## 1. Contexto (dados reais da Juliana)

| Documento | Assunto |
| --- | --- |
| [context/perfil.md](context/perfil.md) | Posicionamento, contato, experiência, formação, prêmios, ferramentas, skills |
| [context/projetos.md](context/projetos.md) | Os 12 projetos: papel, equipe, contexto, intenção sonora, links |
| [context/midia.md](context/midia.md) | SoundCloud, YouTube, Google Drive, anexos; como servir cada mídia no GitHub Pages |
| [context/notion-atual.md](context/notion-atual.md) | Estrutura do Notion atual, o que manter e os 14 problemas a resolver |
| [context/perguntas-abertas.md](context/perguntas-abertas.md) | Divergências entre fontes e perguntas para ela |
| [context/fontes/](context/fontes/) | Capturas brutas: páginas do Notion, texto do currículo e das One Pages, lista do Drive |

## 2. Design

| Documento | Assunto |
| --- | --- |
| [design/identidade-visual.md](design/identidade-visual.md) | Análise: paleta medida, fontes (Anton + JetBrains Mono), elementos gráficos, contraste |
| [design/DESIGN.md](design/DESIGN.md) | Design system: tokens de cor (com contrastes verificados), tipografia, componentes, proibições |

## 3. Decisões

| Documento | Assunto |
| --- | --- |
| [decisions/ADR-001-stack-e-hospedagem.md](decisions/ADR-001-stack-e-hospedagem.md) | Astro + conteúdo tipado + pipeline de áudio + GitHub Pages (proposto) |

## 4. Especificação (Spec-Driven Development)

| Documento | Fase |
| --- | --- |
| [specs/requirements.md](specs/requirements.md) | O que construir: requisitos R-xx e N-xx, públicos, estados |
| [specs/design.md](specs/design.md) | Como construir: arquitetura, rotas, modelo de conteúdo, pipeline de áudio, testes |
| [specs/tasks.md](specs/tasks.md) | Passos ordenados com verificação |

## Pesquisa reaproveitada

A pesquisa geral do site do Pedro vale aqui também e não foi duplicada: `C:\Curriculo-Pedro\docs\research\` (front-end com agentes, stack, ATS, boas práticas de portfólio, portfólio de game dev, SEO para IA, tendências de design).

## Como re-sincronizar com o Notion

Se ela atualizar o Notion antes do lançamento:

```
node scripts/notion/dump-notion.mjs      # página principal, coleções e subpáginas de projeto
node scripts/notion/dump-missing.mjs     # blocos recolhidos, botões e projetos extras
node scripts/notion/dump-pages.mjs news <ids...>   # páginas avulsas (conquistas, covers)
node scripts/notion/download-assets.mjs  # baixa anexos (URLs assinadas expiram)
```

A saída vai para `.scratch/` (fora do git).

---
name: adding-content
description: Adiciona ou edita conteúdo do portfólio da Juliana (projeto, som, vídeo, experiência, formação, prêmio, ferramenta) nas coleções tipadas em PT-BR e EN, incluindo o pipeline de mídia. Use quando pedirem para incluir, atualizar ou remover um jogo, faixa, efeito sonoro, vídeo, emprego, curso ou prêmio.
---

# Adicionar conteúdo

## Onde fica cada coisa

| Tipo                       | Arquivo                                     |
| -------------------------- | ------------------------------------------- |
| Perfil, contato, redes     | `src/content/profile.yaml`                  |
| Experiência                | `src/content/experience.yaml`               |
| Formação e certificados    | `src/content/education.yaml`                |
| Prêmios                    | `src/content/awards.yaml`                   |
| Ferramentas e habilidades  | `src/content/tools.yaml`, `skills.yaml`     |
| Vídeos de processo (foley) | `src/content/process.yaml`                  |
| Projetos                   | `src/content/projects/<slug>.yaml`          |
| Origem da mídia            | `scripts/media/sources.mjs`                 |
| Manifesto gerado           | `src/data/media-manifest.json` (não editar) |

Schemas: `src/content.config.ts`.

## Passos

1. Junte os fatos em `docs/context/`. Faltou algo? Pergunte; não invente. Siga `.cursor/rules/conteudo.mdc`.
2. **Mídia nova:** coloque o original em `media-src/` (ou `.scratch/drive/`), registre em `scripts/media/sources.mjs` com chave e sufixo único do nome do arquivo, e rode `npm run media`. Ele gera MP3, onda, vídeo H.264 com pôster, copia imagens e atualiza o manifesto.
3. Referencie a chave no YAML (`audio: projeto/nome`, `local: foley/nome`, `cover: projects/slug/cover.png`).
4. Escreva `pt` e `en` com o mesmo significado. Som de terceiros: `curated: true`.
5. Defina `order`, `featured` e `team` (créditos completos).
6. Valide: `npm run check`, `npm run build`, `npm test`, e revise a página com a skill `verify-in-browser`.
7. Fato novo? Atualize `docs/context/`.

## Exemplo (efeito sonoro)

```yaml
sfx:
  - audio: molten-metal/martelada
    label: { pt: Martelada, en: Hammer hit }
    category: gameplay
```

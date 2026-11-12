# Portfólio atual no Notion — estrutura e diagnóstico

URL: https://melodious-pamphlet-85e.notion.site/Portfolio-Juliana-Acunha-4107d106c759809484cbd871fb73f8cb
Capturado em 12/nov/2026 pela API pública de leitura do Notion (scripts em `scripts/notion/`). Árvore completa em [`fontes/notion/pagina-principal.md`](fontes/notion/pagina-principal.md).

## Estrutura da página principal

```
[Banner: gradiente + "Soundtrack Composer • SFX Artist / JULIANA ACUNHA / Game Audio & Sound Design" + foto]
Título: "Portfolio - Juliana Acunha" (ícone de fone rosa)

Coluna esquerda (~55%)                         | Coluna direita (~45%)
-----------------------------------------------|------------------------------------------
Vídeo YouTube: reel "Meu Portfólio de Sound    | Galeria com 3 abas:
Design" (thumb do Molten Metal)                |   Projects   — 9 cards (capa, ícone, tags)
                                               |   Newsletter — 5 conquistas (prêmios, Casulo)
Foto | Citação de boas-vindas                  |   Covers     — 1 item (Traitor, Olivia Rodrigo)
Botões: SoundCloud, itch.io, YouTube           |
                                               |
"Contact & Information ✨"                     |
  e-mail | telefone | Resume.pdf | LinkedIn    |
---                                            |
▸ Main Tools (galeria de 18 ferramentas)       |
▸ Languages                                    |
▸ Skills (hard e soft)                         |
▸ Academic Background                          |
---                                            |
▸ Creating Some SFXs (4 vídeos do Drive)       |
```

Cada card de projeto abre uma subpágina com, em ordem variável: papel, teaser, trilha (SoundCloud ou Drive), SFX (WAVs em colunas), processo (vídeos), sinopse em citação, intenção sonora em callouts com lâmpada.

## O que funciona (manter)

- **Reel no topo.** É exatamente o que recrutadores de áudio procuram primeiro.
- **Intenção sonora por projeto** (os callouts com lâmpada): mostram raciocínio de design, não só o resultado. É o melhor conteúdo do portfólio.
- **Papel explícito** em cada projeto.
- **Vídeos de processo de foley**: diferencial raro e muito "sound designer".
- **SFX organizados por projeto**, ouvíveis um a um.
- Identidade visual forte no banner.

## Problemas (o site deve resolver)

| # | Problema | Efeito | Solução no site |
| --- | --- | --- | --- |
| P1 | Prêmios escondidos na aba "Newsletter" | O Melhor Áudio — a prova mais forte — fica invisível | Selos de prêmio no hero e nos cards; seção de conquistas |
| P2 | Experiência profissional (Bee Legacy, Casulo Indie) só existe no PDF | Parece só estudante | Seção de experiência na home |
| P3 | Ferramentas, idiomas, skills e formação em blocos recolhidos | Informação-chave exige cliques | Visível, compacto, sem toggles |
| P4 | Carregamento lento: Notion + dezenas de iframes (Drive, SoundCloud, YouTube) e WAVs | Ruim no celular; recrutador desiste | Fachadas leves, áudio comprimido, lazy load |
| P5 | Players do Drive são pesados e às vezes pedem login | Áudio pode não tocar | Áudio hospedado no próprio site |
| P6 | Tags misturam engine, plataforma e papel ("PC", "Godot", "SFX", "In Development") | Difícil filtrar o que ela fez | Campos separados + filtro por entrega (Trilha, SFX, Voz, Curadoria, Implementação) |
| P7 | Estrutura das subpáginas varia de projeto para projeto | Leitura inconsistente | Template único de estudo de caso |
| P8 | Equipe e créditos ausentes ou genéricos ("1 programmer") | Perde contexto de colaboração | Créditos nominais (com permissão) |
| P9 | Projetos do itch.io fora do portfólio (4Seasons, Pétalas ao Vento, The Symphony's Awakening) | Acervo incompleto | Decidir com ela o que entra |
| P10 | Só em inglês, com erros de digitação ("Fedral", "enviroment", "produce de original voice", "SUMARY") | Passa descuido | Revisão de texto; PT-BR + EN |
| P11 | Sem SEO: título genérico, sem meta descrição, sem dados estruturados | Não aparece em buscas por "sound designer Pelotas/Rio Grande" | Metadados, JSON-LD, Open Graph |
| P12 | Lixo de template (campo com texto sobre previsão de notas em Python; capa antiga dizendo "Game Designer") | Confunde | Descartar |
| P13 | Telefone pessoal exposto publicamente | Spam/privacidade | Confirmar com ela; preferir e-mail + LinkedIn |
| P14 | Ícones dos botões são imagens com texto; sem foco de teclado nem `alt` | Acessibilidade | Links semânticos, ícones SVG com rótulo |

# Requirements — Site Portfólio da Juliana Acunha

Fase 1 do Spec-Driven Development. Status: **v1 implementada (12/nov/2026)**, com as respostas da Juliana incorporadas. Itens marcados **(confirmar)** dependem de [perguntas-abertas.md](../context/perguntas-abertas.md); a estrutura não depende deles.

## Objetivo

Um site estático, rápido e acessível onde um diretor de áudio, produtor ou recrutador de estúdio consiga, **em até 15 segundos**, entender que a Juliana é sound designer para jogos, **ouvir** o trabalho dela sem cliques extras nem downloads, e ver que ela é premiada (Melhor Áudio, GameJam Plus 2026/27). E que, em um minuto, entenda **como ela pensa o som** (intenção sonora, processo de foley, trilha adaptativa).

Substitui o portfólio no Notion, resolvendo os problemas P1–P14 de [notion-atual.md](../context/notion-atual.md).

## Decisões de produto

| Tema | Decisão | Status |
| --- | --- | --- |
| Posicionamento | **Game Sound Designer** (trilha, SFX, voz, implementação). Game design, arte e produção aparecem como competências de apoio, não como título | Decidido (pergunta 9) |
| Idiomas | **PT-BR padrão em `/`, EN em `/en/`** | Decidido (pergunta 10) |
| Identidade | Identidade A do [identidade-visual.md](../design/identidade-visual.md) (índigo + rosa-choque, Anton + JetBrains Mono). Gatos e avatar entram na v1, em pontos de personalidade (contato, 404) | Decidido (pergunta 13) |
| Ordem da home | Hero com selos de prêmio → Reel → Destaques → Sound board (SFX) → Projetos → Processo (foley) → Sobre (experiência, formação, ferramentas, skills, idiomas, conquistas, Casulo Indie) → Contato | Implementado |
| Hospedagem | GitHub Pages na conta **dela** (`juacunha`). O site funciona tanto na raiz (`juacunha.github.io`) quanto em subcaminho (`/repo/`) | Decidido / nome do repositório em aberto |
| Currículo | v1 serve o PDF do Canva dela como está; versão ATS gerada dos dados fica para v2 | Implementado |

## Públicos

| Público | Quer | Sucesso |
| --- | --- | --- |
| Diretor de áudio / sound lead | Ouvir trilhas e SFX rápido, entender gosto e técnica, ver implementação | Ouve 3+ peças, abre um estudo de caso |
| Produtor / recrutador de estúdio | Papel, prêmios, experiência, CV, contato | Baixa o CV ou clica em contato |
| Equipe de game jam / indie | Estilo, versatilidade, disponibilidade | Clica em contato ou LinkedIn |
| Motores de busca e de IA | Fatos estruturados | Encontram "sound designer" + nome + cidade |

## Requisitos funcionais

Numeração usada nos testes (`R-xx`).

### Home

- **R-01 Hero**: nome, título ("Game Sound Designer"), frase curta de posicionamento, **reel do YouTube** (`JByBcjKhWck`) com fachada (thumbnail + play, iframe só no clique), **selos de prêmio** (Melhor Áudio em destaque), CTAs "Ouvir trabalhos" (âncora para o sound board), "Baixar CV", "Contato", e links para SoundCloud, itch.io, YouTube e LinkedIn. Nome, título e CTAs visíveis sem rolagem em 390×844 e 1280×800.
- **R-02 Destaques**: 3 projetos em cards grandes (proposta: **Molten Metal**, **Midnight Meow**, **Purr-Anormal**), cada um com capa, gancho de uma linha, entregas dela (Trilha · SFX · Voz…), selo de prêmio quando houver e **um play direto** da faixa ou SFX mais representativo sem sair da home.
- **R-03 Sound board**: grade de SFX e vozes curtas de todos os projetos, tocáveis com um clique, com forma de onda, nome legível (não o nome do arquivo), projeto de origem e categoria. Filtro por categoria: **Foley**, **UI**, **Personagem/Voz**, **8-bit**, **Ambiente/Gameplay**. Só um som toca por vez.
- **R-04 Projetos**: grade com todos os projetos publicados; card com capa, título, engine, contexto (jam, faculdade, estúdio, solo), entregas dela e selo de prêmio. Filtro por entrega (Trilha, SFX, Voz, Curadoria, Implementação, Game design). Cada card leva ao estudo de caso.
- **R-05 Processo**: vídeos de foley ("Creating Some SFXs" + processos de Purr-Anormal e Hands Off) em grade, com fachada e legenda do que foi gravado (ex.: "Papel rasgando → SFX de livro").
- **R-06 Conquistas**: os 4 prêmios da GameJam Plus e a seleção para incubação na Casulo Indie, com imagem, edição e projeto. Nomenclatura das edições conforme D2 (confirmar).
- **R-07 Experiência e formação**: linha do tempo tracejada (referência ao CV dela) com UPLINK, Bee Legacy Publishing e UFPel; certificados em lista compacta. Cargo sem descrição confirmada mostra só cargo, empresa, período e local.
- **R-08 Ferramentas e skills**: ferramentas agrupadas (Áudio, Engines, Produção e documentação, Arte e 3D) com ícones; competências em texto (sem barras de porcentagem); idiomas.
- **R-09 Contato**: e-mail clicável e copiável, LinkedIn, SoundCloud, itch.io, YouTube. Telefone público (pergunta 11), cidade Rio Grande, RS, e os tipos de oportunidade que ela busca (estágio, júnior, freelance, internacional/remoto).

### Estudo de caso (`/projetos/[slug]`)

- **R-10 Template único** para todos os projetos, nesta ordem, omitindo blocos sem conteúdo:
  1. Cabeçalho: capa, título (e título alternativo PT/EN), gancho, selos, ficha (engine, plataforma, contexto, ano, status, link do itch.io).
  2. **Papel**: entregas dela como etiquetas + o texto dela.
  3. **Intenção sonora**: as notas dela (os callouts do Notion) em destaque visual — é o conteúdo-chave.
  4. **Trilha**: playlist do SoundCloud (fachada) e/ou faixas hospedadas com player.
  5. **SFX e voz**: grade do sound board filtrada pelo projeto.
  6. **Processo**: vídeos de foley e imagens de produção (ex.: gravação de flauta, MIDI).
  7. **Teaser / Pitch**: vídeos do YouTube com fachada.
  8. **Imagens** do jogo.
  9. **Documentos**: One Page / GDD em PDF.
  10. **Equipe e contexto**: créditos nominais (autorizados), disciplina/jam.
  11. Navegação para o projeto anterior/próximo.
- **R-11 Trilha adaptativa (Midnight Meow)**: os 8 stems de tensão apresentados em sequência numerada com rótulos ("Batida", "Transição", "Tensão média"…), explicando que as ondas de inimigos surgem conforme a tensão da música sobe.

### Geral

- **R-12 Players de áudio**: play/pause, barra de progresso clicável e operável por teclado, duração, forma de onda pré-calculada; nunca autoplay; para ao iniciar outro som; funciona por teclado e leitor de tela (`aria-label` com nome do som e do projeto); sem JS, cai para `<audio controls>` nativo.
- **R-13 Fachadas de terceiros**: YouTube (`youtube-nocookie.com`) e SoundCloud só carregam iframe após clique (a mídia do Drive é hospedada no próprio site); antes disso, imagem + botão com rótulo acessível.
- **R-14 i18n**: PT-BR em `/`, EN em `/en/`, seletor de idioma, `hreflang`. Textos dela em EN são a fonte; traduções PT a revisar com ela.
- **R-15 CV**: botão "Baixar CV" serve `Resume_Juliana_Acunha.pdf` em URL estável (`/cv/juliana-acunha.pdf`).
- **R-16 404** no estilo do site com o avatar ilustrado e os gatos.
- **R-17 Créditos e ética**: todo projeto de equipe mostra que é de equipe; selo "No generative AI" onde a página do itch.io declara isso; nada de prêmio ou papel sem fonte em `docs/context/`.

## Requisitos de máquina (SEO/IA)

- **R-20** JSON-LD `Person` (`jobTitle: Sound Designer`, `sameAs`: SoundCloud, itch.io, YouTube, LinkedIn, `alumniOf`: UFPel, `award`: prêmios) em todas as páginas.
- **R-21** JSON-LD `VideoGame` por projeto, com `contributor`/`creator` referenciando a Person, e `MusicRecording`/`AudioObject` nas faixas hospedadas.
- **R-22** `/llms.txt` gerado no build.
- **R-23** `sitemap.xml`, `robots.txt`, canonical, Open Graph com imagem 1200×630 no estilo do banner, título "Juliana Acunha — Sound Designer for Games".

## Requisitos não funcionais

- **N-01 Performance**: Lighthouse mobile Performance ≥ 95; LCP ≤ 2 s; CLS = 0; JS ≤ 40 KB por página (player incluso); **nenhum iframe de terceiros no carregamento inicial**; áudio com `preload="none"`.
- **N-02 Peso de mídia**: áudio em MP3 160 kbps (formato único, toca em todos os navegadores); vídeos H.264 ≤ 1280 px com pôster; limites por arquivo: áudio ≤ 5 MB, vídeo ≤ 8 MB, pôster ≤ 0,5 MB (testado); imagens WebP responsivas; site gerado ≤ 60 MB.
- **N-03 Acessibilidade**: WCAG 2.2 AA; axe sem violações; tudo operável por teclado; foco visível; `prefers-reduced-motion`; formas de onda e animações decorativas com `aria-hidden`.
- **N-04 Responsivo**: 360 px a 1920 px sem rolagem horizontal; sound board utilizável com o polegar (alvos ≥ 44 px).
- **N-05 Identidade**: só tokens do [DESIGN.md](../design/DESIGN.md).
- **N-06 Conteúdo como dado**: nenhum texto de conteúdo em componentes; tudo em `src/content/` validado por schema. Adicionar um projeto = criar um arquivo de dados + jogar a mídia na pasta dele.
- **N-07 Custo zero** de hospedagem.
- **N-08 Funciona sem JavaScript**: páginas legíveis, áudio pelo player nativo, links dos vídeos abrem no YouTube.
- **N-09 Privacidade**: sem cookies próprios; sem analytics na v1; telefone publicado com autorização dela.

## Estados a cobrir

- Projeto sem link público (Purr-Anormal, Hands Off) → selo "Em desenvolvimento", sem botão quebrado.
- Vídeo hospedado sem JS → `<video controls>` nativo com pôster.
- Áudio que falha ao carregar → mensagem curta no card e o player volta ao estado inicial.
- JavaScript desligado → `<audio controls>` nativo e links diretos.
- Movimento reduzido → sem animações de entrada nem formas de onda animadas.

## Fora de escopo (v1)

Blog, CMS, light mode, formulário com backend, analytics, sincronização automática com o Notion, versão ATS do CV gerada dos dados (v2), player com mixagem interativa de stems (v2: tocar os stems do Midnight Meow em camadas seria um ótimo diferencial).

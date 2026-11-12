# Inventário de mídia e integrações

> O portfólio atual depende de quatro serviços: **SoundCloud** (trilhas), **YouTube** (teasers, pitches, reel), **Google Drive** (áudios e vídeos de processo) e **anexos do Notion** (SFX em WAV/MP3, imagens, PDFs). Este documento lista tudo e propõe como cada tipo será servido no GitHub Pages.
> Lista bruta dos arquivos do Drive: [`fontes/google-drive-arquivos.txt`](fontes/google-drive-arquivos.txt). Todos os 25 estavam públicos em 12/nov/2026.

## SoundCloud — 15 faixas

Perfil: https://soundcloud.com/juliana-acunha-232828507 (cidade: Rio Grande; bio igual à frase do Notion).

| Playlist (set) | URL | Faixas |
| --- | --- | --- |
| Purr-Anormal: A Mystery in Paws | `/sets/purr-anormal-a-mystery-in-paws` | Main Soundtrack, Menu Soundtrack |
| Hands Off My Grimoire | `/sets/hands-off-my-grimoire` | Menu, Victory, Defeat Soundtrack |
| Molten Metal | `/sets/molten-metal` | Menu, Main, Lobby Soundtrack |
| Midnight Meow | `/sets/midnight-meow` | Main Soundtrack, Menu, Victory, Game Over |
| (avulsas) | — | Soundtrack Mathias Shooter, Seasoned Wings Main Soundtrack, ServOS Main Soundtrack |

Todas publicadas entre 9 e 11/nov/2026, ou seja, ela está montando o acervo agora.

## YouTube — canal @JubssAcunha

| Data | Vídeo | ID | Uso no site |
| --- | --- | --- | --- |
| 10/nov/2026 | Meu Portfólio de Sound Design – Juliana Acunha | `JByBcjKhWck` | **Reel principal (hero)** |
| 20/out/2026 | Molten Metal – Pitch (Game Jam Plus 2026/2027) | `CnpQeGkTy4o` | Molten Metal |
| 06/abr/2026 | Midnight Meow Teaser | `-G5KOAxw3FQ` | Midnight Meow |
| 07/nov/2025 | Cover Traitor – Olivia Rodrigo | `0FfBJQdFeB4` | Covers (opcional) |
| 22/out/2025 | Midnight Meow – Game Jam Plus – Pitch | `xuEVauS7qNk` | Midnight Meow |
| 29/mar/2025 | Teaser Jogo Asas Temperadas: Receitas Mágicas | `GQc1UGaeSFs` | Seasoned Wings |

Vídeos usados no Notion que não estão no feed do canal (podem estar em outros canais, não listados ou com o feed limitado a 15 itens): Molten Metal teaser `pNarBwwvbPE`, Midnight Meow teaser `ugLLJmAIxQo`, ServOS `7IGP5ZjzBkA`, Mathias Shooter `IrkcDvWowxE`, Eco `WoSfrz-lvjg`, Feed The Cats `n8RU80fHyfY`.

## Google Drive — 25 arquivos

### Vídeos de processo de foley (8 MP4)

| Arquivo | ID | Onde aparece |
| --- | --- | --- |
| quebrando incenso.mp4 | `1zP8S7t8n_fgrxMXpSue5setvi4svpccE` | "Creating Some SFXs" |
| desodorante.mp4 | `14vSTVGEsihI8352h-C8Kw8Mlny7jDTjl` | "Creating Some SFXs" |
| rasgando papel.mp4 | `16T6-OOLyh9dCH0YOcisIhC67sT6hbNFn` | "Creating Some SFXs" |
| Guarda chuva.mp4 | `1le9Cr7p7nFNGgx1YkpJDcHWtkzALSLgV` | "Creating Some SFXs" |
| fazendo passos pudim.mp4 | `1MIvtIgc2G1mj1BNTPYj8Jcty4VkxeSGn` | Purr-Anormal |
| miados purranomral.mp4 | `1xTHMZ3pj36_V5f--8B2cKU9SmeU9-UPf` | Purr-Anormal |
| Processo Passos Goblin.mp4 | `12VDdkMdNbPraITxMy4Du0BHluRmy-hJ7` | Hands Off My Grimoire |
| Vídeo passos grama.mp4 | `141fzoDPQPEiYncGbjAQJD5cm-AIvdnS6` | Hands Off My Grimoire |

### Áudios (WAV/MP3)

| Arquivo | Projeto |
| --- | --- |
| mainsoundtrack nixie.wav, 1 - Batida.wav, 2 - Transicao.wav, 4 - Transicao Metade.wav, 5 - Tensao Media.wav, 6 - Transicao 130bpm.wav, 8 - Transicao 130bpm.wav, 10 - Batida.wav, menu.wav, credits.wav, game over.wav | Midnight Meow (stems de tensão + temas) |
| main_soundtrack.wav | ServOS |
| soundtrack mathias.wav | Mathias Shooter |
| medieval ju e luiz - 19_03_2025 21.37.wav, Narrativa Sonora.mp3 | Seasoned Wings |
| menu.mp3, gameplay.mp3 | Eco (curadoria) |

Contagem: **8 vídeos MP4 + 17 áudios = 25 arquivos.**

## Anexos do Notion — 46 áudios, 31 imagens/PDFs

Baixados para `.scratch/assets/` (45,5 MB, fora do git; manifesto em `.scratch/assets/manifest.json`). Script: `node scripts/notion/download-assets.mjs` (as URLs do Notion são assinadas e expiram, por isso a cópia local).

| Tipo | Qtd. | Detalhe |
| --- | --- | --- |
| SFX/voz WAV | 38 | Purr-Anormal (11), Hands Off (8), Molten Metal (9 SFX + 8 vozes), Mathias Shooter (2) — maiores têm 3 MB |
| MP3 | 7 | Feed The Cats (5), Eco (1), Seasoned Wings (1) |
| Capas de projeto | 9 | Uma por projeto (PNG/JPEG, 1024 px de largura) |
| Capas de conquistas | 5 | Fotos/artes dos prêmios e da Casulo Indie |
| Screenshots/processo | 9 | Mathias Shooter (3), Feed The Cats (3), Seasoned Wings (3: flauta, MIDI) |
| PDFs | 5 | Currículo, One Pages (Eco, Midnight Meow, Asas Temperadas), GDD Alimente os Gatos |
| Outras | 3 | Capa do cover "Traitor", duas capas antigas com o avatar ilustrado |

Imagens externas (imgur): banner `NboJ6VK.png` e foto `jSD9c9g.jpeg`.

## Estratégia proposta para o GitHub Pages

| Tipo de mídia | Hoje | Proposta | Motivo |
| --- | --- | --- | --- |
| Trilhas completas | SoundCloud embed | **Manter embed do SoundCloud** (playlist por projeto), carregado só ao clicar (fachada leve) | Contagem de plays, ela já mantém lá, sem custo de banda |
| SFX curtos e vozes | Anexos WAV do Notion | **Hospedar no site**, convertidos para **Opus/OGG + MP3** (fallback), com player próprio leve | Escuta instantânea em grade, sem iframes; WAVs pesam até 3 MB, convertidos ficam com ~50–150 KB |
| Áudios do Drive | Iframes do Drive | **Baixar e hospedar** como acima | O player do Drive é pesado, lento e às vezes pede login |
| Reel, teasers, pitches | YouTube | **YouTube com fachada** (thumbnail + play; `youtube-nocookie.com`) | Zero JS do YouTube até o clique |
| Vídeos de foley | Drive | Curto prazo: iframe `drive.google.com/file/d/ID/preview` sob demanda. **Recomendado:** subir no YouTube (Shorts) ou converter para MP4/WebM curtos e hospedar | Drive não é feito para streaming; risco de quota e de mudar permissão |
| Capas e screenshots | Notion | Otimizar no build (AVIF/WebP, tamanhos responsivos) | Performance |
| One Pages / GDD / CV | Anexos do Notion | Servir como PDF estático em `/docs/` e `/cv/` | Links permanentes |

Limites do GitHub Pages a respeitar: repositório ≤ 1 GB recomendado, arquivo ≤ 100 MB, site publicado ≤ 1 GB, banda ~100 GB/mês (soft). Com áudio convertido, o acervo estimado fica abaixo de 30 MB.

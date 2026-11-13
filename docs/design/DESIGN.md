# DESIGN.md — Design system do site

Fonte única de verdade visual. Valores implementados em `src/styles/tokens.css` como CSS variables e expostos ao Tailwind v4 via `@theme`. **Nenhuma cor, fonte ou raio fora destes tokens.** Base: análise em [identidade-visual.md](identidade-visual.md).

## Identidade

Herdada do banner do Notion e do currículo dela (Canva, nov/2026): **gradiente índigo → roxo → magenta**, **rosa-choque `#F80070`**, títulos em **Anton** caixa alta, texto técnico em **JetBrains Mono**. Tema **escuro único** na v1.

Personalidade: "estúdio de áudio com energia de game jam". Elementos de interface de software (alças de seleção, linhas tracejadas, formas de onda) + gestos de pincel. Os gatos e o avatar ilustrado da identidade antiga aparecem só em pontos de personalidade (404, rodapé) **(confirmar)**.

## Cores

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-bg` | `#140A40` | Fundo da página (índigo mais profundo do banner) |
| `--color-surface` | `#1D0F5A` | Seções alternadas |
| `--color-card` | `#24145F` | Cards, players, badges |
| `--color-card-hover` | `#29176A` | Hover de cards (o mais claro que ainda mantém `accent-text` em AA) |
| `--color-border` | `#3A2A85` | Bordas finas (1 px), linhas tracejadas |
| `--color-text` | `#FFFFFF` | Texto principal |
| `--color-text-muted` | `#B8AEE0` | Texto secundário, metadados |
| `--color-text-faint` | `#6E62A8` | **Só decorativo** (numeração, ornamentos) |
| `--color-accent` | `#F80070` | Rosa-choque da marca: títulos de destaque, botão primário, pinceladas, forma de onda tocada, foco |
| `--color-accent-text` | `#FF4D9A` | Rosa para **texto pequeno** e links dentro de `surface`/`card` |
| `--color-accent-hover` | `#FF2E86` | Hover do botão primário |
| `--color-on-accent` | `#140A40` | Texto sobre fundo rosa (obrigatório) |
| `--color-indigo` | `#482AA1` | Meio do gradiente, forma de onda não tocada |
| `--color-purple` | `#971A92` | Gradiente |
| `--color-magenta` | `#9C096D` | Gradiente |

Gradiente da marca (hero, OG, faixas de seção):

```css
--gradient-brand: linear-gradient(120deg, #F80070 0%, #482AA1 38%, #1D0F5A 55%, #971A92 80%, #DA0677 100%);
```

Sobre o gradiente, texto sempre branco e grande (ou dentro de uma placa `bg`/`card`).

Fundo da página (pedido da Juliana, 13/nov/2026, a partir do banner): `--color-page-pink` `#FF0072` no canto inferior esquerdo e no superior direito, `--color-page-night` `#180B52` no meio.

```css
--gradient-page: linear-gradient(to top right, #FF0072 0%, #180B52 30%, #180B52 70%, #FF0072 100%);
```

- Fica numa camada fixa (`body::before`), então cada tela mostra a composição do banner durante a rolagem.
- A faixa escura vai de 30% a 70% para manter legíveis os textos rosa e cinza; com a transição até 50%, o rosa cobria um terço da tela.
- Cabeçalho e rodapé têm placa `bg/85`, porque ficam sempre sobre os cantos rosa.
- O "Acunha" do hero usa `accent` (o mesmo rosa dos botões), não `accent-text`.

### Contrastes verificados (WCAG 2.2)

| Combinação | Razão | Resultado |
| --- | --- | --- |
| `text` sobre `bg` | 18,3:1 | AAA |
| `text` sobre `card` | 15,7:1 | AAA |
| `text-muted` sobre `bg` | 8,9:1 | AAA |
| `text-muted` sobre `card` | 7,6:1 | AAA |
| `text-muted` sobre `card-hover` | 7,1:1 | AAA |
| `accent-text` sobre `card-hover` | 4,8:1 | AA |
| `accent` sobre `bg` | 4,55:1 | AA (texto de qualquer tamanho) |
| `accent` sobre `surface` | 4,12:1 | Só texto grande / gráficos |
| `accent` sobre `card` | 3,9:1 | Só texto grande / gráficos |
| `accent-text` sobre `bg` / `surface` / `card` | 5,9 / 5,4 / 5,1:1 | AA |
| `on-accent` sobre `accent` | 4,55:1 | AA |
| `on-accent` sobre `accent-hover` | 5,2:1 | AA |
| Branco sobre `accent` | 4,0:1 | **Proibido** para texto normal; permitido só ≥ 24 px |
| `text-faint` sobre `bg` | 3,5:1 | **Reprova para texto** — só decoração |

Regra prática: dentro de cards e seções `surface`, links e rótulos rosa usam `accent-text`; no fundo `bg`, pode usar `accent`.

## Tipografia

| Token | Fonte | Uso |
| --- | --- | --- |
| `--font-display` | Anton (400) | Nome, títulos de seção e de projeto, sempre caixa alta, `letter-spacing: 0.01em` |
| `--font-mono` | JetBrains Mono (400, 700) | Rótulos, metadados (engine, papel, duração, tonalidade), tags, players, navegação |
| `--font-sans` | Source Sans 3 (400, 600, 700) | Parágrafos longos (intenção sonora, sinopses). Está no PDF dela e lê melhor que mono em blocos |

Self-host via Fontsource (`@fontsource/anton`, `@fontsource-variable/jetbrains-mono`, `@fontsource-variable/source-sans-3`), `font-display: swap`, preload só de Anton e do peso mono usados acima da dobra.

Escala fluida: `--text-xs` 0,75rem · `--text-sm` 0,875rem · `--text-base` 1rem · `--text-lg` 1,125rem · `--text-xl` 1,25rem · `--text-2xl` 1,5rem · `--text-3xl` clamp(1,75rem, 3vw, 2,5rem) · `--text-display` clamp(3rem, 9vw, 6.5rem).

Comprimento de linha do corpo: 60–72 caracteres (`max-width: 68ch`). Texto corrido herda 1,0625rem com entrelinha 1,6. Nada abaixo de `text-xs` (12 px).

## Espaçamento, raio, sombra

- Espaçamento: escala de 4 px do Tailwind. Seções: `py-24` desktop, `py-16` mobile.
- Raio: `--radius-sm` 4 px (tags), `--radius-md` 8 px (botões, players), `--radius-lg` 14 px (cards). O CV dela é quase todo reto; raios pequenos mantêm o ar "interface".
- Sombra: quase nenhuma. Profundidade por superfície + borda. Brilho rosa só no hover/foco de CTA e no player tocando (`0 0 0 1px accent, 0 0 28px -8px accent`).

## Elementos gráficos

Todos como SVG inline decorativo (`aria-hidden="true"`), redesenhados (não recortados do banner).

| Elemento | Uso |
| --- | --- |
| `Brush` (rabisco de pincel rosa) | Atrás da foto no hero, sob títulos de seção, nos selos de prêmio |
| `Halftone` (retícula de pontos) | Cantos do hero e de cabeçalhos de seção, opacidade baixa |
| `Stripes` (listras horizontais finas) | Pares com a retícula, em `indigo` ou `accent` |
| `SelectionBox` (caixa com alças nos cantos) | Rótulo "Game Audio & Sound Design" no hero, filtros ativos, foco do card tocando |
| `DashedTimeline` (linha tracejada vertical com nós circulares rosa) | Experiência e formação, como no CV |
| `brand-rule` (filete de 2 px no gradiente da marca) | Topo e base das faixas de destaque (selos do hero, sound board) |
| Barra de progresso ("agulha" da timeline) | Base do cabeçalho, cresce com a rolagem da página |
| `Waveform` | Players: barras verticais com picos reais do arquivo; parte tocada em `accent`, resto em `indigo` |

## Movimento

- Durações: 150–250 ms (hover), 700 ms (entrada do hero, escalonada de 80 em 80 ms via `--d`), 900 ms (foto do hero).
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (`--ease-out-soft`).
- Assinatura: **equalizador** no botão do som que está tocando, com um anel pulsando em volta. Pinceladas sob os títulos são "desenhadas" quando o título entra na tela.
- Ao rolar: `.reveal` (sobe e aparece) em títulos, cards e blocos; barra de progresso no cabeçalho com `animation-timeline: scroll(root)`.
- Tudo em CSS; o JS é só do player, filtros e "mostrar todos". Estados animados dentro de `@media (prefers-reduced-motion: no-preference)`; animações ligadas à rolagem só dentro de `@supports`.
- Não use `.reveal` e `.card-lift` no mesmo elemento: a animação fixa `transform` e anula o hover. Ponha `.reveal` no pai.
- `animation-timeline: scroll()` vai por variável CSS: o minificador funde o valor no shorthand `animation`, que o navegador descarta.

## Componentes (`src/components/`)

| Componente | Pasta | Notas |
| --- | --- | --- |
| `Button` | `ui/` | `primary` (fundo `accent`, texto `on-accent`, mono bold caixa alta), `ghost` (borda `border`, texto `text`), `link`. Foco: anel `accent` 2 px com offset |
| `Tag` | `ui/` | Mono `text-xs`, fundo `card`, borda `border`. Para engine/plataforma |
| `DeliverableTag` | `ui/` | Entrega dela (Trilha, SFX, Voz, Curadoria, Implementação…): borda e texto `accent-text`, ícone pequeno |
| `AwardBadge` | `ui/` | Selo com pincelada atrás, troféu, "Best Audio · GameJam Plus 2026/27". Variante compacta para cards |
| `SectionHeading` | `ui/` | Anton caixa alta + pincelada rosa sob a palavra-chave + numeração mono decorativa (`01 //`) |
| `YouTubeFacade`, `SoundCloudFacade`, `DriveFacade` | `ui/` | Thumbnail/capa + botão; troca por iframe no clique. Sem JS: link para o serviço |
| `AudioPlayer` | `islands/` | Play/pause, `Waveform`, tempo, nome e projeto. Gerencia "um som por vez" via evento global. Sem JS: `<audio controls>` |
| `SfxCard` | `sections/` | `AudioPlayer` compacto + categoria + projeto; alvo ≥ 44 px |
| `ProjectCard` | `sections/` | Capa, título Anton, gancho, `DeliverableTag`s, `AwardBadge`, play direto opcional |
| `SoundNote` | `sections/` | Bloco de "intenção sonora": ícone de fone, texto em `--font-sans` grande, borda esquerda `accent` |
| `StemSequence` | `sections/` | Lista numerada de stems (Midnight Meow), cada um com `AudioPlayer` |
| `Timeline` | `sections/` | Experiência e formação sobre `DashedTimeline` |
| `ToolGrid` | `sections/` | Ferramentas por grupo, ícone + nome |

## Proibições

- Cores hex/rgb fora de `tokens.css`.
- Texto branco sobre rosa abaixo de 24 px; rosa `accent` para texto pequeno dentro de `card`/`surface`.
- Autoplay de áudio ou vídeo com som.
- Iframes de terceiros no carregamento inicial.
- Barras de "nível" em porcentagem para ferramentas ou idiomas (o CV dela tem uma barra de inglês; no site, usar "Avançado · EF SET C1").
- Fontes por CDN do Google Fonts.
- Light mode na v1.

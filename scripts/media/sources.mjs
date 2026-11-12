// Curadoria da mídia: id usado no conteúdo → arquivo de origem.
// Origens procuradas, nesta ordem: media-src/, .scratch/assets/ (anexos do Notion), .scratch/drive/ (Google Drive).
// O nome do arquivo de origem é casado pelo final (os downloads têm prefixo de id).

export const audio = {
  'purr-anormal': {
    'pudim-passos-areia': 'pudim_passos_areia.wav',
    'pudim-passos-madeira': 'pudim_passos_madeira.wav',
    'pessego-confusa': 'pessego_confusa.wav',
    'pessego-feliz': 'pessego_feliz.wav',
    'pessego-normal': 'pessego_normal.wav',
    'pessego-triste': 'pessego_triste.wav',
    'pera-brava': 'pera_brava.wav',
    'pera-coringando': 'pera_coringando.wav',
    'pera-feliz': 'pera_feliz.wav',
    'pera-normal': 'pera_normal.wav',
    'pera-risada-malefica': 'pera_risada_malefica.wav',
  },
  'hands-off-my-grimoire': {
    'comeco-wave-1': 'comeco_wave_1.wav',
    'comeco-wave-2': 'comeco_wave_2.wav',
    'comeco-wave-3': 'comeco_wave_3.wav',
    'fim-wave': 'fim_wave.wav',
    'hover-torre': 'hover_torre.wav',
    'posicionar-torre': 'posicionar_torre.wav',
    'selecao-torre': 'selecao_torre.wav',
    'livro-dano': 'livro_dano.wav',
  },
  'molten-metal': {
    hover: 'hover.wav',
    'letras-aparecendo': 'letras_aparecendo.wav',
    martelada: 'martelada.wav',
    'martelada-1': 'martelada_1.wav',
    'martelada-2': 'martelada_2.wav',
    'martelada-perfect': 'martelada_perfect.wav',
    'papel-livro': 'papel_livro.wav',
    contagem: '3_2_1.wav',
    'click-botao': 'click_botao.wav',
    'acabou-tempo': 'acabou_tempo.wav',
    derrota: 'derrota.wav',
    'forjar-e-martelar': 'forjar_e_martelar.wav',
    'tempo-quase-acabando': 'tempo_quase_acabando.wav',
    'click-forjar': 'click_forjar.wav',
    erro: 'erro.wav',
    'proximo-cliente': 'proximo_cliente.wav',
    'vitoria-tinindo': 'vitoria_tinindo.wav',
  },
  servos: {
    'main-soundtrack': '__main_soundtrack.wav',
  },
  'seasoned-wings': {
    'tema-medieval': 'medieval ju e luiz - 19_03_2025 21.37.wav',
    'narrativa-sonora': 'Narrativa Sonora.mp3',
    'comida-pronta': 'comida_pronta.mp3',
  },
  'midnight-meow': {
    'main-nixie': 'mainsoundtrack nixie.wav',
    'stem-01-batida': '1 - Batida.wav',
    'stem-02-transicao': '2 - Transicao.wav',
    'stem-04-transicao-metade': '4 - Transicao Metade.wav',
    'stem-05-tensao-media': '5 - Tensao Media.wav',
    'stem-06-transicao-130': '6 - Transicao 130bpm.wav',
    'stem-08-transicao-130': '8 - Transicao 130bpm.wav',
    'stem-10-batida': '10 - Batida.wav',
    menu: '__menu.wav',
    credits: 'credits.wav',
    'game-over': 'game over.wav',
  },
  'mathias-shooter': {
    soundtrack: 'soundtrack mathias.wav',
    pulo: '-pulo.wav',
    'vida-maxima': 'vida_maxima.wav',
  },
  eco: {
    menu: '__menu.mp3',
    gameplay: 'gameplay.mp3',
    clique: 'clique.wav',
    'porta-abrindo': 'Porta_Abrindp.mp3',
  },
  'feed-the-cats': {
    'tiro-tenis': 'tiro_tenis.mp3',
    'sem-municao': 'sem_municao2.mp3',
    'pego-whispas': 'pego_whispas.mp3',
    miauzinho: 'miauzinho.mp3',
    meow: '-meow.mp3',
  },
};

export const video = {
  foley: {
    incenso: 'quebrando incenso.mp4',
    desodorante: 'desodorante.mp4',
    papel: 'rasgando papel.mp4',
    'guarda-chuva': 'Guarda chuva.mp4',
  },
  'purr-anormal': {
    'passos-pudim': 'fazendo passos pudim.mp4',
    miados: 'miados purranomral.mp4',
  },
  'hands-off-my-grimoire': {
    'passos-goblin': 'Processo Passos Goblin.mp4',
    'passos-grama': 'deo passos grama.mp4',
  },
};

export const youtube = [
  'JByBcjKhWck',
  'CnpQeGkTy4o',
  'pNarBwwvbPE',
  '-G5KOAxw3FQ',
  'xuEVauS7qNk',
  '7IGP5ZjzBkA',
  'GQc1UGaeSFs',
  'IrkcDvWowxE',
  'WoSfrz-lvjg',
  'n8RU80fHyfY',
  '0FfBJQdFeB4',
];

// Imagens: destino em src/assets/ → arquivo de origem.
export const images = {
  'brand/foto.jpeg': 'foto-jSD9c9g.jpeg',
  // Recortados da capa antiga do Notion (Background_Notion_(5).png, 3000×2000) com ffmpeg:
  // crop=368:650:1967:810 e crop=260:150:1360:970, ambos com colorkey=0xF4F4F4:0.025:0.03.
  'brand/avatar.png': 'avatar.png',
  'brand/gatos.png': 'gatos.png',
  'projects/purr-anormal/cover.jpeg': 'purr_anormal.jpeg',
  'projects/hands-off-my-grimoire/cover.png': 'HOFMG.png',
  'projects/molten-metal/cover.png': 'Molten_Metal_-_Pitch.png',
  'projects/servos/cover.png': 'Servos_capa.png',
  'projects/seasoned-wings/cover.png': '-Capa.png',
  'projects/seasoned-wings/flauta.png': 'e4d35207-bfdd-4b53-92de-7479993d4089.png',
  'projects/seasoned-wings/midi.png': 'b6e311c3-502c-43c7-ad0e-390e1e9dd72c.png',
  'projects/seasoned-wings/flauta-gravacao.png': '0cd00dc8-706d-40d6-ac70-d1bd61d398e2.png',
  'projects/midnight-meow/cover.png': 'midnight_capa.png',
  'projects/mathias-shooter/cover.png': 'mathias_shooter.png',
  'projects/mathias-shooter/shot-1.png': 'image_2.png',
  'projects/mathias-shooter/shot-2.png': '-image.png',
  'projects/mathias-shooter/shot-3.png': 'image_5.png',
  'projects/eco/cover.jpg': 'eco_0.jpg',
  'projects/feed-the-cats/cover.jpg': 'f2d7d106-print_3.jpg',
  'projects/feed-the-cats/shot-1.jpg': 'print_1.jpg',
  'projects/feed-the-cats/shot-2.jpg': 'print_2.jpg',
  'awards/segundo-lugar.jpg': 'segundo_lugar.jpg',
  'awards/melhor-audio.jpg': 'audio.jpg',
  'awards/melhor-pitch-2627.jpg': 'Pitch.jpg',
  'awards/melhor-pitch-2526.jpg': 'pitch.jfif',
  // Capas públicas das páginas do itch.io, salvas em media-src/.
  'projects/4seasons/cover.png': 'itch-4seasons.png',
  'projects/petalas-ao-vento/cover.png': 'itch-petalas-ao-vento.png',
  'projects/the-symphonys-awakening/cover.png': 'itch-the-symphonys-awakening.png',
};

// Documentos: destino em public/ → arquivo de origem.
export const docs = {
  'cv/juliana-acunha.pdf': 'Resume_Juliana_Acunha.pdf',
  'docs/eco-one-page.pdf': 'One_Page_-_Eco.pdf',
  'docs/midnight-meow-one-page.pdf': 'One_Page_-_Midnight_Meow.pdf',
  'docs/seasoned-wings-one-page.pdf': 'One_Page_-_Asas_Temperadas_Receitas_Mgicas.pdf',
  'docs/feed-the-cats-gdd.pdf': 'Alimente_os_Gatos_GDD.pdf',
};

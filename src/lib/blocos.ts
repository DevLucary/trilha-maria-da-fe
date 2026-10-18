import type { TipoBloco } from '../data/tipos'

/** Nome e descrição de cada tipo de bloco, na ordem em que aparecem no estado vazio. */
export const descricaoDosBlocos: { tipo: TipoBloco; nome: string; descricao: string }[] = [
  { tipo: 'texto', nome: 'Texto', descricao: 'Título e parágrafos' },
  { tipo: 'galeria', nome: 'Imagem ou galeria', descricao: 'Fotos com legenda' },
  { tipo: 'cards', nome: 'Cards que viram', descricao: 'Pergunta ou imagem na frente, curiosidade no verso' },
  { tipo: 'linhaDoTempo', nome: 'Linha do tempo', descricao: 'Acontecimentos em sequência' },
  { tipo: 'quiz', nome: 'Quiz rápido', descricao: '2 ou 3 perguntas com resposta na hora' },
  { tipo: 'depoimento', nome: 'Depoimento', descricao: 'Fala de alguém, com nome e foto opcional' },
  { tipo: 'midia', nome: 'Áudio ou vídeo', descricao: 'Gravação incorporada (opcional)' },
]

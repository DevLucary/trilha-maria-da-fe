import type { Estacao, Trilha } from './tipos'

// Todo o conteúdo do site fica neste arquivo.
// Os textos abaixo são PROVISÓRIOS: servem só para ver o layout funcionando.
// Fotos sem "src" aparecem como blocos coloridos com o texto alternativo.
// Quantidades são livres: dá para ter 3 ou 30 fotos, cards ou estações.

// Estações provisórias, geradas para não repetir o mesmo texto 8 vezes.
// Quando o conteúdo real chegar, troque por uma lista escrita à mão.
const estacoesProvisorias: Estacao[] = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1
  return {
    titulo: `Título da estação ${n}`,
    miniatura: { alt: `Miniatura da estação ${n} (a definir)` },
    descricao: `Texto de exemplo: aqui entra a descrição da estação ${n}.`,
    foto: { alt: `Foto da estação ${n} (a definir)` },
    legenda: `Legenda de exemplo da foto da estação ${n}.`,
  }
})

export const trilha: Trilha = {
  nome: {
    primeiraLinha: 'Trilha multicultural de',
    destaque: 'Maria da Fé',
  },
  escola: 'Escola Estadual Nossa Senhora de Lourdes',

  abas: {
    inicio: 'Página inicial',
    roadmap: 'Roadmap',
  },

  carrossel: [
    { alt: 'Foto 1 do carrossel (a definir)' },
    { alt: 'Foto 2 do carrossel (a definir)' },
    { alt: 'Foto 3 do carrossel (a definir)' },
    { alt: 'Foto 4 do carrossel (a definir)' },
  ],

  inicio: {
    frase: 'Feira multicultural da Escola Estadual Nossa Senhora de Lourdes',
    informacoes: {
      titulo: 'Informações da feira',
      itens: [
        { rotulo: 'Data', valor: '[data]' },
        { rotulo: 'Horário', valor: '[horário]' },
        { rotulo: 'Local', valor: '[local]' },
        { rotulo: 'Entrada', valor: '[entrada]' },
      ],
    },
    multiculturalismo: {
      titulo: 'O que é multiculturalismo?',
      paragrafos: [
        'Texto de exemplo: aqui entra a explicação sobre o que é multiculturalismo, escrita pelos alunos.',
        'Texto de exemplo: um segundo parágrafo, se precisar.',
      ],
    },
    naCidade: {
      titulo: 'Multiculturalismo em Maria da Fé',
      cards: [1, 2, 3, 4].map((n) => ({
        titulo: `Título do card ${n}`,
        texto: `Texto de exemplo do card ${n}.`,
        foto: { alt: `Foto do card ${n} (a definir)` },
      })),
    },
  },

  roadmap: {
    titulo: 'Roadmap',
    instrucao: 'Toque na seta de cada estação para ver a descrição.',
    estacoes: estacoesProvisorias,
  },

  contato: {
    titulo: 'Contato',
    endereco: 'Rua Exemplo, 000 – Bairro Exemplo',
    telefone: '(00) 0000-0000',
    email: 'contato@example.com',
    ficticio: true,
  },

  // Paradas das etapas anteriores. Não aparecem no layout atual (ver LAYOUT.md).
  paradas: [
    { id: 'parada-1', titulo: 'Parada 1', blocos: [] },
    { id: 'parada-2', titulo: 'Parada 2', blocos: [] },
    { id: 'parada-3', titulo: 'Parada 3', blocos: [] },
    { id: 'parada-4', titulo: 'Parada 4', blocos: [] },
    { id: 'parada-5', titulo: 'Parada 5', blocos: [] },
    { id: 'parada-6', titulo: 'Parada 6', blocos: [] },
    { id: 'parada-7', titulo: 'Parada 7', blocos: [] },
    { id: 'parada-8', titulo: 'Parada 8', blocos: [] },
  ],
}

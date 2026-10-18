import type { Trilha } from './tipos'

// Todo o conteúdo da trilha fica neste arquivo.
// Para adicionar, remover ou reordenar paradas, edite só a lista "paradas":
// os componentes se ajustam sozinhos.
// Uma parada com "blocos: []" aparece no site como modelo vazio.
export const trilha: Trilha = {
  nome: {
    primeiraLinha: 'Trilha multicultural de',
    destaque: 'Maria da Fé',
  },
  escola: 'Escola Estadual Nossa Senhora de Lourdes',
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

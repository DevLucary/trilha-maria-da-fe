// Guarda o sentido da última rolagem da página: 1 = para baixo, -1 = para cima.
// Um único ouvinte para a página toda, ligado na primeira consulta.

let direcao: 1 | -1 = 1
let ultimaPosicao = 0
let ligado = false

function aoRolar() {
  const posicao = window.scrollY
  if (posicao !== ultimaPosicao) {
    direcao = posicao > ultimaPosicao ? 1 : -1
    ultimaPosicao = posicao
  }
}

export function direcaoDaRolagem() {
  if (!ligado) {
    ligado = true
    ultimaPosicao = window.scrollY
    window.addEventListener('scroll', aoRolar, { passive: true })
  }
  return direcao
}

/** "1 grupo", "3 grupos". A quantidade sempre sai do tamanho da lista do arquivo de dados. */
export function quantidadeDeGrupos(quantidade: number) {
  return quantidade === 1 ? '1 grupo' : `${quantidade} grupos`
}

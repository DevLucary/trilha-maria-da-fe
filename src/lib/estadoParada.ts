import type { Parada } from '../data/tipos'

export type EstadoParada = 'concluida' | 'atual' | 'futura'

/** A parada atual é a primeira que ainda não foi concluída. */
export function idDaParadaAtual(paradas: Parada[], concluidas: Set<string>) {
  return paradas.find((parada) => !concluidas.has(parada.id))?.id
}

export function estadoDaParada(
  parada: Parada,
  concluidas: Set<string>,
  idAtual: string | undefined,
): EstadoParada {
  if (concluidas.has(parada.id)) return 'concluida'
  if (parada.id === idAtual) return 'atual'
  return 'futura'
}

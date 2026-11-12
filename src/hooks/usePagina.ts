import { useEffect, useState } from 'react'

export type Pagina = 'inicio' | 'roadmap'

/** Rota atual do site. A sala guarda o número que aparece no endereço (#/sala/N). */
export type Rota = { pagina: 'inicio' } | { pagina: 'roadmap' } | { pagina: 'sala'; numero: number }

/** Endereço (hash) de cada página. O "#/" evita conflito com âncoras comuns. */
export const enderecoDaPagina: Record<Pagina, string> = {
  inicio: '#/',
  roadmap: '#/roadmap',
}

export function enderecoDaSala(numero: number) {
  return `#/sala/${numero}`
}

/** Texto curto que identifica a rota (usado para saber quando ela mudou). */
export function chaveDaRota(rota: Rota) {
  return rota.pagina === 'sala' ? `sala/${rota.numero}` : rota.pagina
}

// Lê o endereço. Sala inexistente (#/sala/99) ou sem número (#/sala) volta para o roadmap,
// e o endereço é corrigido para não ficar uma rota quebrada no histórico.
function interpretar(hash: string, totalDeSalas: number): { rota: Rota; enderecoCorreto?: string } {
  if (hash === enderecoDaPagina.roadmap) return { rota: { pagina: 'roadmap' } }

  if (hash === '#/sala' || hash.startsWith('#/sala/')) {
    const numero = Number(/^#\/sala\/(\d+)$/.exec(hash)?.[1])
    if (Number.isInteger(numero) && numero >= 1 && numero <= totalDeSalas) {
      return { rota: { pagina: 'sala', numero } }
    }
    return { rota: { pagina: 'roadmap' }, enderecoCorreto: enderecoDaPagina.roadmap }
  }

  return { rota: { pagina: 'inicio' } }
}

function corrigirEndereco(totalDeSalas: number) {
  const { enderecoCorreto } = interpretar(window.location.hash, totalDeSalas)
  // replaceState troca o endereço sem criar uma entrada nova no histórico
  if (enderecoCorreto) window.history.replaceState(null, '', enderecoCorreto)
}

// Navegação sem biblioteca de rotas: a página atual vem do endereço,
// então o botão "voltar" do celular funciona e cada sala tem link próprio.
export function useRota(totalDeSalas: number) {
  const [rota, setRota] = useState<Rota>(() => interpretar(window.location.hash, totalDeSalas).rota)

  useEffect(() => {
    corrigirEndereco(totalDeSalas)
    const aoMudarEndereco = () => {
      corrigirEndereco(totalDeSalas)
      setRota(interpretar(window.location.hash, totalDeSalas).rota)
    }
    window.addEventListener('hashchange', aoMudarEndereco)
    return () => window.removeEventListener('hashchange', aoMudarEndereco)
  }, [totalDeSalas])

  return rota
}

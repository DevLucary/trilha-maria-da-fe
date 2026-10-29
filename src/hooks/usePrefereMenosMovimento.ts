import { useSyncExternalStore } from 'react'

const consulta = '(prefers-reduced-motion: reduce)'

function inscrever(aoMudar: () => void) {
  const midia = window.matchMedia(consulta)
  midia.addEventListener('change', aoMudar)
  return () => midia.removeEventListener('change', aoMudar)
}

// true quando o aparelho pede "reduzir movimento".
// Acompanha a mudança na hora, mesmo com o site já aberto.
export function usePrefereMenosMovimento() {
  return useSyncExternalStore(inscrever, () => window.matchMedia(consulta).matches)
}

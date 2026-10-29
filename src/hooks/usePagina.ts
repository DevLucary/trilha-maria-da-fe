import { useEffect, useState } from 'react'

export type Pagina = 'inicio' | 'roadmap'

/** Endereço (hash) de cada página. O "#/" evita conflito com âncoras comuns. */
export const enderecoDaPagina: Record<Pagina, string> = {
  inicio: '#/',
  roadmap: '#/roadmap',
}

function lerPagina(): Pagina {
  return window.location.hash === enderecoDaPagina.roadmap ? 'roadmap' : 'inicio'
}

// Navegação entre as duas páginas sem biblioteca de rotas:
// a página atual vem do endereço, então o botão "voltar" do celular funciona.
export function usePagina() {
  const [pagina, setPagina] = useState<Pagina>(lerPagina)

  useEffect(() => {
    const aoMudarEndereco = () => setPagina(lerPagina())
    window.addEventListener('hashchange', aoMudarEndereco)
    return () => window.removeEventListener('hashchange', aoMudarEndereco)
  }, [])

  return pagina
}

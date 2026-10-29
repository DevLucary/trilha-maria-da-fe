import { useLayoutEffect, useRef } from 'react'
import { Abas } from './components/layout/Abas'
import { Carrossel } from './components/layout/Carrossel'
import { Rodape } from './components/layout/Rodape'
import { PaginaInicial } from './components/paginas/PaginaInicial'
import { PaginaRoadmap } from './components/paginas/PaginaRoadmap'
import { trilha } from './data/trilha'
import { usePagina } from './hooks/usePagina'

const nomeDoSite = `${trilha.nome.primeiraLinha} ${trilha.nome.destaque}`

function App() {
  const pagina = usePagina()
  const paginaAnterior = useRef(pagina)

  // Ao trocar de aba: título da aba do navegador, volta ao topo e foco no título da página
  // (assim leitores de tela anunciam a página nova). É layout effect para voltar ao topo
  // antes da primeira pintura da página nova.
  useLayoutEffect(() => {
    document.title = pagina === 'roadmap' ? `${trilha.abas.roadmap} · ${nomeDoSite}` : nomeDoSite
    if (paginaAnterior.current === pagina) return
    paginaAnterior.current = pagina
    window.scrollTo(0, 0)
    document.getElementById('titulo-pagina')?.focus({ preventScroll: true })
  }, [pagina])

  return (
    <>
      <Abas atual={pagina} rotulos={trilha.abas} />
      <main>
        <Carrossel fotos={trilha.carrossel} />
        {pagina === 'inicio' ? (
          <PaginaInicial nome={trilha.nome} conteudo={trilha.inicio} />
        ) : (
          <PaginaRoadmap conteudo={trilha.roadmap} />
        )}
      </main>
      <Rodape contato={trilha.contato} />
    </>
  )
}

export default App

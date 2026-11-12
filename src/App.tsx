import { useLayoutEffect, useRef } from 'react'
import { Abas } from './components/layout/Abas'
import { Carrossel } from './components/layout/Carrossel'
import { Rodape } from './components/layout/Rodape'
import { PaginaInicial } from './components/paginas/PaginaInicial'
import { PaginaRoadmap } from './components/paginas/PaginaRoadmap'
import { PaginaSala } from './components/paginas/PaginaSala'
import { trilha } from './data/trilha'
import { chaveDaRota, useRota } from './hooks/usePagina'

const nomeDoSite = `${trilha.nome.primeiraLinha} ${trilha.nome.destaque}`
const salas = trilha.roadmap.salas

function App() {
  const rota = useRota(salas.length)
  const chave = chaveDaRota(rota)
  const chaveAnterior = useRef(chave)
  const sala = rota.pagina === 'sala' ? salas[rota.numero - 1] : undefined

  // Ao trocar de rota: título da aba do navegador, volta ao topo e foco no título da página
  // (assim leitores de tela anunciam a página nova). É layout effect para voltar ao topo
  // antes da primeira pintura da página nova.
  useLayoutEffect(() => {
    if (rota.pagina === 'sala' && sala) {
      document.title = `Sala ${rota.numero} · ${sala.titulo} · ${nomeDoSite}`
    } else {
      document.title = rota.pagina === 'roadmap' ? `${trilha.abas.roadmap} · ${nomeDoSite}` : nomeDoSite
    }
    if (chaveAnterior.current === chave) return
    chaveAnterior.current = chave
    window.scrollTo(0, 0)
    document.getElementById('titulo-pagina')?.focus({ preventScroll: true })
  }, [chave, rota, sala])

  // A página da sala tem só o link de voltar, a faixa da sala e os grupos.
  if (rota.pagina === 'sala' && sala) {
    return (
      <main>
        <PaginaSala sala={sala} numero={rota.numero} />
      </main>
    )
  }

  const pagina = rota.pagina === 'roadmap' ? 'roadmap' : 'inicio'

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

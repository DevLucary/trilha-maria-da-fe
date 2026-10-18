import { Cabecalho } from './components/trilha/Cabecalho'
import { Trilha } from './components/trilha/Trilha'
import { trilha } from './data/trilha'

function App() {
  return (
    <>
      <Cabecalho nome={trilha.nome} escola={trilha.escola} />
      <Trilha paradas={trilha.paradas} />
    </>
  )
}

export default App

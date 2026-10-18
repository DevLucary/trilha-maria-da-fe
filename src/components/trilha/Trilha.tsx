import { useState } from 'react'
import type { Parada } from '../../data/tipos'
import { estadoDaParada, idDaParadaAtual } from '../../lib/estadoParada'
import { ParadaItem } from './ParadaItem'

type Props = {
  paradas: Parada[]
}

// Por enquanto nenhuma parada está concluída; o progresso salvo entra na Etapa 5.
const concluidas = new Set<string>()

// Lista vertical de paradas ligadas pela linha da trilha, terminando no marco "Fim da trilha".
export function Trilha({ paradas }: Props) {
  const [idAberta, setIdAberta] = useState<string | null>(null)
  const idAtual = idDaParadaAtual(paradas, concluidas)

  function alternar(id: string) {
    setIdAberta((aberta) => (aberta === id ? null : id))
  }

  return (
    <main className="mx-auto max-w-xl px-4 pb-12 pt-8">
      <ol aria-label="Paradas da trilha">
        {paradas.map((parada, indice) => (
          <ParadaItem
            key={parada.id}
            parada={parada}
            numero={indice + 1}
            estado={estadoDaParada(parada, concluidas, idAtual)}
            aberta={idAberta === parada.id}
            aoAlternar={() => alternar(parada.id)}
          />
        ))}
      </ol>

      <div className="grid grid-cols-[3.5rem_1fr] items-center gap-x-3.5">
        <span
          aria-hidden="true"
          className="grid h-11 w-14 place-items-center rounded border-2 border-marrom-portao bg-creme font-titulo text-sm font-black uppercase [font-stretch:115%]"
        >
          Fim
        </span>
        <p className="font-bold">Fim da trilha</p>
      </div>
    </main>
  )
}

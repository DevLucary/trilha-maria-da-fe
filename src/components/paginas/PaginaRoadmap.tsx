import { useState } from 'react'
import type { Trilha } from '../../data/tipos'
import { TituloPagina } from '../layout/TituloPagina'
import { EstacaoItem } from '../roadmap/EstacaoItem'
import { GrupoRevelar, Revelar } from '../Revelar'

type Props = {
  conteudo: Trilha['roadmap']
}

export function PaginaRoadmap({ conteudo }: Props) {
  // Só uma estação aberta por vez: abrir outra fecha a anterior.
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null)

  return (
    <>
      <TituloPagina destaque={conteudo.titulo}>
        <p className="font-bold">{conteudo.instrucao}</p>
      </TituloPagina>

      <div className="mx-auto max-w-xl px-4 pt-8">
        {/* Cada estação desenha seu trecho de linha (ver EstacaoItem) e entra ao rolar, em sequência */}
        <GrupoRevelar>
          <ol className="grid gap-5">
            {conteudo.estacoes.map((estacao, i) => (
              <EstacaoItem
                key={i}
                estacao={estacao}
                numero={i + 1}
                aberta={indiceAberto === i}
                aoAlternar={() => setIndiceAberto((aberto) => (aberto === i ? null : i))}
              />
            ))}
          </ol>

          {/* "relative" põe o marco por cima do último trecho de linha */}
          <Revelar className="relative mt-5 grid grid-cols-[4.5rem_1fr] items-center gap-x-3">
            <p className="grid h-11 place-items-center rounded-md border-2 border-marrom-portao bg-creme font-titulo text-sm font-black uppercase tracking-[0.08em] [font-stretch:115%]">
              Fim
            </p>
          </Revelar>
        </GrupoRevelar>
      </div>
    </>
  )
}

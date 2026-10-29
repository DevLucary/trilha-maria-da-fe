import { useState } from 'react'
import type { Trilha } from '../../data/tipos'
import { TituloPagina } from '../layout/TituloPagina'
import { EstacaoItem } from '../roadmap/EstacaoItem'

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

      <div className="relative mx-auto max-w-xl px-4 pt-8">
        {/* Linha tracejada que liga as miniaturas, do centro da primeira até o marco "Fim" */}
        <span aria-hidden="true" className="linha-tracejada absolute bottom-[1.375rem] left-[3.125rem] top-[4.25rem] w-1" />

        <ol className="relative grid gap-5">
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

        <div className="relative mt-5 grid grid-cols-[4.5rem_1fr] items-center gap-x-3">
          <p className="grid h-11 place-items-center rounded-md border-2 border-marrom-portao bg-creme font-titulo text-sm font-black uppercase tracking-[0.08em] [font-stretch:115%]">
            Fim
          </p>
        </div>
      </div>
    </>
  )
}

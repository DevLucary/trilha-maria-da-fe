import type { ReactNode } from 'react'

type Props = {
  primeiraLinha?: string
  destaque: string
  /** Texto logo abaixo do muro (frase da feira ou instrução). */
  children: ReactNode
}

// Título de cada página: placa azul sobre a faixa de tijolo, com o muro salmão embaixo.
// O id "titulo-pagina" recebe o foco quando o visitante troca de página.
export function TituloPagina({ primeiraLinha, destaque, children }: Props) {
  return (
    <header>
      <div className="tijolo px-4 pb-6 pt-6">
        <h1
          id="titulo-pagina"
          tabIndex={-1}
          className="placa mx-auto max-w-xl rounded-md bg-azul-placa px-4 pb-5 pt-4 font-titulo uppercase text-branco"
        >
          {primeiraLinha && (
            <span className="mb-2 block text-sm font-bold tracking-[0.12em] [font-stretch:115%]">
              {primeiraLinha}
            </span>
          )}
          <span className="block text-balance text-[clamp(2.25rem,12vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.01em] [font-stretch:125%]">
            {destaque}
          </span>
        </h1>
      </div>
      <div className="h-6 border-b-4 border-marrom-portao bg-salmao" aria-hidden="true" />
      <div className="mx-auto max-w-xl px-4 pt-5">{children}</div>
    </header>
  )
}

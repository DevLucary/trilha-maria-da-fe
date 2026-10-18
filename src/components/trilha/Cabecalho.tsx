import type { Trilha } from '../../data/tipos'

type Props = {
  nome: Trilha['nome']
  escola: string
}

// Topo da página: faixa de tijolo com a placa azul do título e o muro salmão logo abaixo.
export function Cabecalho({ nome, escola }: Props) {
  return (
    <header>
      <div className="tijolo px-4 pb-7 pt-8">
        <h1 className="placa mx-auto max-w-xl rounded-md bg-azul-placa px-4 pb-5 pt-4 font-titulo uppercase text-branco">
          <span className="block text-sm font-bold tracking-[0.12em] [font-stretch:115%]">
            {nome.primeiraLinha}
          </span>
          <span className="mt-2 block text-[clamp(2.75rem,14vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.01em] [font-stretch:125%]">
            {nome.destaque}
          </span>
        </h1>
      </div>
      <div className="h-7 border-b-4 border-marrom-portao bg-salmao" aria-hidden="true" />

      <div className="mx-auto max-w-xl px-4 pt-6">
        <p className="font-bold">Feira multicultural da {escola}</p>
        <p className="mt-1 text-cinza-texto">
          Toque em uma parada para abrir. Você pode visitar as paradas em qualquer ordem.
        </p>
      </div>
    </header>
  )
}

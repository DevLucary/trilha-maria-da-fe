import type { Trilha } from '../../data/tipos'
import { enderecoDaPagina, type Pagina } from '../../hooks/usePagina'

type Props = {
  atual: Pagina
  rotulos: Trilha['abas']
}

const paginas: Pagina[] = ['inicio', 'roadmap']

// Abas fixas no topo. A aba atual vira uma "placa" azul e tem aria-current="page".
export function Abas({ atual, rotulos }: Props) {
  return (
    <nav aria-label="Páginas do site" className="sticky top-0 z-30 border-b-4 border-marrom-portao bg-creme">
      <ul className="mx-auto grid max-w-xl grid-cols-2 gap-2 px-4 py-2">
        {paginas.map((pagina) => {
          const ehAtual = pagina === atual
          return (
            <li key={pagina}>
              <a
                href={enderecoDaPagina[pagina]}
                aria-current={ehAtual ? 'page' : undefined}
                className={`flex min-h-12 items-center justify-center rounded-md px-2 text-center font-titulo text-[0.9375rem] font-extrabold uppercase leading-tight tracking-[0.02em] [font-stretch:100%] ${
                  ehAtual
                    ? 'placa bg-azul-placa text-branco'
                    : 'border-2 border-cinza-pedra text-marrom-portao hover:border-marrom-portao hover:bg-salmao'
                }`}
              >
                {rotulos[pagina]}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

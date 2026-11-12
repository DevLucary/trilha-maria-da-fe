import type { Sala } from '../../data/tipos'
import { enderecoDaPagina } from '../../hooks/usePagina'
import { quantidadeDeGrupos } from '../../lib/grupos'
import { IconeAnterior } from '../Icones'
import { GrupoRevelar } from '../Revelar'
import { CardGrupo } from '../sala/CardGrupo'

type Props = {
  sala: Sala
  numero: number
}

// Página de uma sala (#/sala/N): faixa terracota com o nome da sala e a lista de grupos.
export function PaginaSala({ sala, numero }: Props) {
  const quantidade = sala.grupos.length

  return (
    <>
      <div className="mx-auto max-w-xl px-4">
        <a
          href={enderecoDaPagina.roadmap}
          className="inline-flex min-h-13 items-center gap-2 font-bold text-azul-placa underline-offset-4 hover:underline"
        >
          <IconeAnterior className="size-5 flex-none" />
          Voltar ao roadmap
        </a>
      </div>

      {/* Faixa terracota de largura total. Texto branco sobre terracota: 5,3:1 (WCAG AA) */}
      <header className="bg-terracota text-branco">
        <div className="@container mx-auto grid max-w-xl grid-cols-[minmax(0,1fr)] gap-3 px-4 py-6">
          <p className="justify-self-start rounded border-2 border-branco bg-azul-placa px-3 py-1 font-titulo text-sm font-extrabold uppercase tracking-[0.08em] [font-stretch:112%]">
            Sala {numero}
          </p>
          <h1
            id="titulo-pagina"
            tabIndex={-1}
            className="text-balance break-words font-titulo text-[min(2.25rem,9cqw)] font-extrabold leading-tight [font-stretch:108%]"
          >
            {sala.titulo}
          </h1>
          <p className="break-words">{sala.descricao}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-xl grid-cols-[minmax(0,1fr)] gap-6 px-4 pt-8">
        <section aria-labelledby="titulo-grupos">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-marrom-portao pb-2">
            <h2
              id="titulo-grupos"
              className="font-titulo text-xl font-extrabold uppercase leading-tight text-azul-placa [font-stretch:112%]"
            >
              Grupos da sala
            </h2>
            <p className="font-bold">{quantidadeDeGrupos(quantidade)}</p>
          </div>

          {quantidade === 0 ? (
            <p className="mt-4 rounded-md border-2 border-dashed border-cinza-pedra p-4 font-bold">
              Grupos em preparação
            </p>
          ) : (
            <GrupoRevelar>
              <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4">
                {sala.grupos.map((grupo, i) => (
                  <CardGrupo key={`${i}-${grupo.rotulo}`} grupo={grupo} indice={i} />
                ))}
              </ul>
            </GrupoRevelar>
          )}
        </section>

        <a
          href={enderecoDaPagina.roadmap}
          className="flex min-h-13 items-center justify-center gap-2 rounded-md border-2 border-azul-placa px-4 font-titulo font-extrabold uppercase tracking-[0.04em] text-azul-placa [font-stretch:112%] hover:bg-azul-placa hover:text-branco"
        >
          <IconeAnterior className="size-5 flex-none" />
          Voltar ao roadmap
        </a>
      </div>
    </>
  )
}

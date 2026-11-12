import type { Sala } from '../../data/tipos'
import { enderecoDaSala } from '../../hooks/usePagina'
import { quantidadeDeGrupos } from '../../lib/grupos'
import { IconeProxima, IconeSeta } from '../Icones'
import { FotoOuProvisoria } from '../layout/FotoOuProvisoria'
import { Revelar } from '../Revelar'

type Props = {
  sala: Sala
  numero: number
  aberta: boolean
  aoAlternar: () => void
}

// Uma sala do roadmap: miniatura com selo numerado e botão que abre o painel da sala.
export function SalaItem({ sala, numero, aberta, aoAlternar }: Props) {
  const idConteudo = `sala-${numero}-conteudo`

  return (
    <Revelar como="li" className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-x-3">
      {/* Trecho da linha tracejada: do centro desta miniatura até o centro da próxima
          (36 px da miniatura + 20 px do espaço entre itens). Aparece junto com a sala. */}
      <span aria-hidden="true" className="linha-tracejada absolute -bottom-14 left-[2.125rem] top-9 w-1" />

      <div className="relative z-10 size-18">
        <div className="size-full overflow-hidden rounded-md border-2 border-marrom-portao bg-creme">
          <FotoOuProvisoria foto={sala.imagem} indiceCor={numero - 1} tamanho="compacta" />
        </div>
        <span
          aria-hidden="true"
          className="absolute -left-2 -top-2 grid h-7 min-w-7 place-items-center rounded bg-azul-placa px-1.5 font-titulo text-sm font-black text-branco ring-2 ring-creme [font-stretch:115%]"
        >
          {numero}
        </span>
      </div>

      <div className="min-w-0">
        <h2>
          <button
            type="button"
            aria-expanded={aberta}
            aria-controls={idConteudo}
            onClick={aoAlternar}
            className={`flex min-h-18 w-full items-center gap-2 rounded-md border-2 py-2 pl-3.5 pr-1.5 text-left transition-colors ${
              aberta ? 'border-marrom-portao bg-salmao' : 'border-cinza-pedra bg-creme hover:border-marrom-portao'
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-titulo text-sm font-extrabold uppercase tracking-[0.08em] [font-stretch:112%]">
                Sala {numero}
              </span>
              <span className="mt-0.5 block text-balance break-words font-titulo text-xl font-extrabold leading-tight [font-stretch:108%]">
                {sala.titulo}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="grid size-11 flex-none place-items-center rounded-md bg-azul-placa text-branco"
            >
              <IconeSeta className={`size-6 transition-transform ${aberta ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </h2>

        {aberta && (
          <div id={idConteudo} className="mt-2 rounded-md border-2 border-cinza-pedra bg-creme p-4">
            <p className="break-words">{sala.descricao}</p>
            <p className="mt-3 font-bold">{quantidadeDeGrupos(sala.grupos.length)} nesta sala</p>
            <a
              href={enderecoDaSala(numero)}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-md bg-azul-placa px-4 font-titulo font-extrabold uppercase tracking-[0.04em] text-branco [font-stretch:112%] hover:bg-marrom-portao"
            >
              Ver sala
              <IconeProxima className="size-5" />
            </a>
          </div>
        )}
      </div>
    </Revelar>
  )
}

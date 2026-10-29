import type { Estacao } from '../../data/tipos'
import { IconeSeta } from '../Icones'
import { FotoOuProvisoria } from '../layout/FotoOuProvisoria'

type Props = {
  estacao: Estacao
  numero: number
  aberta: boolean
  aoAlternar: () => void
}

// Uma estação do roadmap: miniatura com selo numerado e botão que abre a descrição.
export function EstacaoItem({ estacao, numero, aberta, aoAlternar }: Props) {
  const idConteudo = `estacao-${numero}-conteudo`

  return (
    <li className="grid grid-cols-[4.5rem_1fr] items-start gap-x-3">
      <div className="relative z-10 size-18">
        <div className="size-full overflow-hidden rounded-md border-2 border-marrom-portao bg-creme">
          <FotoOuProvisoria foto={estacao.miniatura} indiceCor={numero - 1} tamanho="compacta" />
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
                Estação {numero}
              </span>
              <span className="mt-0.5 block text-balance font-titulo text-xl font-extrabold leading-tight [font-stretch:108%]">
                {estacao.titulo}
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
            <p>{estacao.descricao}</p>
            <figure className="mt-4">
              <div className="aspect-[4/3] overflow-hidden rounded-md">
                <FotoOuProvisoria foto={estacao.foto} indiceCor={numero} />
              </div>
              <figcaption className="mt-2 text-cinza-texto">{estacao.legenda}</figcaption>
            </figure>
          </div>
        )}
      </div>
    </li>
  )
}

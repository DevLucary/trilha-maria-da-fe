import type { Parada } from '../../data/tipos'
import type { EstadoParada } from '../../lib/estadoParada'
import { IconeSeta } from '../Icones'
import { NoParada } from './NoParada'
import { ParadaVazia } from './ParadaVazia'

type Props = {
  parada: Parada
  numero: number
  estado: EstadoParada
  aberta: boolean
  aoAlternar: () => void
}

const rotuloDoEstado: Record<EstadoParada, string> = {
  atual: 'Você está aqui',
  concluida: 'Concluída',
  futura: 'Mais adiante',
}

const estiloDoCard: Record<EstadoParada, string> = {
  atual: 'border-marrom-portao bg-salmao card-atual',
  concluida: 'border-cinza-pedra bg-creme hover:border-marrom-portao',
  futura: 'border-dashed border-cinza-pedra bg-creme hover:border-marrom-portao',
}

const corDoTitulo: Record<EstadoParada, string> = {
  atual: 'text-azul-placa',
  concluida: 'text-marrom-portao',
  futura: 'text-marrom-portao',
}

const corDoRotulo: Record<EstadoParada, string> = {
  atual: 'text-marrom-portao',
  concluida: 'text-verde-palmeira',
  futura: 'text-cinza-texto',
}

// Uma parada na trilha: plaquinha numerada, card que abre e fecha, e o trecho de linha até a próxima.
export function ParadaItem({ parada, numero, estado, aberta, aoAlternar }: Props) {
  const idConteudo = `${parada.id}-conteudo`

  return (
    <li id={parada.id} className="relative grid scroll-mt-6 grid-cols-[3.5rem_1fr] gap-x-3.5 pb-5">
      {/* Trecho de linha até a próxima parada: contínuo se já foi percorrido, tracejado se não */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-[1.625rem] top-11 w-1 ${estado === 'concluida' ? 'bg-marrom-portao' : 'linha-tracejada'}`}
      />

      <NoParada numero={numero} estado={estado} />

      <div className="min-w-0">
        <h2>
          <button
            type="button"
            aria-expanded={aberta}
            aria-controls={idConteudo}
            onClick={aoAlternar}
            className={`group block w-full rounded-md border-2 px-3.5 py-3 text-left transition-colors ${estiloDoCard[estado]}`}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span
                  className={`block text-balance font-titulo text-2xl font-extrabold leading-[1.05] [font-stretch:112%] ${corDoTitulo[estado]}`}
                >
                  {parada.titulo}
                </span>
                <span className={`mt-1 block text-[0.9375rem] font-bold ${corDoRotulo[estado]}`}>
                  {rotuloDoEstado[estado]}
                </span>
              </span>
              <IconeSeta
                className={`mt-1 size-6 flex-none transition-transform ${aberta ? 'rotate-180' : ''}`}
              />
            </span>

            {estado === 'atual' && !aberta && (
              <span className="mt-3 grid min-h-12 place-items-center rounded bg-azul-placa px-3 font-titulo text-[1.0625rem] font-extrabold uppercase tracking-[0.04em] text-branco [font-stretch:115%]">
                Abrir parada
              </span>
            )}
          </button>
        </h2>

        {aberta && (
          <div id={idConteudo} className="mt-3">
            {parada.blocos.length === 0 && <ParadaVazia />}
          </div>
        )}
      </div>
    </li>
  )
}

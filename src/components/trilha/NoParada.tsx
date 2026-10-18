import type { EstadoParada } from '../../lib/estadoParada'
import { IconeConcluida } from './Icones'

type Props = {
  numero: number
  estado: EstadoParada
}

const estiloPorEstado: Record<EstadoParada, string> = {
  atual: 'bg-azul-placa text-branco placa-atual',
  concluida: 'bg-verde-palmeira text-branco',
  futura: 'border-2 border-dashed border-cinza-pedra bg-creme text-marrom-portao',
}

// Plaquinha numerada que marca a parada na linha da trilha.
// É só visual: o estado também está escrito no card ao lado.
export function NoParada({ numero, estado }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`relative z-10 grid h-11 w-14 place-items-center rounded font-titulo text-[22px] font-black [font-stretch:125%] ${estiloPorEstado[estado]}`}
    >
      {numero}
      {estado === 'concluida' && (
        <span className="absolute -right-2.5 -top-2.5 grid size-6 place-items-center rounded-full border-2 border-verde-palmeira bg-creme text-verde-palmeira">
          <IconeConcluida className="size-3.5" />
        </span>
      )}
    </span>
  )
}

import type { Grupo } from '../../data/tipos'
import { FotoOuProvisoria } from '../layout/FotoOuProvisoria'
import { Revelar } from '../Revelar'

type Props = {
  grupo: Grupo
  indice: number
}

// Card de um grupo da sala: foto 16:10 em cima, rótulo, título do projeto e descrição.
export function CardGrupo({ grupo, indice }: Props) {
  return (
    <Revelar como="li" className="overflow-hidden rounded-md border-2 border-cinza-pedra bg-creme">
      <div className="aspect-[16/10]">
        <FotoOuProvisoria foto={grupo.imagem} indiceCor={indice} />
      </div>
      <div className="p-4">
        <p className="break-words font-titulo text-sm font-extrabold uppercase tracking-[0.08em] text-terracota [font-stretch:112%]">
          {grupo.rotulo}
        </p>
        <h3 className="mt-1 text-balance break-words font-titulo text-xl font-extrabold leading-tight [font-stretch:108%]">
          {grupo.titulo}
        </h3>
        <p className="mt-2 break-words">{grupo.descricao}</p>
      </div>
    </Revelar>
  )
}

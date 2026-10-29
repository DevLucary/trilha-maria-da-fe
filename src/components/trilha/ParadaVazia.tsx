import { descricaoDosBlocos } from '../../lib/blocos'
import { IconeBloco } from '../Icones'

// Estado vazio de uma parada sem conteúdo: mostra os tipos de bloco que ela pode receber.
export function ParadaVazia() {
  return (
    <div className="rounded-md border-2 border-dashed border-cinza-pedra bg-creme p-4">
      <p className="font-titulo text-lg font-extrabold uppercase leading-tight [font-stretch:112%]">
        Parada em preparação
      </p>
      <p className="mt-1">O conteúdo desta parada ainda vai ser preenchido. Ela pode receber:</p>

      <ul className="mt-4 grid gap-3">
        {descricaoDosBlocos.map((bloco) => (
          <li key={bloco.tipo} className="flex items-start gap-3">
            <span className="grid size-10 flex-none place-items-center rounded border-2 border-cinza-pedra text-terracota">
              <IconeBloco tipo={bloco.tipo} className="size-5" />
            </span>
            <span className="leading-snug">
              <span className="block font-bold">{bloco.nome}</span>
              <span className="block text-cinza-texto">{bloco.descricao}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

import type { Foto } from '../../data/tipos'
import { IconeBloco } from '../Icones'

type Props = {
  foto: Foto
  /** Escolhe a cor do bloco provisório, para fotos vizinhas não ficarem iguais. */
  indiceCor?: number
  /**
   * Tamanho do bloco provisório:
   * grande = ícone, "Foto provisória" e nome; media = ícone e nome; compacta = só o ícone.
   */
  tamanho?: 'grande' | 'media' | 'compacta'
  carregarLogo?: boolean
}

// Combinações de fundo e texto da paleta que passam no contraste WCAG AA.
const coresProvisorias = [
  'bg-terracota text-creme',
  'bg-azul-placa text-branco',
  'bg-verde-palmeira text-branco',
  'bg-salmao text-marrom-portao',
  'bg-marrom-portao text-creme',
]

// Mostra a foto real quando houver "src"; senão, um bloco colorido marcado como provisório.
export function FotoOuProvisoria({ foto, indiceCor = 0, tamanho = 'grande', carregarLogo = false }: Props) {
  if (foto.src) {
    return (
      <img
        src={foto.src}
        alt={foto.alt}
        loading={carregarLogo ? 'eager' : 'lazy'}
        decoding="async"
        className="size-full object-cover"
      />
    )
  }

  const cor = coresProvisorias[indiceCor % coresProvisorias.length]

  return (
    <div
      role="img"
      aria-label={foto.alt}
      className={`grid size-full place-items-center text-center ${cor} ${tamanho === 'compacta' ? '' : 'p-2'}`}
    >
      <span aria-hidden="true" className="grid justify-items-center gap-1">
        <IconeBloco tipo="galeria" className={tamanho === 'grande' ? 'size-8' : 'size-6'} />
        {tamanho === 'grande' && (
          <span className="font-titulo text-xs font-extrabold uppercase tracking-[0.1em] [font-stretch:112%]">
            Foto provisória
          </span>
        )}
        {tamanho !== 'compacta' && (
          <span
            className={`text-balance font-bold leading-snug ${tamanho === 'grande' ? 'text-[0.9375rem]' : 'text-sm'}`}
          >
            {foto.alt}
          </span>
        )}
      </span>
    </div>
  )
}

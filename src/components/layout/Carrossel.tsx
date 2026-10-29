import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import type { Foto } from '../../data/tipos'
import { usePrefereMenosMovimento } from '../../hooks/usePrefereMenosMovimento'
import { IconeAnterior, IconePausar, IconeProxima, IconeRetomar } from '../Icones'
import { FotoOuProvisoria } from './FotoOuProvisoria'

type Props = {
  fotos: Foto[]
}

const INTERVALO_MS = 5000
/** Acima disso, as bolinhas não cabem em 360 px: viram setas com contador. */
const MAXIMO_DE_BOLINHAS = 7

// Carrossel acessível: troca a cada 5 s, para quando o visitante pausa,
// passa o mouse ou foca nele, e nunca troca sozinho com "reduzir movimento".
export function Carrossel({ fotos }: Props) {
  const [indice, setIndice] = useState(0)
  const [pausadoPeloVisitante, setPausadoPeloVisitante] = useState(false)
  const [emUso, setEmUso] = useState(false)
  const reduzirMovimento = usePrefereMenosMovimento()

  const total = fotos.length
  const atual = total > 0 ? indice % total : 0
  const podeGirar = total > 1 && !reduzirMovimento
  const girando = podeGirar && !pausadoPeloVisitante && !emUso

  useEffect(() => {
    if (!girando) return
    // Reinicia a contagem a cada troca, inclusive quando o visitante escolhe uma foto.
    const temporizador = window.setTimeout(() => setIndice((i) => (i + 1) % total), INTERVALO_MS)
    return () => window.clearTimeout(temporizador)
  }, [girando, atual, total])

  if (total === 0) return null

  const irPara = (novo: number) => setIndice((novo + total) % total)

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Fotos da feira"
      className="mx-auto max-w-xl"
      onFocus={() => setEmUso(true)}
      onBlur={(evento) => {
        if (!evento.currentTarget.contains(evento.relatedTarget)) setEmUso(false)
      }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden bg-marrom-portao"
        onPointerEnter={(evento) => evento.pointerType === 'mouse' && setEmUso(true)}
        onPointerLeave={(evento) => evento.pointerType === 'mouse' && setEmUso(false)}
      >
        {/* Leitores de tela só anunciam a troca quando o carrossel está parado */}
        <div aria-live={girando ? 'off' : 'polite'} className="size-full">
          <AnimatePresence initial={false}>
            <m.div
              key={atual}
              role="group"
              aria-roledescription="foto"
              aria-label={`${atual + 1} de ${total}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <FotoOuProvisoria foto={fotos[atual]} indiceCor={atual} carregarLogo={atual === 0} />
            </m.div>
          </AnimatePresence>
        </div>

        {podeGirar && (
          <button
            type="button"
            onClick={() => setPausadoPeloVisitante((pausado) => !pausado)}
            aria-label={pausadoPeloVisitante ? 'Retomar troca automática das fotos' : 'Pausar troca automática das fotos'}
            className="absolute bottom-2 right-2 z-10 grid size-11 place-items-center rounded-md border-2 border-marrom-portao bg-creme text-marrom-portao hover:bg-salmao"
          >
            {pausadoPeloVisitante ? <IconeRetomar className="size-5" /> : <IconePausar className="size-5" />}
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center px-4">
          {total <= MAXIMO_DE_BOLINHAS ? (
            <ul className="flex flex-wrap justify-center" aria-label="Escolher foto">
              {fotos.map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => irPara(i)}
                    aria-label={`Mostrar foto ${i + 1} de ${total}`}
                    aria-current={i === atual ? 'true' : undefined}
                    className="grid size-11 place-items-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-2.5 rounded-full border-2 ${
                        i === atual ? 'w-6 border-azul-placa bg-azul-placa' : 'w-2.5 border-marrom-portao'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => irPara(atual - 1)}
                aria-label="Foto anterior"
                className="grid size-11 place-items-center rounded-md hover:bg-salmao"
              >
                <IconeAnterior className="size-6" />
              </button>
              <p className="min-w-16 text-center font-bold tabular-nums">
                {atual + 1} de {total}
              </p>
              <button
                type="button"
                onClick={() => irPara(atual + 1)}
                aria-label="Próxima foto"
                className="grid size-11 place-items-center rounded-md hover:bg-salmao"
              >
                <IconeProxima className="size-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

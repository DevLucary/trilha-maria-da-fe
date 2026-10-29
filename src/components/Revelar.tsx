import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { inView, useMotionValue } from 'framer-motion'
import * as m from 'framer-motion/m'
import { usePrefereMenosMovimento } from '../hooks/usePrefereMenosMovimento'

// Animação de entrada ao rolar: o elemento sobe 16 px e aparece, uma vez só.
//
// Regras de segurança:
// - O padrão é VISÍVEL. Só é escondido o que está abaixo da primeira tela ao abrir a página,
//   e isso acontece antes da primeira pintura, então ninguém vê o conteúdo "piscar".
// - O que já aparece ao abrir a página nunca anima.
// - Com "reduzir movimento", nada é escondido (e o que estiver escondido aparece na hora).

const DESLOCAMENTO_PX = 16
const DURACAO_S = 0.35
const SUAVIZACAO = [0.23, 1, 0.32, 1] as const // ease-out forte: começa rápido, assenta devagar
const INTERVALO_FILA_S = 0.06
const MAXIMO_NA_FILA = 8
// Revela quando o topo do elemento passa um pouco da borda de baixo da tela
const MARGEM_DA_TELA = '0px 0px -8% 0px'

const TRANSFORM_OCULTO = `translateY(${DESLOCAMENTO_PX}px)`
const TRANSFORM_VISIVEL = 'translateY(0px)'

// Elementos HTML que o Revelar pode ser. Todos usam a mesma lógica.
const elementos = { div: m.div, section: m.section, li: m.li }

// Fila que dá ~60 ms de atraso entre itens que entram na tela juntos (ex.: cards lado a lado).
// Fora de um GrupoRevelar, o atraso é zero.
const FilaDeAtraso = createContext<() => number>(() => 0)

export function GrupoRevelar({ children }: { children: ReactNode }) {
  const fila = useRef({ ultimo: 0, posicao: 0 })

  const pedirAtraso = useCallback(() => {
    const agora = performance.now()
    const estado = fila.current
    // Itens que chegam com mais de 100 ms de diferença começam uma fila nova
    if (agora - estado.ultimo > 100) estado.posicao = 0
    estado.ultimo = agora
    const atraso = Math.min(estado.posicao, MAXIMO_NA_FILA) * INTERVALO_FILA_S
    estado.posicao += 1
    return atraso
  }, [])

  return <FilaDeAtraso.Provider value={pedirAtraso}>{children}</FilaDeAtraso.Provider>
}

type Props = {
  como?: keyof typeof elementos
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}

export function Revelar({ como = 'div', className, children, ...atributos }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduzirMovimento = usePrefereMenosMovimento()
  const pedirAtraso = useContext(FilaDeAtraso)
  // null = ainda não revelado; número = já revelado, com este atraso (em segundos)
  const [atraso, setAtraso] = useState<number | null>(null)
  const revelado = atraso !== null

  // Valores de animação começam visíveis: se nada rodar, o conteúdo aparece normalmente.
  const opacidade = useMotionValue(1)
  const transformacao = useMotionValue(TRANSFORM_VISIVEL)

  // Antes da primeira pintura: decide se o elemento começa escondido e passa a observar
  // quando ele entra na tela. Usa a posição na página (não na janela) para funcionar
  // também ao trocar de aba.
  useLayoutEffect(() => {
    const elemento = ref.current
    if (!elemento || revelado) return

    const abaixoDaPrimeiraTela = elemento.getBoundingClientRect().top + window.scrollY > window.innerHeight
    if (reduzirMovimento || !abaixoDaPrimeiraTela) {
      opacidade.set(1)
      transformacao.set(TRANSFORM_VISIVEL)
      return
    }

    opacidade.set(0)
    transformacao.set(TRANSFORM_OCULTO)
    // inView devolve a função que para de observar (usada na limpeza do efeito)
    return inView(elemento, () => setAtraso(pedirAtraso()), { margin: MARGEM_DA_TELA })
  }, [reduzirMovimento, revelado, pedirAtraso, opacidade, transformacao])

  // Os tipos dos elementos m.* são diferentes entre si; para esta lógica eles se comportam igual.
  const Elemento = elementos[como] as typeof m.div

  return (
    <Elemento
      ref={ref}
      data-revelar=""
      className={className}
      style={{ opacity: opacidade, transform: transformacao }}
      animate={revelado ? { opacity: 1, transform: TRANSFORM_VISIVEL } : undefined}
      transition={{ duration: DURACAO_S, ease: SUAVIZACAO, delay: atraso ?? 0 }}
      {...atributos}
    >
      {children}
    </Elemento>
  )
}

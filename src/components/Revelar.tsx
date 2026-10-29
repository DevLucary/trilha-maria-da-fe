import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useMotionValue } from 'framer-motion'
import * as m from 'framer-motion/m'
import { usePrefereMenosMovimento } from '../hooks/usePrefereMenosMovimento'
import { direcaoDaRolagem } from '../lib/direcaoDaRolagem'

// Animação de entrada ao rolar, repetida toda vez que o elemento entra na tela.
// - Rolando para baixo, ele entra vindo de baixo (sobe 16 px); rolando para cima, vem de cima.
// - Só volta a ficar escondido quando sai TOTALMENTE da tela (com 100 px de folga), então nunca some à vista
//   do visitante (nem com rolagem rápida, nem parando no meio).
//
// Regras de segurança:
// - O padrão é VISÍVEL. Ao abrir a página, só é escondido o que está abaixo da primeira tela,
//   e isso acontece antes da primeira pintura, então ninguém vê o conteúdo "piscar".
// - O que já aparece ao abrir a página não anima na abertura.
// - Com "reduzir movimento", nada é escondido (e o que estiver escondido aparece na hora).

const DESLOCAMENTO_PX = 16
const DURACAO_S = 0.35
const SUAVIZACAO = [0.23, 1, 0.32, 1] as const // ease-out forte: começa rápido, assenta devagar
const INTERVALO_FILA_S = 0.06
const MAXIMO_NA_FILA = 8
// Distância além da borda da tela para o elemento voltar ao estado inicial
const FOLGA_SAIDA_PX = 100

const TRANSFORM_VISIVEL = 'translateY(0px)'

// Posição de cada estado. "abaixo"/"acima" = escondido, esperando para entrar por aquele lado.
const alvos = {
  visivel: { opacity: 1, transform: TRANSFORM_VISIVEL },
  abaixo: { opacity: 0, transform: `translateY(${DESLOCAMENTO_PX}px)` },
  acima: { opacity: 0, transform: `translateY(-${DESLOCAMENTO_PX}px)` },
}
type Alvo = keyof typeof alvos

// Por qual lado o elemento está entrando na tela?
// Cortado só pela borda de cima → por cima; só pela de baixo → por baixo.
// Já inteiro na tela (rolagem rápida) ou cortado pelas duas → vale o sentido da rolagem.
function entraPorCima(entrada: IntersectionObserverEntry) {
  const caixa = entrada.boundingClientRect
  const tela = entrada.rootBounds
  const cortadoEmCima = caixa.top < (tela?.top ?? 0)
  const cortadoEmBaixo = caixa.bottom > (tela?.bottom ?? window.innerHeight)
  if (cortadoEmCima !== cortadoEmBaixo) return cortadoEmCima
  return direcaoDaRolagem() === -1
}

// Elementos HTML que o Revelar pode ser. Todos usam a mesma lógica.
const elementos = { div: m.div, section: m.section, li: m.li }

// Fila que dá ~60 ms de atraso entre itens que entram na tela juntos (ex.: cards lado a lado).
// O item pede a vez e recebe o atraso pela função "aplicar".
// Fora de um GrupoRevelar, o atraso é zero e vale na hora.
type PedirAtraso = (elemento: Element, aplicar: (atraso: number) => void) => void
const FilaDeAtraso = createContext<PedirAtraso>((_, aplicar) => aplicar(0))

export function GrupoRevelar({ children }: { children: ReactNode }) {
  const fila = useRef({ ultimo: 0, posicao: 0 })
  const lote = useRef<{ elemento: Element; aplicar: (atraso: number) => void }[]>([])

  const pedirAtraso = useCallback<PedirAtraso>((elemento, aplicar) => {
    lote.current.push({ elemento, aplicar })
    if (lote.current.length > 1) return
    // Junta os itens que entram no mesmo quadro e distribui os atrasos na ordem da página
    // (o navegador não avisa as entradas em ordem).
    requestAnimationFrame(() => {
      const itens = lote.current.sort((a, b) =>
        a.elemento.compareDocumentPosition(b.elemento) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      )
      lote.current = []
      const agora = performance.now()
      const estado = fila.current
      // Lotes com mais de 100 ms de diferença começam uma fila nova
      if (agora - estado.ultimo > 100) estado.posicao = 0
      estado.ultimo = agora
      for (const item of itens) {
        item.aplicar(Math.min(estado.posicao, MAXIMO_NA_FILA) * INTERVALO_FILA_S)
        estado.posicao += 1
      }
    })
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
  // null = nada decidido ainda (o elemento fica como está: visível)
  const [alvo, setAlvo] = useState<Alvo | null>(null)
  const [atraso, setAtraso] = useState(0)

  // Valores de animação começam visíveis: se nada rodar, o conteúdo aparece normalmente.
  const opacidade = useMotionValue(1)
  const transformacao = useMotionValue(TRANSFORM_VISIVEL)

  useLayoutEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    if (reduzirMovimento) {
      opacidade.set(1)
      transformacao.set(TRANSFORM_VISIVEL)
      return
    }

    // Antes da primeira pintura: esconde só o que fica abaixo da primeira tela da página.
    // Usa a posição na página (não na janela) para funcionar também ao trocar de aba.
    const naPrimeiraTela = elemento.getBoundingClientRect().top + window.scrollY < window.innerHeight
    if (!naPrimeiraTela) {
      opacidade.set(alvos.abaixo.opacity)
      transformacao.set(alvos.abaixo.transform)
    }

    // Liga o acompanhamento do sentido da rolagem antes da primeira rolagem
    direcaoDaRolagem()

    // Entrada: sem margem e com limite zero, avisa quando o primeiro pixel entra na tela.
    const observarEntrada = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      // A direção é decidida na entrada (decidir só na saída falha quando a página salta por
      // cima do elemento sem ele aparecer). Ainda está invisível, então reposicionar não aparece.
      if (opacidade.get() === 0) {
        transformacao.set(entraPorCima(entrada) ? alvos.acima.transform : alvos.abaixo.transform)
      }
      pedirAtraso(elemento, (atrasoNaFila) => {
        setAtraso(atrasoNaFila)
        setAlvo('visivel')
      })
    })

    // Saída: só volta ao estado inicial quando o elemento está totalmente fora da tela
    // e com folga, para um vai-e-volta rápido na borda não fazer ele piscar.
    let quadroPendente = 0
    const esconderSeLonge = () => {
      // Confere a posição e esconde no MESMO quadro, logo antes da tela ser pintada.
      // Assim é impossível esconder algo que esteja visível nessa pintura.
      const caixa = elemento.getBoundingClientRect()
      const longeDaTela = caixa.bottom < -FOLGA_SAIDA_PX || caixa.top > window.innerHeight + FOLGA_SAIDA_PX
      if (!longeDaTela) return
      // Saiu por cima → na volta entra vindo de cima, e vice-versa
      const lado: Alvo = caixa.bottom <= 0 ? 'acima' : 'abaixo'
      elemento.style.opacity = String(alvos[lado].opacity)
      elemento.style.transform = alvos[lado].transform
      opacidade.set(alvos[lado].opacity)
      transformacao.set(alvos[lado].transform)
      setAlvo(lado)
    }
    const observarSaida = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) return
        cancelAnimationFrame(quadroPendente)
        quadroPendente = requestAnimationFrame(esconderSeLonge)
      },
      { rootMargin: `${FOLGA_SAIDA_PX}px 0px` },
    )

    observarEntrada.observe(elemento)
    observarSaida.observe(elemento)
    return () => {
      cancelAnimationFrame(quadroPendente)
      observarEntrada.disconnect()
      observarSaida.disconnect()
    }
  }, [reduzirMovimento, pedirAtraso, opacidade, transformacao])

  // Os tipos dos elementos m.* são diferentes entre si; para esta lógica eles se comportam igual.
  const Elemento = elementos[como] as typeof m.div

  return (
    <Elemento
      ref={ref}
      data-revelar=""
      className={className}
      style={{ opacity: opacidade, transform: transformacao }}
      animate={reduzirMovimento || alvo === null ? undefined : alvos[alvo]}
      // Esconder é instantâneo (acontece fora da tela); aparecer é animado.
      transition={
        alvo === 'visivel' ? { duration: DURACAO_S, ease: SUAVIZACAO, delay: atraso } : { duration: 0 }
      }
      {...atributos}
    >
      {children}
    </Elemento>
  )
}

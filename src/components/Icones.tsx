import type { ReactNode } from 'react'
import type { TipoBloco } from '../data/tipos'

// Ícones desenhados em SVG, todos com o mesmo traço (2px, pontas arredondadas).
// São decorativos: o texto ao lado já diz o que significam (aria-hidden).

type PropsIcone = { className?: string }

function Svg({ className, children }: PropsIcone & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

const desenhos: Record<TipoBloco, ReactNode> = {
  texto: <path d="M4 6h16M4 10h16M4 14h10M4 18h13" />,
  galeria: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m21 16-5-5-9 8" />
    </>
  ),
  cards: (
    <>
      <rect x="8" y="3" width="12" height="16" rx="2" />
      <path d="M5 7v12a2 2 0 0 0 2 2h9" />
    </>
  ),
  linhaDoTempo: (
    <>
      <path d="M3 12h18" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </>
  ),
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3M12 17h.01" />
    </>
  ),
  depoimento: (
    <path d="M5 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-5 4v-4H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
  ),
  midia: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9v6l5-3-5-3Z" />
    </>
  ),
}

export function IconeBloco({ tipo, className }: PropsIcone & { tipo: TipoBloco }) {
  return <Svg className={className}>{desenhos[tipo]}</Svg>
}

export function IconeSeta({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  )
}

export function IconeConcluida({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  )
}

export function IconePausar({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="M9 5v14M15 5v14" />
    </Svg>
  )
}

export function IconeRetomar({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="M7 5v14l12-7-12-7Z" />
    </Svg>
  )
}

export function IconeAnterior({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="m15 6-6 6 6 6" />
    </Svg>
  )
}

export function IconeProxima({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  )
}

export function IconeLocal({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  )
}

export function IconeTelefone({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </Svg>
  )
}

export function IconeEmail({ className }: PropsIcone) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  )
}

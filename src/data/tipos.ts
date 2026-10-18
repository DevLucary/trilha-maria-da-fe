// Formato do conteúdo da trilha.
// O arquivo trilha.ts precisa seguir estes tipos; o TypeScript avisa se faltar algo.

/** Imagem otimizada (WebP ou AVIF) guardada em public/imagens. */
export type Imagem = {
  src: string
  alt: string
  largura: number
  altura: number
}

export type BlocoTexto = {
  tipo: 'texto'
  titulo?: string
  paragrafos: string[]
}

export type BlocoGaleria = {
  tipo: 'galeria'
  imagens: (Imagem & { legenda?: string })[]
}

export type BlocoCards = {
  tipo: 'cards'
  cards: {
    frente: string
    imagem?: Imagem
    verso: string
  }[]
}

export type BlocoLinhaDoTempo = {
  tipo: 'linhaDoTempo'
  marcos: {
    quando: string
    titulo: string
    texto?: string
  }[]
}

export type BlocoQuiz = {
  tipo: 'quiz'
  perguntas: {
    enunciado: string
    opcoes: string[]
    indiceCorreta: number
    explicacao?: string
  }[]
}

export type BlocoDepoimento = {
  tipo: 'depoimento'
  texto: string
  nome: string
  descricao?: string
  foto?: Imagem
}

export type BlocoMidia = {
  tipo: 'midia'
  formato: 'audio' | 'video'
  src: string
  titulo: string
  transcricao?: string
}

export type Bloco =
  | BlocoTexto
  | BlocoGaleria
  | BlocoCards
  | BlocoLinhaDoTempo
  | BlocoQuiz
  | BlocoDepoimento
  | BlocoMidia

export type TipoBloco = Bloco['tipo']

export type Parada = {
  /** Identificador único, usado no endereço da página (ex.: #parada-1). */
  id: string
  titulo: string
  /** Lista vazia = a parada aparece como modelo vazio. */
  blocos: Bloco[]
}

export type Trilha = {
  /** Nome dividido em duas linhas, como aparece na placa do topo. */
  nome: {
    primeiraLinha: string
    destaque: string
  }
  escola: string
  paradas: Parada[]
}

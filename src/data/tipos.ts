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

/**
 * Foto do site (WebP ou AVIF em public/imagens).
 * Sem `src`, aparece um bloco colorido provisório com o texto alternativo.
 */
export type Foto = {
  src?: string
  alt: string
}

export type ItemInformacao = {
  rotulo: string
  valor: string
}

export type CardMulticultural = {
  titulo: string
  texto: string
  foto: Foto
}

/** Imagem real (WebP ou AVIF em public/imagens). Quando existir, o texto alternativo é obrigatório. */
export type ImagemComAlt = {
  src: string
  alt: string
}

/** Um grupo (projeto) dentro de uma sala. */
export type Grupo = {
  /** Rótulo que identifica o grupo na sala, ex.: "Grupo 1". */
  rotulo: string
  titulo: string
  descricao: string
  /** Sem imagem, aparece um bloco colorido com "Foto provisória". */
  imagem?: ImagemComAlt
}

/** Uma sala do roadmap. O número da sala (e o endereço #/sala/N) vem da posição na lista. */
export type Sala = {
  titulo: string
  descricao: string
  /** Usada na miniatura do roadmap. Sem imagem, aparece um bloco colorido provisório. */
  imagem?: ImagemComAlt
  /** Quantidade livre; lista vazia mostra "Grupos em preparação". */
  grupos: Grupo[]
}

export type Contato = {
  titulo: string
  endereco: string
  telefone: string
  email: string
  /** true enquanto os dados forem de exemplo: mostra o aviso "Dados fictícios". */
  ficticio: boolean
}

export type Trilha = {
  /** Nome dividido em duas linhas, como aparece na placa do topo. */
  nome: {
    primeiraLinha: string
    destaque: string
  }
  escola: string
  /** Nomes das abas fixas do topo. */
  abas: {
    inicio: string
    roadmap: string
  }
  /** Fotos do carrossel, em qualquer quantidade. */
  carrossel: Foto[]
  inicio: {
    frase: string
    informacoes: {
      titulo: string
      itens: ItemInformacao[]
    }
    multiculturalismo: {
      titulo: string
      paragrafos: string[]
    }
    naCidade: {
      titulo: string
      cards: CardMulticultural[]
    }
  }
  roadmap: {
    titulo: string
    instrucao: string
    salas: Sala[]
  }
  contato: Contato
  /** Paradas das etapas anteriores (fora do layout atual; ver LAYOUT.md). */
  paradas: Parada[]
}

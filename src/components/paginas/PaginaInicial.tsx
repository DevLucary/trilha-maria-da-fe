import type { Trilha } from '../../data/tipos'
import { FotoOuProvisoria } from '../layout/FotoOuProvisoria'
import { GrupoRevelar, Revelar } from '../Revelar'
import { TituloPagina } from '../layout/TituloPagina'

type Props = {
  nome: Trilha['nome']
  conteudo: Trilha['inicio']
}

// Tamanho do título acompanha a largura da coluna (7cqw), com máximo de 1.5rem:
// assim uma palavra longa como "MULTICULTURALISMO?" cabe inteira em telas de 320 a 390 px.
// break-words é a proteção final para palavras ainda maiores que vierem no conteúdo real.
const estiloTituloSecao =
  'font-titulo text-[min(1.5rem,7cqw)] font-extrabold uppercase leading-tight text-azul-placa [font-stretch:112%] text-balance break-words'

export function PaginaInicial({ nome, conteudo }: Props) {
  const { informacoes, multiculturalismo, naCidade } = conteudo

  return (
    <>
      <TituloPagina primeiraLinha={nome.primeiraLinha} destaque={nome.destaque}>
        <p className="font-bold">{conteudo.frase}</p>
      </TituloPagina>

      {/* Mesmo espaçamento lateral do Roadmap (px-4). A coluna é minmax(0,1fr) para nunca
          esticar além da tela por causa de uma palavra comprida; @container ativa o cqw dos títulos. */}
      <div className="@container mx-auto grid max-w-xl grid-cols-[minmax(0,1fr)] gap-12 px-4 pt-8">
        <Revelar como="section" aria-labelledby="secao-informacoes">
          <h2 id="secao-informacoes" className={estiloTituloSecao}>
            {informacoes.titulo}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 rounded-md border-2 border-marrom-portao bg-salmao p-4">
            {informacoes.itens.map((item) => (
              <div key={item.rotulo} className="contents">
                <dt className="font-titulo text-sm font-extrabold uppercase leading-6 tracking-[0.06em] [font-stretch:112%]">
                  {item.rotulo}
                </dt>
                <dd className="min-w-0 font-bold [overflow-wrap:anywhere]">{item.valor}</dd>
              </div>
            ))}
          </dl>
        </Revelar>

        <Revelar como="section" aria-labelledby="secao-multiculturalismo">
          <h2 id="secao-multiculturalismo" className={estiloTituloSecao}>
            {multiculturalismo.titulo}
          </h2>
          <div className="mt-3 grid max-w-[65ch] gap-3">
            {multiculturalismo.paragrafos.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        </Revelar>

        {/* Aqui só o título e os cards animam (cada um por si), para o deslocamento não somar */}
        <section aria-labelledby="secao-na-cidade">
          <Revelar>
            <h2 id="secao-na-cidade" className={estiloTituloSecao}>
              {naCidade.titulo}
            </h2>
          </Revelar>
          <GrupoRevelar>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {naCidade.cards.map((card, i) => (
                <Revelar key={i} como="li" className="overflow-hidden rounded-md border-2 border-cinza-pedra bg-creme">
                  <div className="aspect-[4/3]">
                    <FotoOuProvisoria foto={card.foto} indiceCor={i + 1} tamanho="media" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-balance break-words font-titulo text-[1.0625rem] font-extrabold leading-tight [font-stretch:108%]">
                      {card.titulo}
                    </h3>
                    <p className="mt-1 leading-snug">{card.texto}</p>
                  </div>
                </Revelar>
              ))}
            </ul>
          </GrupoRevelar>
        </section>
      </div>
    </>
  )
}

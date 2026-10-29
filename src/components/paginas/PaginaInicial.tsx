import type { Trilha } from '../../data/tipos'
import { FotoOuProvisoria } from '../layout/FotoOuProvisoria'
import { TituloPagina } from '../layout/TituloPagina'

type Props = {
  nome: Trilha['nome']
  conteudo: Trilha['inicio']
}

const estiloTituloSecao =
  'font-titulo text-2xl font-extrabold uppercase leading-tight text-azul-placa [font-stretch:112%] text-balance'

export function PaginaInicial({ nome, conteudo }: Props) {
  const { informacoes, multiculturalismo, naCidade } = conteudo

  return (
    <>
      <TituloPagina primeiraLinha={nome.primeiraLinha} destaque={nome.destaque}>
        <p className="font-bold">{conteudo.frase}</p>
      </TituloPagina>

      <div className="mx-auto grid max-w-xl gap-12 px-4 pt-8">
        <section aria-labelledby="secao-informacoes">
          <h2 id="secao-informacoes" className={estiloTituloSecao}>
            {informacoes.titulo}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 rounded-md border-2 border-marrom-portao bg-salmao p-4">
            {informacoes.itens.map((item) => (
              <div key={item.rotulo} className="contents">
                <dt className="font-titulo text-sm font-extrabold uppercase leading-6 tracking-[0.06em] [font-stretch:112%]">
                  {item.rotulo}
                </dt>
                <dd className="min-w-0 font-bold [overflow-wrap:anywhere]">{item.valor}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="secao-multiculturalismo">
          <h2 id="secao-multiculturalismo" className={estiloTituloSecao}>
            {multiculturalismo.titulo}
          </h2>
          <div className="mt-3 grid max-w-[65ch] gap-3">
            {multiculturalismo.paragrafos.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="secao-na-cidade">
          <h2 id="secao-na-cidade" className={estiloTituloSecao}>
            {naCidade.titulo}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {naCidade.cards.map((card, i) => (
              <li key={i} className="overflow-hidden rounded-md border-2 border-cinza-pedra bg-creme">
                <div className="aspect-[4/3]">
                  <FotoOuProvisoria foto={card.foto} indiceCor={i + 1} tamanho="media" />
                </div>
                <div className="p-3">
                  <h3 className="text-balance font-titulo text-[1.0625rem] font-extrabold leading-tight [font-stretch:108%]">
                    {card.titulo}
                  </h3>
                  <p className="mt-1 leading-snug">{card.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

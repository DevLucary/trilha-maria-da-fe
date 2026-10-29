import type { Contato } from '../../data/tipos'
import { IconeEmail, IconeLocal, IconeTelefone } from '../Icones'

type Props = {
  contato: Contato
}

const estiloLink = 'underline decoration-2 underline-offset-4 hover:decoration-salmao'

// Rodapé de contato, na cor do portão. Com dados fictícios, telefone e e-mail não viram links.
export function Rodape({ contato }: Props) {
  const telefoneSoNumeros = contato.telefone.replace(/\D/g, '')

  return (
    <footer className="mt-12 border-t-4 border-terracota bg-marrom-portao text-creme">
      <div className="mx-auto max-w-xl px-4 pb-10 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-titulo text-2xl font-extrabold uppercase [font-stretch:112%]">{contato.titulo}</h2>
          {contato.ficticio && (
            <p className="rounded bg-salmao px-2.5 py-1 text-sm font-bold text-marrom-portao">Dados fictícios</p>
          )}
        </div>

        <address className="mt-5 grid gap-4 not-italic">
          <p className="flex items-start gap-3">
            <IconeLocal className="mt-0.5 size-6 flex-none" />
            <span>
              <span className="sr-only">Endereço: </span>
              {contato.endereco}
            </span>
          </p>
          <p className="flex items-start gap-3">
            <IconeTelefone className="mt-0.5 size-6 flex-none" />
            <span>
              <span className="sr-only">Telefone: </span>
              {contato.ficticio ? (
                contato.telefone
              ) : (
                <a href={`tel:+55${telefoneSoNumeros}`} className={estiloLink}>
                  {contato.telefone}
                </a>
              )}
            </span>
          </p>
          <p className="flex items-start gap-3">
            <IconeEmail className="mt-0.5 size-6 flex-none" />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              <span className="sr-only">E-mail: </span>
              {contato.ficticio ? (
                contato.email
              ) : (
                <a href={`mailto:${contato.email}`} className={estiloLink}>
                  {contato.email}
                </a>
              )}
            </span>
          </p>
        </address>
      </div>
    </footer>
  )
}

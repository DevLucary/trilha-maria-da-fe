import * as m from 'framer-motion/m'

// Tela provisória da Etapa 2: confirma fontes, cores, Tailwind e Framer Motion.
// A trilha de verdade entra na Etapa 3.
function App() {
  return (
    <>
      <header className="bg-terracota px-4 pb-6 pt-8">
        <m.div
          className="mx-auto max-w-xl rounded-md bg-azul-placa px-4 pb-5 pt-4 text-branco shadow-[inset_0_0_0_3px_var(--color-azul-placa),inset_0_0_0_5px_var(--color-branco)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p className="font-titulo text-sm font-bold uppercase tracking-[0.12em] [font-stretch:115%]">
            Trilha multicultural de
          </p>
          <h1 className="mt-2 font-titulo text-5xl font-extrabold uppercase leading-[0.95] [font-stretch:125%]">
            Maria da Fé
          </h1>
        </m.div>
      </header>
      <div className="h-7 border-b-4 border-marrom-portao bg-salmao" aria-hidden="true" />

      <main className="mx-auto max-w-xl px-4 py-8">
        <p>Setup pronto. A trilha com as paradas entra na próxima etapa.</p>
      </main>
    </>
  )
}

export default App

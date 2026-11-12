# Trilha Multicultural de Maria da Fé

Site-guia interativo, em formato de roadmap, para a feira multicultural da Escola Estadual Nossa Senhora de Lourdes (Maria da Fé, MG). Prazo: 18/11/2026. O nome da trilha é provisório.

## Estado atual

- `main`: esqueleto da Etapa 3 (trilha com 8 paradas vazias).
- `layout-novo`: layout novo com página inicial, roadmap de salas e página da sala. Ainda não foi juntado ao `main`.
- O conteúdo é provisório. Textos, fotos, data, horário e contato são exemplos e serão trocados quando o conteúdo real chegar.

## Stack

React ^19.2.8, TypeScript ~6.0.2, Vite ^8.3.0, Tailwind CSS ^4.3.3, Framer Motion ^14.3.0 (`framer-motion`), oxlint ^1.81.0.

## Como rodar

```
npm install
npm run dev -- --port 5280
npm run build
npm run lint
```

## Estrutura

- Dados: `src/data/trilha.ts` (conteúdo) e `src/data/tipos.ts` (formato). Salas, grupos, cards, carrossel e textos saem daí; mudar a quantidade ou o texto não exige mexer em componentes.
- Páginas (`src/components/paginas`): inicial (`#/`), roadmap (`#/roadmap`) e sala (`#/sala/N`, N = posição da sala na lista). Endereço inválido leva ao roadmap.
- Componentes principais: `layout/` (abas, carrossel, rodapé, foto provisória), `roadmap/SalaItem`, `sala/CardGrupo` e `Revelar` (animação de entrada ao rolar).
- Rotas: `src/hooks/usePagina.ts`. Estilos e cores: `src/styles/index.css`.
- `src/components/trilha` e `src/lib/estadoParada.ts` são de etapas anteriores (paradas) e não são usados no layout atual.

## Regras do projeto

- Não inventar conteúdo: sem fatos, datas ou nomes que não tenham sido enviados pela escola.
- Mobile-first em 360 px, alvos de toque de pelo menos 44 px, texto base de 16 px, foco visível.
- Animações só com `transform` e `opacity`, e desligadas com "reduzir movimento".
- Cores estimadas a partir da fachada da escola; não são as cores oficiais.
- Fora do escopo: backend, login, mapa interativo e mural coletivo.

## Deploy

Manual, com `npx vercel --prod --yes`, publicado em https://trilha-maria-da-fe.vercel.app. A pasta precisa estar ligada ao projeto da Vercel (`npx vercel link --project trilha-maria-da-fe`). O `.env.local` e a pasta `.vercel` são criados pela ligação e não vão para o Git.

## Avisos

- Repositório privado.
- Fotos do Google Maps não podem ser usadas no site.

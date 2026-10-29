# LAYOUT — Página inicial + Roadmap

Layout aprovado em 29/10/2026, a partir de um desenho do usuário e de um protótipo no app do Claude.
Este arquivo descreve **a estrutura**. O **conteúdo** (textos, cards, estações, fotos) ainda não está definido e vai mudar muito.

## Regras gerais

- Vale tudo o que está no CLAUDE.md e no PRODUCT.md: paleta (valores finais corrigidos para WCAG AA), fontes Archivo e Atkinson Hyperlegible Next, mobile-first em 360 px, alvos de toque de no mínimo 44×44 px, texto base de no mínimo 16 px, animações só com `transform`/`opacity` e respeitando "reduzir movimento", ícones em SVG (sem emoji).
- Site estático, sem backend.
- **Nenhum conteúdo fixo nos componentes.** Tudo vem de `src/data/trilha.ts`.
- **Quantidades livres:** o número de imagens do carrossel, de cards e de estações sai do arquivo de dados. Pode ser 3 ou 30. O layout não pode depender de uma quantidade.
- Não inventar fatos sobre Maria da Fé. Enquanto não houver conteúdo real, usar textos provisórios claramente marcados (por exemplo, "Título da estação 1", "Texto de exemplo").
- Imagens: enquanto não houver fotos próprias, blocos coloridos da paleta com o nome da foto que vai ali. **Não usar fotos da internet nem do Google Maps.**

## Estrutura comum às duas páginas

1. **Abas fixas no topo** (grudadas ao rolar): "Página inicial" | "Roadmap". A aba atual fica com fundo azul-placa e texto branco, e tem `aria-current="page"`.
2. **Carrossel de imagens** logo abaixo das abas:
   - troca sozinho a cada 5 segundos;
   - bolinhas para escolher a imagem (cada uma com área de toque de 44×44 px);
   - botão de pausar/retomar;
   - com "reduzir movimento" ligado, não troca sozinho;
   - cada imagem tem texto alternativo.
3. **Rodapé de contato**: endereço, telefone e e-mail, vindos do arquivo de dados. Por enquanto, dados fictícios com o aviso "Dados fictícios".

## Página inicial

Na ordem, de cima para baixo:

1. Abas.
2. Carrossel.
3. **Título** do site (hoje, "Trilha Multicultural de Maria da Fé", provisório) e a frase "Feira multicultural da Escola Estadual Nossa Senhora de Lourdes".
4. **Informações da feira**: pares rótulo/valor (data, horário, local, entrada…), vindos do arquivo de dados. Por enquanto, valores entre [colchetes].
5. **O que é multiculturalismo?**: título e um texto.
6. **Multiculturalismo em Maria da Fé**: título e uma **grade de cards em 2 colunas**. Cada card tem imagem em cima, título e texto curto embaixo. Quantidade livre.
7. Rodapé de contato.

## Roadmap

Na ordem, de cima para baixo:

1. Abas.
2. Carrossel.
3. Título da página e uma linha de instrução ("Toque na seta de cada estação para ver a descrição").
4. **Lista de estações**, numeradas a partir de 1, ligadas por uma linha tracejada vertical à esquerda. Quantidade livre. Cada estação:
   - **miniatura** quadrada à esquerda, com o número da estação num selo azul no canto;
   - ao lado, um botão que ocupa a linha, com "Estação N" pequeno em cima, o **título** embaixo e, à direita, uma **seta** (44×44) que abre e fecha;
   - ao abrir: **descrição**, **imagem** e **legenda**, num card abaixo do botão;
   - o botão usa `aria-expanded`; abrir uma estação pode fechar a anterior.
5. Marco **"Fim"** no fim da linha.
6. Rodapé de contato.

## Fora deste layout (decidido em 29/10/2026)

- **Sem estados de progresso** ("Você está aqui", ✓ concluída). Não apagar o código de etapas anteriores sem o usuário confirmar se a Etapa 5 sai do escopo.
- Os 7 tipos de bloco (quiz, cards que viram, linha do tempo etc.) continuam previstos, mas este layout não depende deles.

## Sugestão de formato dos dados (pode ajustar)

```ts
carrossel: { imagem: string; alt: string }[]
infoFeira: { rotulo: string; valor: string }[]
multiculturalismo: { titulo: string; texto: string }
cards: { titulo: string; texto: string; imagem: string; alt: string }[]
estacoes: { titulo: string; miniatura: string; descricao: string; imagem: string; alt: string; legenda: string }[]
contato: { endereco: string; telefone: string; email: string; ficticio: boolean }
```

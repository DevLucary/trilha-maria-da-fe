# CLAUDE.md — Trilha Multicultural de Maria da Fé

## Visão geral

Site-guia interativo para uma **feira sobre multiculturalismo, focada em Maria da Fé (MG)**. O visitante percorre uma **trilha vertical (roadmap)** pelo celular, parada por parada, e interage com o conteúdo de cada uma.

- **Prazo:** 18 de novembro de 2026.
- **Público:** visitantes da feira, quase todos no celular, muitas vezes com internet ruim.
- **Idioma do site e dos textos:** português do Brasil.
- **Sem login, sem backend, sem banco de dados.** Site 100% estático.

## Skills e bibliotecas obrigatórias

Antes de começar qualquer trabalho de interface, carregue e siga estas skills:

1. **ui-ux pro max** — decisões de UX, hierarquia, usabilidade, acessibilidade.
2. **impeccable** — acabamento visual e refinamento de detalhes.
3. **Framer Motion** (pacote `framer-motion`) — todas as animações.

Se alguma skill não estiver instalada ou disponível, **pare e me avise** antes de seguir, em vez de ignorá-la.

## Stack

- Vite + React + TypeScript
- Framer Motion
- Tailwind CSS (ou CSS Modules, se a skill de design recomendar algo melhor; justifique)
- Sem dependência de backend. Estado de progresso salvo em `localStorage`.
- Deploy: Vercel ou Netlify (gratuitos).

## Regra mais importante: os tópicos NÃO estão definidos

O conteúdo de cada parada **será enviado por mim depois**. Portanto:

- **Não invente fatos, datas, nomes, pratos, tradições ou história** de Maria da Fé. Nada de conteúdo "de enchimento" que pareça verdadeiro.
- Crie a trilha com **paradas-modelo vazias** (placeholders), com títulos neutros como "Parada 1", "Parada 2", etc. Padrão: **8 paradas**, mas o número deve ser fácil de mudar.
- Todo o conteúdo fica em **um único arquivo de dados** (ex.: `src/data/trilha.ts`). Para adicionar, remover ou reordenar uma parada, só se edita esse arquivo, sem mexer em componentes.
- Cada parada vazia deve mostrar, de forma visível e bonita, um **estado vazio** que indica quais tipos de bloco ela aceita (ver "Blocos de conteúdo").
- Quando eu mandar o conteúdo, a tarefa será apenas **preencher o arquivo de dados** e ajustar o que for necessário.

## Estrutura da trilha

- **Uma coluna** em todos os tamanhos de tela. Não precisa de layout diferente no desktop: no desktop, apenas centralize a coluna com largura máxima confortável.
- Linha vertical conectando as paradas, com um **nó** por parada.
- Estados de cada nó: **bloqueada/futura**, **atual**, **concluída**.
- Tocar em uma parada abre o conteúdo dela (expandir no lugar ou abrir uma tela própria com transição; escolher a opção mais fluida no celular).
- Botão claro de **"Concluir parada"**, que avança a trilha.
- Barra ou indicador de **progresso geral** fixo e discreto.
- Progresso salvo em `localStorage`, com opção de **reiniciar a trilha**.
- Navegação livre: o visitante pode abrir qualquer parada, mesmo fora de ordem (não travar conteúdo).

## Roadmap: salas e grupos (atualizado em 12/11/2026)

- O que antes se chamava "estação" agora é **sala**. Cada sala tem **grupos da sala** (os projetos).
- No arquivo de dados: `roadmap.salas`, com tipos `Sala` (título, descrição, imagem opcional, `grupos`) e `Grupo` (rótulo, título, descrição, imagem opcional). Imagem, quando existe, tem `alt` obrigatório.
- Cada sala tem endereço próprio: **`#/sala/N`** (N = posição da sala na lista, começando em 1). Endereço inválido (`#/sala/99`, `#/sala`) leva ao roadmap.
- Quantidade de salas e de grupos sai do arquivo de dados; a contagem exibida é calculada pelo tamanho da lista.
- Sem botão de votação por enquanto (depende de confirmação e de link real).

## Blocos de conteúdo (reutilizáveis)

Cada parada é composta por uma lista de blocos. Criar componentes para:

1. **Texto** (título + parágrafos)
2. **Imagem / galeria** com legenda
3. **Cards que viram** (frente: imagem ou pergunta, verso: curiosidade)
4. **Linha do tempo** (horizontal arrastável no celular)
5. **Quiz rápido** (2 a 3 perguntas, com feedback imediato)
6. **Depoimento / citação** (texto, nome, foto opcional)
7. **Áudio ou vídeo** incorporado (opcional)

Cada bloco deve ter um **estado vazio** com um exemplo ilustrativo do que pode ser colocado ali, claramente marcado como exemplo e fácil de substituir.

## Fora do escopo (não implementar)

- Mural coletivo ("Eu também faço parte")
- Mapa interativo
- Selo / passaporte final
- Login, cadastro, backend, banco de dados
- Layout específico para desktop

## Animações (Framer Motion)

- A linha da trilha **se desenha** conforme o scroll.
- Cada parada **entra com fade/slide** ao aparecer na tela (`whileInView`, uma vez só).
- O nó da parada atual **pulsa** de leve; ao concluir, dá um **"pop"**.
- Transições suaves ao abrir/fechar uma parada (`AnimatePresence`, `layout`).
- Flip nos cards, feedback animado no quiz.
- Animar apenas `transform` e `opacity`, para manter 60fps em celular fraco.
- **Respeitar `prefers-reduced-motion`**: reduzir ou desligar animações para quem pede.

## Design

- **Mobile-first.** Projetar primeiro para 360px de largura.
- Alvos de toque de **no mínimo 44x44px**.
- Texto legível sob sol forte: bom contraste (WCAG AA ou melhor), fonte base de pelo menos 16px.
- Tom visual **acolhedor e humano**, mais "contar história" do que "museu". A paleta e a direção final estão na seção **Direção visual** abaixo (substituem a ideia inicial de paleta da serra).
- Uma fonte de título com personalidade e uma de leitura limpa (carregar de forma otimizada, com `font-display: swap`).
- Modo claro por padrão. Modo escuro é opcional, só se sobrar tempo.

## Direção visual

**Status:** aprovada pelo usuário em 18/10/2026 (página de decisão).

**Referência:** a fachada da Escola Estadual Nossa Senhora de Lourdes (Maria da Fé). Tijolo aparente terracota, telhado de cerâmica, muro salmão, portão marrom-ferrugem, placa azul com letras brancas, paralelepípedo cinza e palmeiras. Clima: tijolo e pedra, calor de cidade pequena, acolhedor.

**Limites:** não usar fotos do Google Maps, não recriar logo da escola e não afirmar que são as cores oficiais. As cores foram estimadas a olho a partir de fotos.

### Paleta (validada em WCAG AA)

| Token | Cor | Uso |
|---|---|---|
| `terracota` | `#AD4F39` | Cor principal (tijolo). Ajustada de `#B5533C`. |
| `salmao` | `#E39B72` | Destaques e fundos de cards curtos (muro). |
| `azul-placa` | `#1F4E9E` | Títulos, botões, parada atual. |
| `creme` | `#FBF3E8` | Fundo da página. |
| `verde-palmeira` | `#3F6B4A` | Parada concluída. |
| `marrom-portao` | `#523426` | Texto. Ajustado de `#5A3A2A`. |
| `cinza-pedra` | `#8C8A86` | Linhas, bordas e elementos gráficos (nunca texto). |
| `cinza-texto` | `#6E6B66` | Texto secundário sobre creme (novo). |

**Ajustes de contraste e motivo:**
- `terracota` `#B5533C` → `#AD4F39`: o original dava 4,47:1 sobre creme (o mínimo é 4,5). O novo dá 4,83:1, com texto creme sobre ele também em 4,83:1 e branco em 5,31:1.
- `marrom-portao` `#5A3A2A` → `#523426`: o original dava 4,44:1 sobre salmão. O novo dá 4,90:1 sobre salmão e 10,2:1 sobre creme.
- `cinza-texto` `#6E6B66` (novo): o cinza-pedra dá só 3,13:1 sobre creme. Serve para linhas (o mínimo para elementos gráficos é 3:1), mas não para texto. O novo cinza dá 4,82:1.

**Combinações permitidas para texto:**
- Sobre creme: marrom (10,2), azul (7,2), verde (5,6), terracota (4,8), cinza-texto (4,8).
- Sobre salmão: marrom (4,9). Azul só em texto grande (≥24px, ou ≥18,7px em negrito), com 3,5:1.
- Sobre azul, terracota, verde ou marrom: branco ou creme.
- **Proibido:** terracota, verde ou cinza como texto sobre salmão, e qualquer texto em cinza-pedra.
- Conteúdo longo das paradas fica sobre creme. O salmão fica para cards curtos e destaques.
- Bordas sobre salmão usam marrom (o cinza-pedra some sobre ele: 1,5:1).

### Tipografia

- **Títulos:** Archivo (Google Fonts, variável, com largura e peso ajustáveis), em versão larga e pesada, caixa-alta nos rótulos. Lembra letreiro institucional de escola: grotesca larga, legível de longe. Um só arquivo cobre títulos, números das placas e rótulos, o que ajuda com a internet ruim.
- **Texto:** Atkinson Hyperlegible Next, a partir de 16px.
- Fontes servidas pelo próprio site (self-host, `woff2`, `font-display: swap`).

### Estados das paradas (sem depender só de cor)

- **Nó da parada:** plaquinha retangular inspirada na placa azul (número em branco), sem copiar a placa literal.
  - Atual: placa azul, contorno extra e rótulo "Você está aqui"; pulsa de leve.
  - Concluída: placa verde-palmeira com ✓ e rótulo "Concluída".
  - Futura: placa só com contorno tracejado em cinza-pedra, número em marrom.
- **Linha da trilha:** contínua no trecho já percorrido e tracejada no trecho à frente.
- **Materiais:** faixa de tijolo aparente no topo (padrão leve em CSS/SVG), faixa de muro salmão e linhas cor de pedra. Sem fotos e sem logo.

## Desempenho (internet ruim na feira)

- Imagens otimizadas (WebP/AVIF), com `loading="lazy"` e dimensões definidas.
- Bundle enxuto: importar apenas o necessário do Framer Motion.
- Meta: carregar rápido em 3G/4G fraco. Verificar com Lighthouse mobile.
- **Opcional, se sobrar tempo:** transformar em PWA para funcionar offline depois do primeiro acesso.

## Acessibilidade

- HTML semântico, navegação por teclado, foco visível.
- `alt` em todas as imagens, rótulos em botões de ícone.
- Não depender só de cor para indicar estado (concluída/atual).
- Quiz e cards que viram devem funcionar com leitor de tela.

## Etapas de trabalho

Faça uma etapa por vez e **pare para eu validar** ao fim de cada uma:

1. **Briefing e direção visual:** proponha paleta, tipografia e tom (usando as skills). Aguarde minha aprovação.
2. **Setup do projeto** (Vite, React, TS, Tailwind, Framer Motion) e estrutura de pastas.
3. **Arquivo de dados** e esqueleto da trilha com paradas vazias.
4. **Blocos de conteúdo** com estados vazios.
5. **Progresso** (localStorage) e navegação entre paradas.
6. **Animações** e polimento visual.
7. **Revisão:** acessibilidade, desempenho, teste em viewport de celular.
8. **Deploy** e geração de um **QR code** apontando para o site publicado (para o cartaz da feira).

## Como me comunicar

- Responda em português do Brasil.
- Seja direto: diga o que fez e qual o próximo passo.
- Se algo for ambíguo, pergunte antes de construir em cima de um palpite.
- Não adicione funcionalidades que não estão neste arquivo sem me consultar.

## Quando eu enviar o conteúdo

Eu vou mandar, por parada: título, textos, imagens, perguntas de quiz, depoimentos e quais blocos usar. Você deve:

1. Preencher `src/data/trilha.ts` exatamente com o que eu enviei, sem reescrever nem acrescentar fatos.
2. Sinalizar o que faltar (imagem sem legenda, quiz sem resposta correta, etc.) em vez de preencher por conta própria.
3. Otimizar as imagens recebidas.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, Framer Motion para animações, Tailwind CSS (ou CSS Modules, se justificado). Site 100% estático, sem backend; progresso em `localStorage`. Deploy em Vercel ou Netlify. (Definido no CLAUDE.md.)

## Users

Visitantes de uma feira escolar sobre multiculturalismo focada em Maria da Fé (MG). Chegam pelo QR code do cartaz, quase todos no celular, muitas vezes com internet ruim, possivelmente em pé, ao ar livre e sob sol forte. Percorrem a trilha parada por parada enquanto andam pela feira.

## Product Purpose

Site-guia interativo em forma de trilha vertical (roadmap): o visitante abre cada parada, interage com o conteúdo (texto, imagens, cards que viram, linha do tempo, quiz, depoimentos, mídia) e marca a parada como concluída. Sucesso: o visitante entende e se envolve com o conteúdo de cada parada e chega ao fim da trilha.

## Positioning

É a trilha da própria feira, feita pelos alunos, sobre a própria cidade: conta Maria da Fé por paradas, como uma caminhada, e não como um site institucional ou de museu.

## Operating Context

- Feira escolar presencial; acesso via QR code em cartaz.
- Prazo: 18 de novembro de 2026.
- Uso em celular (360px como base), conexão 3G/4G fraca, luz forte.
- Navegação livre entre paradas; progresso salvo no aparelho, com opção de reiniciar.

## Capabilities and Constraints

- 8 paradas por padrão, número fácil de mudar; todo o conteúdo em um único arquivo de dados (`src/data/trilha.ts`).
- Blocos reutilizáveis: texto, imagem/galeria, cards que viram, linha do tempo, quiz rápido, depoimento, áudio/vídeo.
- Fora do escopo: mural coletivo, mapa interativo, selo/passaporte final, login, backend, layout específico de desktop.
- Modo claro por padrão; modo escuro opcional. PWA opcional.

## Brand Commitments

- Organização: Escola Estadual Nossa Senhora de Lourdes (Rua Padre Juca, 225, Maria da Fé), confirmada pelo usuário em 18/10/2026. A feira é da escola, que também a organiza. O nome da escola pode ser citado no site.
- Só o nome da feira/trilha está definido; não há logo, cores nem cartaz. O site define a identidade, e o cartaz com QR code segue o site.
- Nome provisório usado no CLAUDE.md: "Trilha Multicultural de Maria da Fé" (confirmar nome final).
- Tom: acolhedor e humano, "contar história" em vez de "museu".
- Idioma: português do Brasil.

## Direção visual (definida e aprovada pelo usuário em 18/10/2026)

- Baseada na fachada da escola: tijolo aparente terracota, telhado de cerâmica, muro salmão, portão marrom-ferrugem, placa azul com letras brancas, paralelepípedo cinza e palmeiras. Clima: tijolo e pedra, calor de cidade pequena, acolhedor.
- Paleta (estimada a olho a partir de fotos; **não** são as cores oficiais da escola), já ajustada para WCAG AA: terracota `#AD4F39`, salmão `#E39B72`, azul-placa `#1F4E9E`, creme `#FBF3E8`, verde-palmeira `#3F6B4A`, marrom-portão `#523426`, cinza-pedra `#8C8A86` (só linhas), cinza-texto `#6E6B66`.
- Títulos em Archivo (larga e pesada, estilo letreiro de escola); texto em Atkinson Hyperlegible Next.
- Nós das paradas inspirados na placa azul, sem cópia literal. Estados também por forma: linha contínua/tracejada, ✓ e rótulos escritos.
- Proibido: usar fotos do Google Maps, recriar logo da escola ou afirmar que as cores são oficiais.
- Detalhes, contrastes e regras de uso: seção "Direção visual" do CLAUDE.md.

## Evidence on Hand

Nenhum conteúdo real ainda. Os textos, imagens, quizzes e depoimentos de cada parada serão enviados depois. Não se sabe ainda se haverá fotos próprias: o design precisa funcionar bem com e sem fotografia. Não inventar fatos, datas, nomes, pratos, tradições ou história de Maria da Fé; toda parada começa como modelo vazio, com exemplos claramente marcados.

## Product Principles

1. O conteúdo é dos alunos: o design emoldura, nunca inventa.
2. Funciona na pior condição da feira: celular simples, sol forte, internet ruim.
3. Caminhar, não estudar: cada parada é um passo curto e convidativo.
4. Nada trava: o visitante pode abrir qualquer parada a qualquer momento.

## Pendências

- [ ] **Etapa 7 (desempenho):** reduzir o arquivo da Archivo (`public/fonts/archivo-variavel.woff2`, 90 KB) com subset e/ou limitando eixos de largura e peso.
- [ ] **Nome final da trilha:** o usuário confirma depois; até lá, usar "Trilha Multicultural de Maria da Fé".
- [ ] **Pacote de animação:** manter `framer-motion` (decisão de 18/10/2026). Trocar para `motion` só numa etapa própria, se valer a pena.

## Accessibility & Inclusion

WCAG AA ou melhor (contraste para leitura sob sol), fonte base ≥16px, alvos de toque ≥44×44px, navegação por teclado com foco visível, estados que não dependem só de cor, quiz e cards legíveis por leitor de tela, respeito a `prefers-reduced-motion`.

# Plano de volta do modo offline

Use se o modo offline causar problema para os visitantes (por exemplo, site preso em arquivos velhos).
Os passos abaixo não foram executados nem testados na prática: são o plano, para ser seguido só se for preciso.

## Opção A: desativar o service worker (mantém o resto do site)

O navegador do visitante só troca o service worker se o arquivo `/sw.js` mudar. Por isso o kill switch precisa ser publicado com esse nome. A Vercel refaz o build a cada deploy, então não adianta copiar o arquivo para `dist/`: ele precisa entrar pelo código.

1. Em `vite.config.ts`, remova o plugin `VitePWA` (senão o Workbox gera um `sw.js` novo e sobrescreve o kill switch) e o `import` dele.
2. Copie o kill switch para a pasta pública: `cp docs/sw-desativar.js public/sw.js`.
3. Faça um commit com essas duas mudanças e publique: `npx vercel --prod --yes`.
4. Confira: `curl -s https://trilha-maria-da-fe.vercel.app/sw.js` deve mostrar o código do kill switch (e o cabeçalho `Cache-Control` do `sw.js` do `vercel.json` continua valendo).
5. Na próxima visita, o navegador baixa o novo `sw.js`, apaga os caches, remove o service worker e recarrega a aba.

Mantenha o `public/sw.js` publicado por algumas semanas, para quem ainda tem o service worker antigo. Depois disso ele pode ser apagado.

## Opção B: voltar a um deploy anterior pela Vercel

1. Abra o projeto `trilha-maria-da-fe` no painel da Vercel, aba Deployments.
2. Escolha o deploy anterior (a URL e o ID estão anotados no relatório da publicação).
3. Use "Promote to Production" (ou, pela linha de comando, `npx vercel rollback <URL-do-deploy-anterior>`).

Atenção: quem já recebeu o service worker continua com ele. Voltar o deploy NÃO apaga o service worker nem o cache nos aparelhos que já visitaram. Se o problema for o próprio service worker, use a opção A.

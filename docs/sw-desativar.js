// Service worker "kill switch": desativa o modo offline do site.
// Não faz parte do build. Veja docs/OFFLINE-PLANO-DE-VOLTA.md para saber como usar.
//
// Ao ser instalado ele assume na hora (skipWaiting); ao ativar apaga todos os caches,
// remove o próprio registro e recarrega as abas abertas, que passam a carregar direto da rede.

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    (async () => {
      const nomes = await caches.keys()
      await Promise.all(nomes.map((nome) => caches.delete(nome)))
      await self.registration.unregister()
      const abas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      await Promise.all(abas.map((aba) => aba.navigate(aba.url)))
    })(),
  )
})

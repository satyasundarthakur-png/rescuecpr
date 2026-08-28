// ResusPro Academy service worker — runtime caching so previously-visited pages and
// static assets keep working offline. Not a full offline-first rewrite of the SSR app:
// a page must be visited at least once (online) before it's available offline.

const CACHE_VERSION = 'rpa-v1'
const APP_SHELL = [
  '/manifest.json',
  '/offline.html',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  // Navigations (page loads): network-first, fall back to cache, then the offline page.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy))
          return res
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/offline.html')))
    )
    return
  }

  // Everything else (static assets, JS/CSS chunks, images): stale-while-revalidate.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone()
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy))
          }
          return res
        })
        .catch(() => cached)
      return cached || network
    })
  )
})

// Cambia esto por el nombre de tu repositorio
var GHPATH = '/KetoPlanner/';

// Elige un nombre único para el prefijo de tu cache
var APP_PREFIX = 'KetoPlanner';

// La versión de la cache. ¡Cámbiala (version_01, version_02...) cada vez que modifiques los archivos!
var VERSION = 'version_00';

// Los archivos que quieres que estén disponibles sin conexión
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  // Añade aquí otros archivos si los tuvieras, por ejemplo:
  // `${GHPATH}/css/estilos.css`,
  // `${GHPATH}/js/app.js`
]

// --- El resto del código del Service Worker (no necesitas cambiarlo) ---
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(APP_PREFIX + VERSION).then(function(cache) {
      return cache.addAll(URLS);
    })
  )
})

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
})

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      var cacheWhitelist = keyList.filter(function(key) {
        return key.indexOf(APP_PREFIX);
      })
      cacheWhitelist.push(APP_PREFIX + VERSION);
      return Promise.all(keyList.map(function(key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(keyList[i]);
        }
      }));
    })
  )
})

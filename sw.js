const CACHE_NAME = 'meal-planner-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  // Προσθέστε εδώ άλλα αρχεία που χρειάζονται cache (CSS, εικόνες, κλπ.)
];

// Εγγραφή κατά την εγκατάσταση του SW
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Παρέχει αρχεία από το cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

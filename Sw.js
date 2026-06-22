Sw · JS
// Service Worker minimal untuk ChatApp PWA
// Diperlukan supaya browser bisa menampilkan prompt "Install App"
 
const CACHE_NAME = 'chatapp-v1';
 
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
 
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
 
// Fetch handler minimal (pass-through, tidak cache apa-apa secara agresif)
// supaya app tetap selalu ambil data terbaru dari Firebase & server
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline - silakan cek koneksi internet Anda.', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
 

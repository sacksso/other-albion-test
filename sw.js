const CACHE = 'albion-v9';
const PRECACHE = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if(url.includes('albion-online-data.com')||url.includes('gameinfo.albiononline')||url.includes('corsproxy')||url.includes('allorigins')||url.includes('thingproxy')||url.includes('render.albiononline')){
    e.respondWith(fetch(e.request).catch(()=>new Response('[]',{headers:{'Content-Type':'application/json'}})));return;
  }
  if(url.endsWith('/')||url.endsWith('index.html')){
    e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match(e.request)));return;
  }
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(r&&r.status===200){caches.open(CACHE).then(c=>c.put(e.request,r.clone()));}return r;})));
});

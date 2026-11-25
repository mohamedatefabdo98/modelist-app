const V='modelist-v1',CDN=['cdn.jsdelivr.net','cdnjs.cloudflare.com','www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];
const keep=(r,x)=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x};
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 const mine=u.origin===location.origin;if(!mine&&!CDN.includes(u.hostname))return;
 if(mine){e.respondWith(fetch(r).then(x=>keep(r,x)).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>keep(r,x))))});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
      { url: '/', revision: '1' },
      { url: '/manifest.json', revision: '1' },
      { url: '/index.html', revision: '1' },
      { url: '/detailteam.html', revision: '1' },
      { url: '/matchteam.html', revision: '1' },
      { url: '/nav.html', revision: '1' },
      { url: '/push.js', revision: '1' },
      { url: '/img/icons-192.png', revision: '1' },
      { url: '/img/icons-512.png', revision: '1' },
      { url: '/pages/home.html', revision: '1' },
      { url: '/pages/favorite.html', revision: '1' },
      { url: '/css/materialize.min.css', revision: '1' },
      { url: '/js/nav.js', revision: '1' },
      { url: '/js/materialize.min.js', revision: '1' },
      { url: '/js/api.js', revision: '1' },
      { url: '/js/detteam.js', revision: '1' },
      { url: '/js/teams.js', revision: '1' },
      { url: '/js/db.js', revision: '1' },
      { url: '/js/idb.js', revision: '1' },
      { url: '/js/s-work.js', revision: '1' },
      ],{
      ignoreUrlParametersMatching: [/.*/]
    });
      
    workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/'),
      workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );
}else{
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    image: '/img/icons-512.png',
    badge: '/img/icons-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
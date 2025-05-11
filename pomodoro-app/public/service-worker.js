self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Pomodoro Timer';
  const options = {
    body: data.body || "Time's up!",
    icon: '/favicon.ico',
  };

  event.waitUntil(
    self.registration.showNotification(title, options).then(() => {
      // Send a message to the client to play the sound
      self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'PLAY_SOUND' });
        });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  if (event.data && event.data.type === 'TIMER_END') {
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'PLAY_SOUND' });
      });
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification

  // Play the sound when the notification is clicked
  event.waitUntil(
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'PLAY_SOUND' });
      });
    })
  );
});

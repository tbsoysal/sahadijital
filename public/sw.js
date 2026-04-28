self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Yeni Rezervasyon', {
      body: data.body,
      icon: '/images/sahadijital-logo.svg',
      badge: '/images/sahadijital-logo.svg',
      data: { url: data.url ?? '/dashboard' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? '/dashboard';
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((list) => {
        const existing = list.find((c) => c.url.includes('/dashboard'));
        return existing ? existing.focus() : clients.openWindow(url);
      }),
  );
});

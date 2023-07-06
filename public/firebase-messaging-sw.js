importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "senderId",
    appId: "appId",
    measurementId: "measurementId"
};

const app = firebase.initializeApp(firebaseConfig)

self.addEventListener('push', (event) => {
    const payload = event.data ? event.data.json() : null;
  
    if (payload) {
      const { title, body } = payload.notification;
  
      self.registration.showNotification(title, {
        body: body,
        // Additional options for the notification
      });
    }
});
  
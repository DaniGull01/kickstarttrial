importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyDckkMFvwoZTGzbGzcpEv4lC75pT7GwEwk",
  authDomain: "trustagent-4eebe.firebaseapp.com",
  projectId: "trustagent-4eebe",
  storageBucket: "trustagent-4eebe.firebasestorage.app",
  messagingSenderId: "252633537514",
  appId: "1:252633537514:web:40474647794c5678c33093",
});

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  // Show notification
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Change to your app's icon
  });
});

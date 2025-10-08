// Firebase Configuration
// ⚠️ INSTRUKCJA SETUP:
// 1. Wejdź na https://console.firebase.google.com
// 2. Kliknij "Add project" / "Dodaj projekt"
// 3. Podaj nazwę projektu (np. "cookie-card-builder")
// 4. Wybierz "Continue" i poczekaj na utworzenie projektu
// 5. W lewym menu wybierz "Realtime Database"
// 6. Kliknij "Create Database"
// 7. Wybierz lokalizację (np. europe-west1)
// 8. Zaznacz "Start in test mode" (później zmienimy na bezpieczne reguły)
// 9. Wróć do Project Overview (ikonka koła zębatego) → Project settings
// 10. Scroll w dół do "Your apps" → kliknij ikone Web (</>)
// 11. Zarejestruj aplikację (podaj nazwę np. "Cookie Card Builder")
// 12. Skopiuj firebaseConfig object i wklej poniżej

const firebaseConfig = {
  apiKey: "AIzaSyAPlUIMyaovU7myJDGQh-28gJw9qlAsm4I",
  authDomain: "cardbuilder-cookieapi.firebaseapp.com",
  databaseURL: "https://cardbuilder-cookieapi-default-rtdb.firebaseio.com",
  projectId: "cardbuilder-cookieapi",
  storageBucket: "cardbuilder-cookieapi.firebasestorage.app",
  messagingSenderId: "416388203733",
  appId: "1:416388203733:web:c2c430745292be24340e5c",
  measurementId: "G-NM9ZRVH25R"
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  console.log('✅ Database initialized');
  
  // Get database reference
  window.firebaseDB = firebase.database();
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.warn('⚠️ Analytics will fall back to localStorage. Please configure Firebase in js/firebase-config.js');
  window.firebaseDB = null;
}

// Helper function to check if Firebase is ready
window.isFirebaseReady = function() {
  return window.firebaseDB !== null && window.firebaseDB !== undefined;
};


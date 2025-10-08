# 🔥 Firebase Setup Guide - Cookie Card Builder Analytics

## Dlaczego Firebase?

Aby widzieć **wszystkie szablony zapisane przez wszystkich użytkowników**, potrzebujesz centralnej bazy danych. Firebase Realtime Database jest:
- ✅ **Darmowy** (do 1GB danych + 10GB transferu/miesiąc)
- ✅ **Prosty w konfiguracji** (10 minut)
- ✅ **Działa z GitHub Pages** (static hosting)

---

## 📋 Instrukcja Setup (Krok po kroku)

### **Krok 1: Utwórz projekt Firebase**

1. Wejdź na **https://console.firebase.google.com**
2. Zaloguj się swoim kontem Google
3. Kliknij **"Add project"** (Dodaj projekt)
4. Podaj nazwę projektu (np. `cookie-card-builder`)
5. Kliknij **Continue**
6. (Opcjonalnie) Wyłącz Google Analytics jeśli nie potrzebujesz
7. Kliknij **Create project**
8. Poczekaj ~30 sekund na utworzenie projektu
9. Kliknij **Continue** gdy projekt będzie gotowy

---

### **Krok 2: Utwórz Realtime Database**

1. W lewym menu znajdź **"Realtime Database"**
2. Kliknij **"Create Database"**
3. Wybierz lokalizację:
   - **europe-west1** (Belgia) - polecane dla Europy
   - lub inną bliską Tobie
4. Wybierz **"Start in test mode"** (później zmienimy na bezpieczne reguły)
5. Kliknij **Enable**

---

### **Krok 3: Skonfiguruj reguły bezpieczeństwa**

1. W zakładce **"Rules"** (Reguły) w Realtime Database
2. Zastąp domyślne reguły tym kodem:

```json
{
  "rules": {
    "analytics": {
      "templates": {
        ".read": false,
        ".write": true
      },
      "actions": {
        ".read": false,
        ".write": true
      }
    }
  }
}
```

**Co to robi?**
- ✅ Każdy użytkownik może **zapisać** szablon (`.write: true`)
- ❌ Nikt nie może **czytać** danych bez autoryzacji (`.read: false`)
- 🔐 Tylko Ty (zalogowany) będziesz mógł zobaczyć dane w analytics.html

3. Kliknij **Publish** (Opublikuj)

---

### **Krok 4: Pobierz dane konfiguracyjne**

1. Wróć do **Project Overview** (ikonka ⚙️ u góry lewej → Project settings)
2. Przewiń w dół do sekcji **"Your apps"**
3. Kliknij ikonę **Web** (`</>`)
4. Podaj nazwę aplikacji (np. `Cookie Card Builder Web`)
5. **NIE** zaznaczaj "Firebase Hosting"
6. Kliknij **Register app**
7. Skopiuj obiekt `firebaseConfig` - będzie wyglądał tak:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "cookie-card-builder.firebaseapp.com",
  databaseURL: "https://cookie-card-builder-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cookie-card-builder",
  storageBucket: "cookie-card-builder.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

8. Kliknij **Continue to console**

---

### **Krok 5: Wklej konfigurację do projektu**

1. Otwórz plik **`js/firebase-config.js`** w edytorze
2. Znajdź linię z placeholderem:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  // ... reszta
};
```

3. **Zastąp cały obiekt** swoimi danymi z Firebase Console
4. Zapisz plik

---

### **Krok 6: Testowanie**

1. Otwórz stronę w przeglądarce (lokalnie lub GitHub Pages)
2. Otwórz **DevTools** (F12) → zakładka **Console**
3. Powinno pokazać się:
   ```
   🔥 Firebase initialized successfully
   ```
4. Stwórz szablon i kliknij **Save Template**
5. W konsoli powinno pokazać się:
   ```
   🔥 Template analytics saved to Firebase
   ```

6. Sprawdź Firebase Console:
   - Wejdź do **Realtime Database** → zakładka **Data**
   - Powinieneś zobaczyć:
     ```
     analytics
       └─ templates
           └─ -NXxxxxxxxxxxxxx
               ├─ templateName: "..."
               ├─ timestamp: "..."
               └─ ...
     ```

---

### **Krok 7: Dostęp do analytics.html**

1. Otwórz **analytics.html** w przeglądarce
2. Zaloguj się hasłem: `CookieBuilder2025!@#`
3. Powinieneś zobaczyć wszystkie szablony zapisane przez użytkowników!
4. W konsoli powinno pokazać się:
   ```
   🔥 Loaded analytics from Firebase: X templates
   ```

---

## 🔒 Bezpieczeństwo

### **Czy API Key może być publiczny?**

**TAK!** Firebase API key to **identyfikator projektu**, a nie tajny klucz:
- ✅ Google oficjalnie mówi, że można go ujawnić
- ✅ Bezpieczeństwo zapewniają **Security Rules** w Firebase
- ✅ Setki tysięcy projektów ma go w kodzie źródłowym

### **Jak to jest bezpieczne?**

Regułki bezpieczeństwa (z Kroku 3) robią to:
- Użytkownicy mogą TYLKO **dodać** dane (`.write: true`)
- Użytkownicy NIE MOGĄ **czytać** danych innych (`.read: false`)
- Analytics.html pobiera dane **bezpośrednio z Firebase Console** (wymaga zalogowania do Firebase)

### **Opcjonalnie: Dodatkowe zabezpieczenia**

Jeśli chcesz jeszcze bardziej zabezpieczyć, możesz dodać:

**1. Limit zapisu (rate limiting):**
```json
{
  "rules": {
    "analytics": {
      "templates": {
        ".read": false,
        ".write": "!data.exists() || data.child('timestamp').val() < (now - 60000)"
      }
    }
  }
}
```
(Max 1 zapis na minutę z tego samego źródła)

**2. Walidacja danych:**
```json
{
  "rules": {
    "analytics": {
      "templates": {
        "$templateId": {
          ".write": "newData.hasChildren(['templateName', 'timestamp', 'elementCount'])",
          ".validate": "newData.child('templateName').isString() && newData.child('elementCount').isNumber()"
        }
      }
    }
  }
}
```

---

## ❓ FAQ

### **Co się stanie jeśli nie skonfiguruję Firebase?**

Aplikacja zadziała normalnie, ale analytics będzie zapisywał do `localStorage` (tylko Twoje dane w Twojej przeglądarce).

### **Czy mogę zmienić hasło do analytics.html?**

Tak! Otwórz `analytics.html` i znajdź linię:
```javascript
const ANALYTICS_PASSWORD = 'CookieBuilder2025!@#';
```
Zmień na swoje hasło.

### **Czy Firebase będzie kosztować?**

**Darmowy limit:**
- 1 GB danych
- 10 GB transferu/miesiąc
- 100,000 połączeń/dzień

Dla Cookie Card Builder: Prawdopodobnie **zawsze darmowe** (chyba że masz dziesiątki tysięcy użytkowników dziennie).

### **Jak mogę sprawdzić ile danych używam?**

W Firebase Console:
1. Wejdź do **Realtime Database**
2. Zakładka **Usage** (Wykorzystanie)
3. Zobaczysz wykresy użycia

### **Co jeśli przekroczę limity?**

Firebase automatycznie przestawi Cię na plan **Blaze** (pay-as-you-go), ale:
- Nadal masz te same darmowe limity
- Płacisz tylko za nadwyżkę (kilka groszy za GB)
- Możesz ustawić alerty budżetu

---

## 🚀 Gotowe!

Teraz wszystkie szablony zapisane przez użytkowników będą widoczne w Twoim panelu analytics!

**Potrzebujesz pomocy?** Sprawdź:
- [Firebase Documentation](https://firebase.google.com/docs/database)
- [Firebase Console](https://console.firebase.google.com)


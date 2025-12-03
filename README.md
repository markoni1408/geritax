# Geri Taxi - Flughafentransfer Wien Website

Professionelle Website für Geri Taxi, einen Flughafen-Taxi-Service in der Umgebung Wien mit Busservice für bis zu 70 Personen.

## 🚀 Projekt-Übersicht

Diese Website bietet eine moderne, responsive Online-Präsenz für Geri Taxi mit einem intelligenten Buchungsformular, das automatische Adresssuche und Preisberechnung unterstützt.

### Standort
- **Firma:** Geri Taxi
- **Ort:** Himberg bei Wien, Österreich
- **E-Mail:** info@geritaxi.at
- **Hauptflughafen:** Wien-Schwechat (VIE)

## ✨ Implementierte Features

### ✅ Vollständig implementiert

1. **Moderne, responsive Website**
   - Professionelles Design mit Taxi/Transport-Thema
   - Gelb-schwarzes Farbschema (charakteristisch für Taxis)
   - Voll responsiv für Desktop, Tablet und Mobile
   - Smooth Scrolling Navigation

2. **Hero-Bereich**
   - Attraktive Willkommens-Sektion
   - Hervorgehobene Hauptmerkmale (24/7, Flughafen, Busservice)
   - Call-to-Action Button zum Buchungsformular

3. **Services-Sektion**
   - 6 Service-Karten mit detaillierten Informationen:
     - Flughafentransfer
     - Premium Taxi
     - Busservice (bis 70 Personen)
     - Kostenlose Kindersitze
     - Gepäckservice
     - 24/7 Verfügbarkeit

4. **Intelligentes Buchungsformular**
   - Google Places Autocomplete für Von/Bis-Adressen
   - Automatische Preisberechnung basierend auf:
     - Fahrzeugtyp (Standard €39 / Premium €48 zum Flughafen)
     - Strecke (Fixpreise für Wien ↔ Flughafen)
     - Distanz-basierte Berechnung für andere Routen
   - Datum/Uhrzeit-Picker mit Standardwerten
   - Passagieranzahl und Kindersitz-Option
   - Kontaktdatenfelder (Name, E-Mail, Telefon)
   - Zusätzliche Notizen (z.B. Flugnummer)
   - E-Mail-Integration (mailto)

5. **Über uns-Sektion**
   - Firmenbeschreibung
   - Feature-Highlights (Erfahrung, Sicherheit, Zufriedenheit)
   - Animierte Statistiken (Counter-Animation beim Scrollen)

6. **Kontakt-Sektion**
   - Kontaktinformationen (Standort, Telefon, E-Mail, Öffnungszeiten)
   - Kontaktformular mit E-Mail-Integration

7. **Footer**
   - Umfassende Fußzeile mit Links
   - Social Media Icons
   - Mehrspaltiges Layout mit allen wichtigen Infos

8. **Zusätzliche Features**
   - Scroll-to-Top Button
   - Success Modal für Formular-Bestätigungen
   - Smooth Scroll Navigation
   - Active Navigation Highlighting

## 📋 Noch nicht implementierte Features

### ⚠️ Erfordert zusätzliche Konfiguration

1. **Google Maps API-Schlüssel**
   - Die Website benötigt einen gültigen Google Maps API-Schlüssel für:
     - Google Places Autocomplete (Adresssuche)
     - Directions API (Distanzberechnung)
   - **Aktion erforderlich:** API-Schlüssel in `index.html` einfügen (Zeile am Ende der Datei)
   - Zeile suchen: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places&language=de" async defer></script>`
   - `YOUR_API_KEY_HERE` durch echten API-Schlüssel ersetzen

2. **Telefonnummer**
   - Die Telefonnummer muss noch eingefügt werden
   - Platzhalter: `+43 XXX XXX XXXX`
   - Stellen zum Aktualisieren:
     - Footer (mehrere Stellen)
     - Kontakt-Sektion
     - Booking Info Sidebar
   - Suchen nach: `+43XXXXXXXXX` oder `+43 XXX XXX XXXX`

3. **Backend für Buchungen**
   - Aktuell nutzt die Website `mailto:` Links
   - Für professionelle Nutzung empfohlen:
     - Server-seitiges Formular-Handling
     - Datenbank für Buchungen
     - E-Mail-Benachrichtigungssystem
     - SMS-Bestätigungen (optional)

4. **Zusätzliche Seiten**
   - Impressum
   - Datenschutzerklärung
   - AGB (Allgemeine Geschäftsbedingungen)
   - Cookie-Hinweis (falls erforderlich)

## 🛠️ Technologie-Stack

- **HTML5** - Semantische Struktur
- **CSS3** - Modernes Styling mit CSS Variables
- **JavaScript (Vanilla)** - Interaktivität und Formular-Logik
- **Google Fonts** - Inter Font Family
- **Font Awesome 6.4.0** - Icons
- **Google Maps API** - Places Autocomplete & Directions (erfordert API-Schlüssel)

## 📁 Dateistruktur

```
/
├── index.html              # Hauptseite (Single Page Application)
├── css/
│   └── style.css          # Alle Styles
├── js/
│   └── main.js            # JavaScript-Funktionalität
└── README.md              # Diese Datei
```

## 🔧 Setup & Installation

### 1. Google Maps API-Schlüssel einrichten

1. Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes
3. Aktivieren Sie folgende APIs:
   - Places API
   - Directions API
   - Maps JavaScript API
4. Erstellen Sie einen API-Schlüssel
5. Fügen Sie den API-Schlüssel in `index.html` ein:

```html
<!-- Am Ende von index.html -->
<script src="https://maps.googleapis.com/maps/api/js?key=IHR_API_SCHLÜSSEL&libraries=places&language=de&callback=initGoogleMaps" async defer></script>
```

### 2. Telefonnummer hinzufügen

Suchen und ersetzen Sie alle Vorkommen von:
- `+43XXXXXXXXX`
- `+43 XXX XXX XXXX`

Mit Ihrer echten Telefonnummer.

### 3. Website testen

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Testen Sie das Buchungsformular
3. Überprüfen Sie die Responsivität (Mobile, Tablet, Desktop)

## 💰 Preisgestaltung

### Fixpreise Wien ↔ Flughafen Wien-Schwechat

| Fahrzeugtyp | Preis |
|-------------|-------|
| Standard Taxi | €39 |
| Premium Taxi | €48 |
| Busservice (bis 70 Personen) | Auf Anfrage |

### Berechnung für andere Strecken

- **Standard Taxi:** Basispreis €39 + €2,50/km
- **Premium Taxi:** Basispreis €48 + €3,50/km
- **Busservice:** Individuelles Angebot

## 🎨 Anpassungsmöglichkeiten

### Farben ändern

Bearbeiten Sie die CSS-Variablen in `css/style.css`:

```css
:root {
    --primary-color: #FFC107;      /* Taxi-Gelb */
    --primary-dark: #FFA000;
    --secondary-color: #212121;     /* Dunkelgrau/Schwarz */
    --accent-color: #FF5722;        /* Akzentfarbe */
    /* ... weitere Farben */
}
```

### Preise anpassen

Bearbeiten Sie die Preis-Konfiguration in `js/main.js`:

```javascript
const PRICING = {
    standard: {
        name: 'Standard Taxi',
        basePrice: 39,
        pricePerKm: 2.5,
        // ...
    },
    premium: {
        name: 'Premium Taxi',
        basePrice: 48,
        pricePerKm: 3.5,
        // ...
    }
};
```

### Inhalte ändern

Alle Texte und Inhalte können direkt in `index.html` bearbeitet werden.

## 📱 Responsive Breakpoints

- **Desktop:** > 968px
- **Tablet:** 768px - 968px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

## 🔍 SEO & Performance

### Bereits implementiert:
- Semantisches HTML5
- Meta-Beschreibung
- Optimierte Überschriften-Hierarchie (H1, H2, H3)
- Alt-Text für Icons (über Font Awesome)
- Mobile-friendly Design

### Empfohlene Verbesserungen:
- Open Graph Tags für Social Media
- Strukturierte Daten (Schema.org) für Local Business
- Sitemap.xml erstellen
- Robots.txt hinzufügen
- Bilder komprimieren und optimieren
- Service Worker für Offline-Funktionalität (optional)

## 📧 E-Mail Integration

Die Website nutzt aktuell `mailto:` Links für Buchungen und Kontaktanfragen. Dies öffnet automatisch das E-Mail-Programm des Nutzers.

**Für eine professionelle Lösung empfehlen wir:**
- Server-seitiges Formular-Handling (PHP, Node.js, etc.)
- E-Mail-Service wie SendGrid, Mailgun oder Amazon SES
- Speicherung der Buchungen in einer Datenbank

## 🚀 Deployment

### Option 1: Statisches Hosting
Die Website kann auf jedem statischen Hosting-Service bereitgestellt werden:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Option 2: Mit Backend
Für vollständige Funktionalität (Datenbank, Server-seitige Formulare):
- VPS (Virtual Private Server)
- Shared Hosting mit PHP
- Cloud-Plattformen (AWS, Google Cloud, Azure)

## 📝 Verwendete APIs & Libraries

- **Google Maps JavaScript API** (erfordert API-Schlüssel)
- **Google Places API** (erfordert API-Schlüssel)
- **Google Directions API** (erfordert API-Schlüssel)
- **Font Awesome 6.4.0** (via CDN)
- **Google Fonts - Inter** (via CDN)

## ⚡ Performance-Optimierungen

- CSS und JavaScript in externen Dateien (besseres Caching)
- Verwendung von CDN für Libraries
- Moderne CSS (Flexbox, Grid)
- Effizientes JavaScript (keine schweren Frameworks)
- Lazy Loading für Google Maps

## 🐛 Bekannte Einschränkungen

1. **Google Maps API-Abhängigkeit**
   - Ohne API-Schlüssel funktioniert die Adresssuche nicht
   - Fallback-Meldung wird angezeigt

2. **E-Mail-Versand**
   - `mailto:` Links hängen vom E-Mail-Client des Nutzers ab
   - Nicht alle Nutzer haben einen E-Mail-Client konfiguriert

3. **Buchungsbestätigung**
   - Keine automatische Bestätigungs-E-Mail
   - Keine Buchungsnummer-Generierung

## 🔐 Sicherheit

### Zu beachten für Produktionsumgebung:

1. **Google Maps API-Schlüssel absichern**
   - API-Schlüssel einschränken (HTTP Referrer)
   - Tägliche Quota festlegen
   - Nur benötigte APIs aktivieren

2. **Formular-Validierung**
   - Client-seitige Validierung ist implementiert
   - Server-seitige Validierung hinzufügen (bei Backend-Integration)

3. **HTTPS verwenden**
   - Immer HTTPS für Produktions-Website
   - Google Maps API erfordert HTTPS für viele Features

## 📞 Support & Kontakt

Für technischen Support oder Fragen zur Website:
- **E-Mail:** info@geritaxi.at
- **Standort:** Himberg bei Wien

## 📜 Lizenz

Diese Website wurde speziell für Geri Taxi erstellt.

---

## 🎯 Nächste Schritte

1. ✅ **Google Maps API-Schlüssel hinzufügen** (WICHTIG!)
2. ✅ **Telefonnummer einfügen** (an allen Stellen)
3. ⚠️ **Backend-Integration planen** (für professionelle Buchungen)
4. ⚠️ **Rechtliche Seiten erstellen** (Impressum, Datenschutz, AGB)
5. ⚠️ **Echte Bilder hinzufügen** (Fahrzeugflotte, Team, etc.)
6. ⚠️ **Social Media Links aktualisieren**
7. ⚠️ **SEO optimieren** (Meta-Tags, strukturierte Daten)
8. ⚠️ **Testing** (verschiedene Browser und Geräte)
9. ⚠️ **Deployment** (Website online stellen)

---

**Erstellt:** 2024  
**Version:** 1.0  
**Status:** Produktionsbereit (nach API-Schlüssel-Integration)
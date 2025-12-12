# 🌍 Live API-Dokumentation

# 👉 [https://<sitename>.netlify.app/](https://apiadresse.netlify.app/)

## Free APIs Directory

Ein Full-Stack Webprojekt zur Anzeige und Filterung kostenloser APIs, gebaut mit React, Vite, Tailwind CSS, Node.js und Express.

## Technologie-Stack

### Frontend
- **React 18** - Moderne UI-Bibliothek
- **Vite** - Schnelles Build-Tool
- **Tailwind CSS** - Utility-First CSS Framework

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **CORS** - Cross-Origin Resource Sharing

## Projektstruktur

```
VS_code/
├── backend/
│   ├── data/
│   │   └── freeAPIs.json          # API-Daten
│   ├── server.js                   # Express Server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Hauptkomponente
│   │   ├── main.jsx                # React Entry Point
│   │   └── index.css               # Tailwind Styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

Der Backend-Server läuft auf `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft auf `http://localhost:3000`

## Features

### Live-Suche (Debounced)
- Suche nach API-Name oder Beschreibung
- Echtzeit-Filterung ohne Verzögerung

### Kategorie-Filter
- Filtere APIs nach Kategorien
- Dynamische Kategorie-Buttons

### Responsive Design
- Optimiert für Desktop, Tablet und Mobile
- Card-basierte UI mit Hover-Effekten

### API-Informationen
- Name, Beschreibung, Kategorie
- Authentifizierungstyp (No Auth, API Key, OAuth)
- Direktlink zur Dokumentation

## API Endpoints

### `GET /api/apis`
Gibt alle APIs zurück

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": 1,
      "name": "OpenWeatherMap",
      "description": "Weather data...",
      "category": "Weather",
      "auth": "API Key",
      "url": "https://..."
    }
  ]
}
```

### `GET /health`
Health Check Endpoint

## Entwicklung

### Backend Entwicklungsmodus (mit Auto-Reload)
```bash
cd backend
npm run dev
```

### Frontend Entwicklungsmodus
```bash
cd frontend
npm run dev
```

### Production Build
```bash
cd frontend
npm run build
```

## Anpassungen

### Neue APIs hinzufügen
Bearbeite `backend/data/freeAPIs.json`:

```json
{
  "id": 21,
  "name": "Neue API",
  "description": "Beschreibung...",
  "category": "Kategorie",
  "auth": "No",
  "url": "https://example.com"
}
```

### Styling anpassen
Tailwind-Konfiguration: `frontend/tailwind.config.js`
Custom Styles: `frontend/src/index.css`

## Performance-Optimierungen

- **Vite** für schnelle Entwicklung und optimierte Builds
- **useMemo** für performante Filterung
- **Debounced Search** zur Reduzierung unnötiger Re-Renders
- **Lazy Loading** ready (kann bei Bedarf erweitert werden)

## Browser-Unterstützung

- Chrome/Edge (neueste 2 Versionen)
- Firefox (neueste 2 Versionen)
- Safari (neueste 2 Versionen)

**Umgebungsvariablen:**
Für Production solltest du in `frontend/vite.config.js` eine Umgebungsvariable nutzen:

```javascript
server: {
  proxy: {
    '/api': {
      target: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    }
  }
}
```

## Lizenz

MIT

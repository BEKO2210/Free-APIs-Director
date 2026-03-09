# 🌍 Live API-Dokumentation

## 👉 Deployment-URL: Konfiguriere deine eigene Netlify/Vercel/Render-URL

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

Das Frontend läuft auf `http://localhost:3000` (wie in `vite.config.js` konfiguriert)

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

Lege optional eine Datei `frontend/.env` an:

```bash
VITE_API_BASE_URL=https://dein-backend.example.com
VITE_API_PROXY_TARGET=http://localhost:3001
```

- `VITE_API_BASE_URL`: Wird im Browser für Requests verwendet (z. B. Render-URL in Production).  
- `VITE_API_PROXY_TARGET`: Wird nur vom Vite-Dev-Server als Proxy-Ziel genutzt.

## Lizenz

MIT

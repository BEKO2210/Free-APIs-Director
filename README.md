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

## Deployment auf GitHub & Live-Hosting

### Option 1: GitHub Pages + Vercel/Netlify (Empfohlen)

#### Schritt 1: GitHub Repository erstellen

```bash
# Im Projektordner VS_code
git init
git add .
git commit -m "Initial commit: Free APIs Directory"
```

Dann auf GitHub:
1. Gehe zu [github.com](https://github.com) und erstelle ein neues Repository
2. Kopiere die Repository-URL
3. Führe folgende Befehle aus:

```bash
git remote add origin https://github.com/DEIN-USERNAME/DEIN-REPO-NAME.git
git branch -M main
git push -u origin main
```

#### Schritt 2: Frontend auf Netlify deployen (Kostenlos)

1. Gehe zu [netlify.com](https://netlify.com) und melde dich an
2. Klicke auf "Add new site" → "Import an existing project"
3. Wähle dein GitHub Repository
4. Build-Einstellungen:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Klicke auf "Deploy site"

#### Schritt 3: Backend auf Render deployen (Kostenlos)

1. Gehe zu [render.com](https://render.com) und melde dich an
2. Klicke auf "New +" → "Web Service"
3. Verbinde dein GitHub Repository
4. Einstellungen:
   - **Name:** free-apis-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Klicke auf "Create Web Service"
6. Kopiere die URL (z.B. `https://free-apis-backend.onrender.com`)

#### Schritt 4: Frontend mit Backend verbinden

Bearbeite `frontend/src/App.jsx` und ersetze:
```javascript
const response = await fetch('http://localhost:3001/api/apis');
```

Mit:
```javascript
const response = await fetch('https://DEINE-RENDER-URL.onrender.com/api/apis');
```

Dann pushe die Änderungen:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Netlify wird automatisch neu deployen!

---

### Option 2: Vercel (All-in-One, Kostenlos)

1. Gehe zu [vercel.com](https://vercel.com) und melde dich an
2. Klicke auf "Add New..." → "Project"
3. Importiere dein GitHub Repository
4. Vercel erkennt automatisch die Konfiguration
5. Klicke auf "Deploy"

---

### Option 3: Render (All-in-One, Kostenlos)

Nutze die `render.yaml` Datei:
1. Pushe dein Projekt auf GitHub
2. Gehe zu [render.com](https://render.com)
3. Klicke auf "New +" → "Blueprint"
4. Verbinde dein GitHub Repository
5. Render deployed automatisch Frontend + Backend

---

### Wichtige Hinweise

**Kostenlose Hosting-Limits:**
- **Netlify:** 100 GB Bandbreite/Monat
- **Vercel:** 100 GB Bandbreite/Monat
- **Render:** Backend schläft nach 15 Min. Inaktivität (erste Anfrage dauert ~30 Sek.)

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

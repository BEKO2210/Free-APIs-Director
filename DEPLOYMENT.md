# Schritt-für-Schritt: Deployment Guide

## Schnellstart (5 Minuten)

### 1. Auf GitHub hochladen

```bash
# Terminal öffnen im Ordner VS_code
git init
git add .
git commit -m "Initial commit: Free APIs Directory"
```

Dann:
1. Gehe zu https://github.com/new
2. Repository Name: `free-apis-directory` (oder beliebiger Name)
3. Klicke auf "Create repository"
4. Kopiere die Befehle unter "…or push an existing repository from the command line"

Beispiel:
```bash
git remote add origin https://github.com/DEIN-USERNAME/free-apis-directory.git
git branch -M main
git push -u origin main
```

---

### 2. Backend live stellen (Render.com - Kostenlos)

1. Gehe zu https://render.com
2. Klicke auf "Get Started for Free" und melde dich mit GitHub an
3. Klicke auf "New +" → "Web Service"
4. Wähle dein Repository `free-apis-directory`
5. Fülle die Felder aus:

```
Name: free-apis-backend
Region: Frankfurt (oder nächstgelegene)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

6. Klicke auf "Create Web Service"
7. **WICHTIG:** Kopiere die URL (z.B. `https://free-apis-backend.onrender.com`)

---

### 3. Frontend live stellen (Netlify - Kostenlos)

1. Gehe zu https://app.netlify.com
2. Klicke auf "Add new site" → "Import an existing project"
3. Wähle "Deploy with GitHub"
4. Wähle dein Repository `free-apis-directory`
5. Fülle die Felder aus:

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

6. Klicke auf "Deploy site"
7. **Warte ca. 2-3 Minuten**

---

### 4. Frontend mit Backend verbinden

Jetzt musst du die Backend-URL im Frontend eintragen:

1. Öffne `frontend/src/App.jsx`
2. Suche nach Zeile ~19: `const response = await fetch('http://localhost:3001/api/apis');`
3. Ersetze durch:
```javascript
const response = await fetch('https://DEINE-RENDER-URL.onrender.com/api/apis');
```

Beispiel:
```javascript
const response = await fetch('https://free-apis-backend.onrender.com/api/apis');
```

4. Speichern und pushen:
```bash
git add frontend/src/App.jsx
git commit -m "Update API URL for production"
git push
```

5. Netlify deployed automatisch neu (1-2 Minuten)

---

## Fertig!

Deine Website ist jetzt live:
- **Frontend:** `https://dein-projekt.netlify.app`
- **Backend:** `https://free-apis-backend.onrender.com`

---

## Alternative: Alles auf Vercel (einfacher, aber manchmal langsamer)

### Nur Backend auf Vercel:

1. Gehe zu https://vercel.com
2. Klicke auf "Add New..." → "Project"
3. Importiere dein GitHub Repo
4. Framework: Other
5. Root Directory: `backend`
6. Build Command: (leer lassen)
7. Output Directory: (leer lassen)
8. Install Command: `npm install`

---

## Troubleshooting

### Problem: "API lädt nicht"

**Lösung:** CORS-Problem. Öffne `backend/server.js` und stelle sicher, dass diese Zeile vorhanden ist:
```javascript
app.use(cors());
```

### Problem: "Render Backend schläft ein"

**Lösung:** Das ist normal bei Free Tier. Die erste Anfrage dauert 30 Sekunden, danach ist es schnell.

Alternative: Nutze https://railway.app (500h/Monat kostenlos)

### Problem: "Build schlägt fehl"

**Lösung:** Stelle sicher, dass `package.json` in beiden Ordnern vorhanden ist:
- `backend/package.json`
- `frontend/package.json`

---

## Custom Domain (optional)

### Auf Netlify:
1. Domain Settings → Add custom domain
2. Folge den DNS-Anweisungen deines Domain-Providers

### Auf Render:
1. Settings → Custom Domain
2. Füge deine Domain hinzu

---

## Kostenlose Hosting-Übersicht

| Service | Frontend | Backend | Limits |
|---------|----------|---------|--------|
| **Netlify** | ✅ | ❌ | 100 GB/Monat |
| **Vercel** | ✅ | ✅ | 100 GB/Monat |
| **Render** | ✅ | ✅ | 750h/Monat (schläft nach 15 Min.) |
| **Railway** | ✅ | ✅ | 500h/Monat (kein Sleep) |
| **Fly.io** | ✅ | ✅ | 3 Apps kostenlos |

---

## Empfohlene Kombination

**Best Performance:**
- Frontend: Netlify
- Backend: Railway oder Fly.io

**Einfachste Lösung:**
- Alles auf Vercel (mit vercel.json)

**Komplett kostenlos, kein Sleep:**
- Frontend: Netlify
- Backend: Railway (500h = ~20 Tage non-stop)

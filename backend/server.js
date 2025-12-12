// Backend Server - Express.js mit CORS-Unterstützung
import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES Module __dirname Alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // CORS für Frontend-Zugriff aktivieren
app.use(express.json());

// Route: API-Daten bereitstellen
app.get('/api/apis', async (req, res) => {
  try {
    const dataPath = join(__dirname, 'data', 'freeAPIs.json');
    const data = await readFile(dataPath, 'utf-8');
    const apis = JSON.parse(data);

    res.json({
      success: true,
      count: apis.length,
      data: apis
    });
  } catch (error) {
    console.error('Error reading API data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load API data'
    });
  }
});

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/apis`);
});

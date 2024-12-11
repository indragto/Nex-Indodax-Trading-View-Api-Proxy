import express from 'express';  // Menggunakan import
import fetch from 'node-fetch';  // Menggunakan import untuk node-fetch
import cors from 'cors';

const app = express();
const port = 3001;

// Menambahkan middleware CORS
app.use(cors());

// Endpoint proxy yang menerima parameter 'coin'
app.get('/api/depth', async (req, res) => {
  const { coin } = req.query;  // Mendapatkan parameter coin dari query string

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  // Membuat URL API berdasarkan parameter coin
  const apiUrl = `https://indodax.com/api/depth/${coin}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);  // Mengirimkan data yang diterima dari Indodax ke frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Menjalankan server di port yang ditentukan
app.listen(port, () => {
  console.log(`Proxy server berjalan di http://localhost:${port}`);
});

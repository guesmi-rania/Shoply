require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS — gère automatiquement le preflight OPTIONS
app.use(cors({
  origin: [
    'https://guesmi-rania.github.io',
    'http://localhost:4200'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => res.send('🚀 Shoply API running'));

app.listen(PORT, () => {
  console.log(`Backend on http://localhost:${PORT}`);

  setInterval(() => {
    https.get('https://shoply-backend-mbhq.onrender.com/', (res) => {
      console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log('Ping error:', err.message);
    });
  }, 840000);
});
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const path = require('path');
const secondChanceItemsRoutes = require('./routes/secondChanceItemsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/secondchance/items', secondChanceItemsRoutes);
app.use('/api/secondchance/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  req.log?.error(error);
  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;

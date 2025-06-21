require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const animeRoutes = require('./routes/animeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/anime', animeRoutes);

const PORT = process.env.PORT || 5000;

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Connecting to MongoDB...');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

process.on('warning', e => {
  if (e.name === 'DeprecationWarning' && e.message.includes('punycode')) {
    // Suppress punycode deprecation warning
    return;
  }
  console.warn(e.stack);
});

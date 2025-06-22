process.env.NODE_ENV = 'test';
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.test') });
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Anime = require('../models/Anime');

describe('Anime API Integration', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  }, 20000);

  beforeEach(async () => {
    await Anime.deleteMany({});
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/anime should return array', async () => {
    const res = await request(app).get('/api/anime');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);
});

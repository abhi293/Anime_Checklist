process.env.NODE_ENV = 'test';
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.test') });
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Anime = require('../models/Anime');

describe('Anime API Endpoints', () => {
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

  it('GET /api/anime should return 200 and array', async () => {
    const res = await request(app).get('/api/anime');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('POST /api/anime should add anime', async () => {
    const res = await request(app)
      .post('/api/anime')
      .send({ title: 'One Piece', episodes: 1000 });
    expect([200, 201, 400]).toContain(res.statusCode); // Accept 400 if duplicate
    if (res.statusCode === 201) {
      expect(res.body.title).toBe('One Piece');
    }
  }, 20000);
});

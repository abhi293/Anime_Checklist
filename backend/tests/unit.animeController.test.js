// Unit tests for animeController.js
const animeController = require('../controllers/animeController');
const Anime = require('../models/Anime');

jest.mock('../models/Anime');

describe('Anime Controller - Unit', () => {
  afterEach(() => jest.clearAllMocks());

  it('should get all anime', async () => {
    const req = {};
    const res = { json: jest.fn() };
    const mockAnime = [{ title: 'Naruto' }];
    Anime.find.mockResolvedValue(mockAnime);
    await animeController.getAllAnime(req, res);
    expect(res.json).toHaveBeenCalledWith(mockAnime);
  });

  it('should add a new anime', async () => {
    const req = { body: { title: 'Bleach' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    Anime.findOne.mockResolvedValue(null);
    Anime.prototype.save = jest.fn().mockResolvedValue(req.body);
    await animeController.addAnime(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});

const Anime = require('../models/Anime');

// Get all anime
exports.getAllAnime = async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.json(animeList);
  } catch (err) {
    console.error('getAllAnime error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Add new anime
exports.addAnime = async (req, res) => {
  try {
    // Check if anime with the same title already exists (case-insensitive)
    const existing = await Anime.findOne({ title: { $regex: `^${req.body.title}$`, $options: 'i' } });
    if (existing) {
      return res.status(400).json({ error: 'Anime already exists in the checklist.' });
    }
    const anime = new Anime(req.body);
    await anime.save();
    res.status(201).json(anime);
  } catch (err) {
    console.error('addAnime error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update anime
exports.updateAnime = async (req, res) => {
  try {
    const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!anime) return res.status(404).json({ error: 'Anime not found' });
    res.json(anime);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete anime
exports.deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) return res.status(404).json({ error: 'Anime not found' });
    res.json({ message: 'Anime deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Toggle watched status
exports.toggleWatched = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ error: 'Anime not found' });
    anime.watched = !anime.watched;
    await anime.save();
    res.json(anime);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

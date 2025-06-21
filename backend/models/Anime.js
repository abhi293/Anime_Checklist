const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Watching', 'Completed', 'Dropped', 'Plan to Watch'], default: 'Watching' },
  rating: { type: Number, min: 0, max: 10 },
  notes: { type: String },
  watched: { type: Boolean, default: false },
  coverUrl: { type: String }, // Add cover image URL
}, { timestamps: true });

module.exports = mongoose.model('Anime', animeSchema);

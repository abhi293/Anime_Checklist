const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.get('/', animeController.getAllAnime);
router.post('/', animeController.addAnime);
router.put('/:id', animeController.updateAnime);
router.delete('/:id', animeController.deleteAnime);
router.patch('/:id/toggle-watched', animeController.toggleWatched);

module.exports = router;

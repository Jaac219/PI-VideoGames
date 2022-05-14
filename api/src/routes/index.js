const { Router } = require('express');

const videoGamesRouter = require('./videogames.js');
const videoGameRouter = require('./videogame.js');
const genresRouter = require('./genres.js');

const router = Router();

router.use('/videogames', videoGamesRouter);
router.use('/videogame', videoGameRouter);
router.use('/genres', genresRouter);

module.exports = router;
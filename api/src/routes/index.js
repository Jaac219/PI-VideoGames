const { Router } = require('express');

const videoGamesRouter = require('./videogames.js');
const videoGameRouter = require('./videogame.js');
const genresRouter = require('./genres.js');
const plataformsRouter = require('./plataforms.js');

const router = Router();

router.use('/videogames', videoGamesRouter);
router.use('/videogame', videoGameRouter);
router.use('/genres', genresRouter);
router.use('/plataforms', plataformsRouter);

module.exports = router;

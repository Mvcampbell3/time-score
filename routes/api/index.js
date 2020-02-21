const router = require('express').Router()
const user_routes = require('./user');
const game_routes = require('./game');
const highscore_routes = require('./highscore');

router.use('/user', user_routes);
router.use('/game', game_routes);
router.use('/highscore', highscore_routes);

module.exports = router;
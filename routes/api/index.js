const router = require('express').Router()
const user_routes = require('./user');
const game_routes = require('./game');

router.use('/user', user_routes);
router.use('/game', game_routes);

module.exports = router;
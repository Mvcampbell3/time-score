const router = require('express').Router();
const game_controller = require('../../controllers/game_controller');

router.route('/')
  .get(game_controller.getAllGames)

module.exports = router;
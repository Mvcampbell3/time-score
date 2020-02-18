const router = require('express').Router();
const game_controller = require('../../controllers/game_controller');

router.route('/')
  .get(game_controller.getAllGames)
  .post(game_controller.newGame)
  .delete(game_controller.deleteAllGames)

router.route('/id/:id')
  .get(game_controller.getOneGame)
  .delete(game_controller.deleteOneGame)

module.exports = router;
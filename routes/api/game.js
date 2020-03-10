const router = require('express').Router();
const game_controller = require('../../controllers/game_controller');
const checkAuth = require('../../middleware/checkAuth')

router.route('/')
  .get(game_controller.getAllGames)
  .post(checkAuth, game_controller.newGame)
  .delete(game_controller.deleteAllGames)

router.route('/id/:id')
  .get(game_controller.getOneGame)
  .delete(checkAuth, game_controller.deleteOneGame)

router.route('edit/:id')
  .get(checkAuth, game_controller.getEditInfo)

module.exports = router;
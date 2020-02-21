const router = require('express').Router();
const highscore_controller = require('../../controllers/highscore_controller');
const checkAuth = require('../../middleware/checkAuth');

router
router.route('/')
  .get(highscore_controller.getAllHighScores)
  .post(highscore_controller.createHighscore);

router.get('/game/:gameId', highscore_controller.getGameHighScores)
router.get('/test/:gameId', highscore_controller.getGameHighScoresWithGame)

router.get('/user/:userId', checkAuth, highscore_controller.getUserHighScores)


module.exports = router;

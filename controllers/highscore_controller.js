const db = require('../models');

module.exports = {
  getAllHighScores: (req, res) => {
    db.HighScore.find()
      .populate({ path: "game_id", select: "name" })
      .populate({ path: "user_id", select: "username" })
      .then(highscores => res.json(highscores))
      .catch(err => res.json(err));
  },

  getGameHighScores: (req, res) => {
    db.HighScore.find({ game_id: req.params.gameId })
      .populate({ path: 'game_id', select: 'name' })
      .populate({ path: 'user_id', select: 'username' })
      .then(gameHighscores => res.json(gameHighscores))
      .catch(err => res.json(err));
  },

  getGameHighScoresWithGame: (req, res) => {
    db.HighScore.find({ game_id: req.params.gameId })
      .populate({ path: "game_id", select: "name" })
      .populate({ path: "user_id", select: "username" })
      .limit(10)
      .sort('-total_score')
      .then(gameHighscores => res.json(gameHighscores))
      .catch(err => res.json(err));
  },

  // Uses checkAuth middleware for userid
  // Do we want to use checkAuth, or can anyone see a user's highscores?
  getUserHighScores: (req, res) => {
    console.log('get user highscores')
    db.HighScore.find({ user_id: req.user.id })
      .populate({ path: "game_id", select: "name" })
      .populate({ path: "user_id", select: "username" })
      .then(userHighscores => {
        console.log(userHighscores)
        res.json(userHighscores)
      })
      .catch(err => res.json(err));
  },

  createHighscore: (req, res) => {
    const { user_id, game_id, score, time_left } = req.body;
    const newScore = new db.HighScore({
      user_id, game_id, score, time_left
    })
    newScore.save()
      .then(score => res.json(score))
      .catch(err => res.json(err))
  },

  deleteHighscore: (req, res) => {
    db.HighScore.findOneAndDelete({ _id: req.params.id })
      .then(results => {
        res.json(results)
      })
      .catch(err => res.json(err))
  }
}
const db = require('../models');

module.exports = {
  getAllHighScores: (req, res) => {
    db.HighScore.find()
      .then(highscores => res.json(highscores))
      .catch(err => res.json(err));
  },

  getGameHighScores: (req, res) => {
    db.HighScore.find({ game_id: req.params.gameId })
      .then(gameHighscores => res.json(gameHighscores))
      .catch(err => res.json(err));
  },

  // Uses checkAuth middleware for userid
  getUserHighScores: (req, res) => {
    db.HighScore.find({ user_id: req.user.id })
      .then(userHighscores => res.json(userHighscores))
      .catch(err => res.json(err));
  }
}
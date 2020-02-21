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

  // Run checks on this when you have actuall high scores to load with game.
  getGameHighScoresWithGame: (req, res) => {
    db.HighScore.find({ game_id: req.params.gameId })
      .populate("game_id")
      .then(gameHighscores => res.json(gameHighscores))
      .catch(err => res.json(err));
  },

  // Uses checkAuth middleware for userid
  getUserHighScores: (req, res) => {
    db.HighScore.find({ user_id: req.user.id })
      .then(userHighscores => res.json(userHighscores))
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
  }
}
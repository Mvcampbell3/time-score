const db = require('../models/index');

module.exports = {
  getAllGames(req, res) {
    db.Game.find()
      .then(games => {
        res.json(games)
      })
      .catch(err => {
        res.json(err)
      })
  }
}
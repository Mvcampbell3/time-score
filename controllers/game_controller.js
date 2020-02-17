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
  },

  newGame(req, res) {
    const { name, description, instructions, creatorId, answers } = req.body;
    const newGame = new db.Game({
      name, description, instructions, creatorId, answers
    })
    newGame.save()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  // test route, need to add admin auth
  deleteAllGames(req, res) {
    db.Game.deleteMany()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  }

}
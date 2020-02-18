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
    const { name, description, instructions, creatorId, answers, inputPlaceholder } = req.body;
    const newGame = new db.Game({
      name, description, instructions, creatorId, answers, inputPlaceholder
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
  },

  getOneGame(req, res) {
    db.Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch(err => res.json(err))
  },

  deleteOneGame(req, res) {
    db.Game.findByIdAndDelete(req.params.id)
      .then(delGame => res.json(delGame))
      .catch(err => res.json(err))
  }

}
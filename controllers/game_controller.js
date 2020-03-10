const db = require('../models/index');

module.exports = {
  getAllGames: (req, res) => {
    db.Game.find()
      .then(games => {
        res.json(games)
      })
      .catch(err => {
        res.json(err)
      })
  },

  newGame: (req, res) => {
    const { name, description, instructions, creatorId, answers, inputPlaceholder } = req.body;
    const newGame = new db.Game({
      name, description, instructions, creatorId, answers, inputPlaceholder
    })
    newGame.save()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  // test route, need to add admin auth
  deleteAllGames: (req, res) => {
    db.Game.deleteMany()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  getOneGame: (req, res) => {
    db.Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch(err => res.json(err))
  },

  deleteOneGame: (req, res) => {
    db.Game.findById(req.params.id)
      .then(game => {
        console.log(typeof game.creatorId.toString(), typeof req.user.id)
        if (req.user.id === game.creatorId.toString()) {
          game.remove()
            .then(results => {
              console.log(results);
              res.json(results)
            })
            .catch(err => {
              console.log(err);
              res.json(err)
            })
        } else {
          res.status(401).json({ msg: 'Unauthorized' })
        }

      })
      .catch(err => {
        console.log(err);
        res.json(err)
      })
  }

}
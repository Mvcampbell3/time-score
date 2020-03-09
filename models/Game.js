const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  display_value: {
    type: String,
    required: true
  },

  accepted_values: {
    type: [String],
    requried: true
  }
})

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  inputPlaceholder: {
    type: String,
    default: 'Type Answer Here...'
  },

  description: {
    type: String,
    required: true
  },

  instructions: {
    type: String,
    required: true
  },

  answers: {
    type: [AnswerSchema]
  },

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

GameSchema.pre('remove', function(next) {
  const HighScore = require('./HighScore');
  console.log('games pre remove')
  HighScore.find({ game_id: this._id })
    .then(highscores => {
      console.log(highscores);
      let promiseArr = [];
      highscores.forEach(one => {
        promiseArr.push(one.remove())
      })
      Promise.all(promiseArr)
        .then(results => {
          console.log(results)
          next();
        })
        .catch(err => {
          console.log(err);
          next(err)
        })
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
})

module.exports = Game = mongoose.model('Game', GameSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighScoreSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  game_id: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  time_left: {
    type: Number,
    required: true
  }
})

HighScoreSchema.pre('save', function(next) {
  const User = require('./User');
  User.findByIdAndUpdate(this.user_id, { $push: { highScoreArray: this._id } })
    .then(result => {
      console.log(result)
      next()
    })
    .catch(err => {
      console.log(err)
    })
})

HighScoreSchema.pre('remove', function(next) {
  const User = require('./User');
  User.findByIdAndUpdate(this.user_id, { $pull: { highScoreArray: this._id } })
    .then(result => {
      console.log(result)
      next()
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = HighScore = mongoose.model('HighScore', HighScoreSchema);
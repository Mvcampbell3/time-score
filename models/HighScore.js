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
  },

  total_score: {
    type: Number,
    default: 0
  }
})

HighScoreSchema.pre('save', function(next) {
  this.total_score = this.score + this.time_left;
  const User = require('./User');
  User.findByIdAndUpdate(this.user_id, { $push: { highScoreArray: this._id } })
    .then(result => {
      // console.log(result)
      console.log('pushed highscore into user model')
      next()
    })
    .catch(err => {
      console.log(err)
    })
})

HighScoreSchema.pre('remove', function(next) {
  const User = require('./User');
  console.log('highscore pre remove');
  User.findOneAndUpdate({ "highScoreArray": { $in: this._id } }, { $pull: { 'highScoreArray': this._id } })
    .then(result => {
      console.log(result);
      next()
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
})



module.exports = HighScore = mongoose.model('HighScore', HighScoreSchema);


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

module.exports = HighScore = mongoose.model('HighScore', HighScoreSchema);
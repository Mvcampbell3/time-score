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

module.exports = Game = mongoose.model('Game', GameSchema)
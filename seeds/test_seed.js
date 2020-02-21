const db = require('../models');

module.exports = function() {
  const newGame = new db.Game({
    name: 'Test Game',
    description: 'Used for testing end game',
    instructions: 'Don\'t mess this up',
    inputPlaceholder: 'baseball football hockey',
    creatorId: '5e4467962d3d3180bc9cacd3',
    answers: [
      { display_value: 'Baseball', accepted_values: ['baseball'] },
      { display_value: 'Football', accepted_values: ['football'] },
      { display_value: 'Hockey', accepted_values: ['hockey'] },
    ]
  })

  newGame.save()
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
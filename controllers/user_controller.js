const db = require('../models');

module.exports = {
  getAllUsers: (req, res) => {
    db.User.find()
      .then(users => {
        console.log(users);
        res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  }
}
const db = require('../models');
const bcrypt = require('bcrypt');

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
      });
  },

  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))

    const newUser = new db.User({
      username,
      email,
      password: hash
    })

    newUser.save()
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.json(err)
      })
  }
};

const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // Dev Route
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

  // Dev Route
  deleteAllUsers: (req, res) => {
    db.User.deleteMany()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  createUser: async (req, res) => {
    // add checks for already existing email and username
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
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;
    db.User.findOne({ email })
      .then(async dbUser => {
        if (!dbUser) {
          return res.status(401).json({ msg: 'Unauthorized' });
        }

        const passMatch = await bcrypt.compare(password, dbUser.password);
        if (passMatch) {
          // jwt sign and send to client
          const payload = { email: dbUser.email, username: dbUser.username, id: dbUser._id };

          jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' }, (err, token) => {
            if (err) {
              return res.status(500).json({ error: 'Error while creating token' })
            }
            return res.status(200).json({ token })
          })
        } else {
          // incorrect pass
          res.status(401).json({ msg: 'Unauthorized' });
        }
      })
      // res send for db fail
      .catch(err => res.status(500).json({ error: 'Error while accessing database' }))
  }
};

const router = require('express').Router()
const user_controller = require('../../controllers/user_controller');

router.route('/')
  .get(user_controller.getAllUsers)
  .post(user_controller.createUser)

// router.delete('/delete:id', )

module.exports = router;
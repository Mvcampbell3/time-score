const router = require('express').Router()
const user_controller = require('../../controllers/user_controller');

// dev routes except for .post, which is signup 
router.route('/')
  .get(user_controller.getAllUsers)
  .post(user_controller.createUser)
  .delete(user_controller.deleteAllUsers)

router.post('/login', user_controller.loginUser)

module.exports = router;
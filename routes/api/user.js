const router = require('express').Router()
const user_controller = require('../../controllers/user_controller');
const checkAuth = require('../../middleware/checkAuth');

// dev routes except for .post, which is signup 
router.route('/')
  .get(user_controller.getAllUsers)
  .post(user_controller.createUser)
  .delete(user_controller.deleteAllUsers)

router.post('/login', user_controller.loginUser);

router.get('/checkAuth', checkAuth, user_controller.checkToken);

router.get('/profile', checkAuth, user_controller.userProfile);

module.exports = router;
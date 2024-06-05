const { Router } = require('express');
const { register, login, fillUserDetails, logout, changePassword, getUserInfo } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = Router();


router.route("/register-user").post(register);
router.route('/login-user').post(login);
router.route('/fill-details').post(auth, fillUserDetails);
router.route('/change-password').post(auth, changePassword);
router.route('/logout').post(auth, logout);
router.route('/user-info').get(auth, getUserInfo);
module.exports = router;
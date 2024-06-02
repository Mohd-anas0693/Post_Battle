const { Router } = require('express');
const { register, login, fillUserDetails, logout, changePassword } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = Router();


router.route("/register-user").post(register);
router.route('/login-user').post(auth,login);
router.route('/fill-details').post(auth,fillUserDetails);
router.route('/change-password').post(auth,changePassword);
router.route('/logout').post(auth,logout);
module.exports = router;
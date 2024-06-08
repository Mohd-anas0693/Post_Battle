const { Router } = require("express");
const { createPost, upvotePost } = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');
const { checkPostExist } = require('../middleware/post.middleware');
const router = Router();
router.route('/create-post').post(auth, createPost);
router.route('/upvote-post').post(auth, checkPostExist, upvotePost);
module.exports = router;
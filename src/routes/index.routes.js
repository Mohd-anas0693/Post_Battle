const { Router } = require('express');
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');

const router = Router();
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
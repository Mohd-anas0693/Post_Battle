const { Router } = require('express');
const userRouter = require('./user.routes');

const router = Router();
router.use("/user",userRouter);
module.exports = router;
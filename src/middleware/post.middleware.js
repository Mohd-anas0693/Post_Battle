const Post = require('../models/post.model');
const { Types } = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiErrors = require('../utils/apiErrors');
const { ErrorMessage } = require('../utils/message');

const checkPostExist = asyncHandler(async (req, res, next) => {
    const postId = req.params?.id;
    if (!stringPostId) {
        throw new ApiErrors(400, "no id found in params");
    }
    const post = await Post.findById(Types.ObjectId(postId));
    if (!post) {
        throw new ApiErrors(400, ErrorMessage.noUserFound);
    }
    const now = new Date();
    if (post.expireTime < now && post.isArchived) {
        post.isArchived = false;
        post.save();
    }
    req.post = post;
    next()
})


module.exports = { checkPostExist }
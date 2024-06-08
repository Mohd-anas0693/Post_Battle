const Queue = require('bull');
const Post = require('../models/post.model');
const ApiErrors = require('../utils/apiErrors');
const { ErrorMessage } = require('../utils/message');

const postQueue = new Queue('post-expiration', {
    redis: {
        host: `${process.env.REDIS_HOST}`,
        port: process.env.REDIS_PORT
    }
});
postQueue.process(async (job) => {
    console.log(postQueue)
    const postId = job.data.postId;
    const post = await Post.findById(postId);
    if (!post) {
        new ApiErrors(404, ErrorMessage.somethingWrong);
    }
    post.isArchived = false;
    await post.save();
})
module.exports = postQueue;

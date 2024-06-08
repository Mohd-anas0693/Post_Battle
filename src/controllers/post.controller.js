const Post = require('../models/post.model');
const User = require('..//models/user.model');


const postQueue = require('../queue/post.queue');
const ApiError = require('../utils/apiErrors');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorMessage, SucessMessage } = require('../utils/message');

const initialTime = 5;

// const decreaseTime = (time) => {
//     return new Date(Date.now() - time * 60 * 1000);
// }
module.exports = {
    createPost: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user?._id).select('-password -refreshToken');
        if (!user) {
            throw new ApiError(400, ErrorMessage.noUserFound);
        }
        const { postname, postDes, postImage } = req.body;
        if ([postname, postDes, postImage].some((fields) => fields == undefined || fields == "")) {
            throw new ApiError(200, ErrorMessage.emptyFields)
        }

        const expireTime = new Date(Date.now() + initialTime * 60 * 1000);

        const post = await Post.create({ postname, postDes, postImage, owner: user._id, expireTime });
        console.log("post: ", post);
        if (!post) {
            throw new ApiError(400, " Now Abble to create post");
        }
        console.log(post.expireTime.getTime());
        const delay = post.expireTime - Date.now();
        console.log(delay)
        console.log(postQueue)
        postQueue.add({ postId: post._id }, { delay });
        return res.status(200, post, "successfully created Post!")
    }),
    upvotePost: asyncHandler(async (req, res) => {

    })
}
const Post = require('../models/post.model');
const User = require('..//models/user.model');
const Vote = require('../models/vote.model');


const ApiError = require('../utils/apiErrors');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

const { InitialTime, VoteTime } = require('../constants')
const { ErrorMessage, SucessMessage } = require('../utils/message');
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

        const expireTime = new Date(Date.now() + InitialTime * 60 * 1000);

        const post = await Post.create({ postname, postDes, postImage, owner: user._id, expireTime });
        if (!post) {
            throw new ApiError(400, " Now Abble to create post");
        }
        console.log(post.expireTime.getTime());
        console.log("post: ", post);
        return res.status(200).json(new ApiResponse(200, "successfully created Post!"));
    }),

    votePost: asyncHandler(async (req, res) => {
        const post = req.post;
        const user = req.user;
        if (post?._id == undefined || "") {
            throw new ApiError(500, ErrorMessage.noPostFound);
        }

        if (post.isArchived == true) {
            throw new ApiError(400, ErrorMessage.noUpvote)
        }

        if (user?._id == undefined || "") {
            throw new ApiError(500, ErrorMessage.noUserFound)
        }
        const { userVote } = req.body;

        let expireTime;

        if (userVote == "upvote") {
            expireTime = new Date(Date.now() + VoteTime * 60 * 1000);
        }
        if (userVote == "downvote") {
            expireTime = new Date(Date.now() - VoteTime * 60 * 1000);
        }
        else {
            throw new ApiError(404, ErrorMessage.invalidVoteEnum);
        }
        const updatedPost = await Post.findByIdAndUpdate(post?._id, { expireTime }, { new: true }).select('-password -refreshToken');
        if (!updatedPost) {
            throw new ApiError(500, ErrorMessage.somethingWrong);
        }
        const vote = await Vote.create({ postId: post?._id, votedBy: user?._id, voteType: userVote });
        if (!vote) {
            throw new ApiError(404, ErrorMessage.cannotVote);
        }

        return res.status(200).json(new ApiResponse(200, SucessMessage.votePost));
    }),
    getPostInfo: asyncHandler(async (req, res) => {
        const postId = req.post?._id;
        if (!postId) {
            throw new ApiError(400, ErrorMessage.invalidPostId)
        }
        const post = await Post.findById(postId).select('-refreshToken -password');

        if (!post) {
            throw new ApiError(400, ErrorMessage.noPostFound);
        }
        return res.status(200).json(new ApiResponse(200, post, SucessMessage.getData));
    }),

}
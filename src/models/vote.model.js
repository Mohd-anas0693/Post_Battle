
const { Schema, model } = require('mongoose')
const voteSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        refs: "posts",
        required: true
    },
    votedBy: {
        type: Schema.Types.ObjectId,
        refs: "users",
        required: true
    },
    voteType: {
        type: String,
        enum: ["upvote", "downvote"],
        required: true,

    }
}, { timestamps: true })

const Vote = model("vote", voteSchema)
module.exports = Vote; 
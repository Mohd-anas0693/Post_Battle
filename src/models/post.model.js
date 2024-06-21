const { Schema, model } = require('mongoose')
const postSchema = new Schema({

    postname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    postDes: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500,
    },
    isArchived: {
        type: Boolean,
        default: true,
    },
    postImage: {
        type: String,
        required: true
    },
    totalUpvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    totalDownVotes: {
        type: Number,
        default: 0,
        min: 0
    },
    totalComments: {
        type: Number,
        default: 0,
        min: 0,
    },
    owner: {
        type: Schema.Types.ObjectId,
        refs: "users",
        required: true
    },
    expireTime: {
        type: Date,
        required: true
    }

}, { timestamps: true })


const Post = model("post", postSchema);
module.exports = Post 
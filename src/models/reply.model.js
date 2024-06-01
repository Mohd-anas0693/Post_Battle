const { Schema, model } = require('mongoose')
const replySchema = new Schema({
    reply: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 600,
    },
    owner: {
        type: Schema.Types.ObjectId,
        refs: "users",
        required: true,
    },
    replyOn: {
        type: Schema.Types.ObjectId,
        refs: "comments",
        required: true,
    }
}, { timestamps: true })

const Reply = model("reply", replySchema)
module.exports = Reply; 
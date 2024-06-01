const { Schema, model } = require('mongoose')
const reviewSchema = new Schema({

    rating: {
        type: Number,
        required: true,
        max: [5, "rating cannot be above 5"],
        min: [1, "rating cannot be below 1"],
        default: 5
    },
    review: {
        type: String,
        required: true,
        maxlength: 400,
        minlength: 20,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        refs: "users"
    },
    mechanicId: {
        type: Schema.Types.ObjectId,
        refs: "mechanics"
    },
}, { timestamps: true })

const Reviews = model("review", reviewSchema)
module.exports = Reviews
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: 1,
        minlength: 4,
        maxlength: 20,
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
    },
    phoneNo: {
        type: String,
        unique: true
    },
    vehicleType: {
        type: String,
        enum: ["two", "three", "number"],
    },
    profileImage: {
        type: String,
    },
    totalUpvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    totalDownvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    tokenQuantity: {
        type: Number,
        default: 50,
        min: 0
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refeshToken: {
        type: String,
        required: false
    }


}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { return next() };
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
}
const User = model("user", userSchema)
module.exports = User;

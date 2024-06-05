const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/apiErrors');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorMessage } = require('../utils/message');
const verifyJWT = asyncHandler(async (req, _, next) => {
    let accessToken = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
        throw new ApiError(404, ErrorMessage.unauthorised);
    }
    console.log(accessToken);
    const decodeToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    const userId = decodeToken._id;
    const user = await User.findById(userId).select('-refreshToken -password');
    if (!user) {
        throw new ApiError(404, ErrorMessage.invalidToken);
    }
    req.user = user;
    next()
});
module.exports = verifyJWT;
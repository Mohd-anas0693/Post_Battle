const { User, password } = require("../models/user.model");
const asyncHandler = require('../utils/asyncHandler');
const ApiErrors = require('../utils/apiErrors');
const ApiResponse = require('../utils/apiResponse');


const { ErrorMessage, SucessMessage } = require('../utils/message');

const generateRefreshAndAccessToken = async (userId) => {
    try {
        let user = await User.findById(userId);
        let accessToken = await user.generateAccessToken();
        let refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        return { refreshToken, accessToken };
    } catch (error) {
        throw new ApiErrors(500, error);
    }
};

module.exports = {

    register: asyncHandler(async (req, res) => {
        console.log(req)
        const { username, email, password } = req.body;
        console.log("body" + req.body);
        if ([username, email, password].some((fileds) => { fileds?.trim() == "" })) {
            throw new ApiErrors(400, ErrorMessage.missingFields);
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        console.log("exsiting User" + existingUser);
        if (existingUser) {
            throw new ApiErrors(404, ErrorMessage.noUserFound)
        }
        const user = await User.create({
            username,
            email,
            password,
        })
        console.log("user" + user)

        const checkUserExist = await User.findById(user._id).select("-password -refreshToken");
        if (!checkUserExist) throw new ApiErrors(500, ErrorMessage.somethingWrong)
        return res.status(201).json(new ApiResponse(200, user, SucessMessage.register));
    }),

    login: asyncHandler(async (req, res) => {
        const { userEmail, password } = req.body;
        if ([userEmail, password].some((fields) => fields?.trim() == "")) {
            throw new ApiErrors(400, ErrorMessage.missingFields);
        }
        let username = userEmail;
        let email = userEmail;
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            throw new ApiErrors(400, ErrorMessage.noUserFound);
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (isPasswordCorrect == true) {
            throw new ApiErrors(400, ErrorMessage.noUserFound);
        }
        const { refreshToken, accessToken } = await generateRefreshAndAccessToken(user._id);
        user.refreshToken = refreshToken;
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        const option = {
            httpOnly: true, secure: true,
        }
        return res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json(new ApiResponse(200, { loggedInUser }, SucessMessage.login));
    }),

    fillUserDetails: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            throw new ApiErrors(400, ErrorMessage.unauthorised);
        }
        const userExist = await User.findById(user._id);
        if (!userExist) {
            throw new ApiErrors(401, ErrorMessage.noUserFound);
        }
        const { name, phoneNo, vehicleType, profileImage } = req.body;
        if ([name, phoneNo, profileImage, vehicleType].some((fileds) => { fileds?.trim == "" })) {
            throw new ApiErrors(400, ErrorMessage.missingFields);
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id,
            {
                name,
                phoneNo,
                vehicleType,
                profileImage
            }, { new: true });
        if (!updatedUser) {
            throw new ApiErrors(401, ErrorMessage.noUserFound);
        };
        return res.status(200)
            .json(new ApiResponse(200, updatedUser, SucessMessage.update));
    }),
    // 
    changePassword: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            throw new ApiErrors(404, ErrorMessage.invalidToken);
        }
        const { currentPassword, newPassword } = req.body;
        if ([currentPassword, newPassword].some((fileds) => { fileds.trim() = "" })) {
            throw new ApiErrors(400, ErrorMessage.missingFields);
        }
        const checkPassword = await User.isPasswordCorrect(currentPassword);
        if (!checkPassword) {
            throw new ApiErrors(401, ErrorMessage.incorrectPassword);
        }
        const { accessToken, refreshToken } = generateRefreshAndAccessToken(user?._id);
        const updatedUser = await User.findByIdAndUpdate(user?._id, { password: password }, { new: true }).select(" -refreshToken -password");
        if (!updatedUser) {
            throw new ApiErrors(500, ErrorMessage.somethingWrong);
        }
        const option = { httpOnly: true, secure: true };
        return res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refeshToken", refreshToken, option)
            .json(200, SucessMessage.update);
        // 
    }),
    // 
    logout: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            throw new ApiErrors(400, ErrorMessage.invalidToken);
        };
        const updatedUser = await User.findByIdAndUpdate(user?._id, { refreshToken: "" }, { new: true });
        if (!updatedUser) {
            throw new ApiErrors(401, ErrorMessage.noUserFound);
        }
        const option = { httpOnly: true, secure: true };
        return res.status(200)
            .cookie('accessToken', option)
            .cookie('refreshToken', option)
            .json(new ApiResponse(200, SucessMessage.logout));
    }),

    getUserInfo: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            throw new ApiErrors(401, ErrorMessage.invalidToken);
        }
        const userData = await User.findById(user?._id).select(" -refreshToken -password");
        if (!userData) {
            throw new ApiErrors(400, ErrorMessage.noUserFound);
        }
        return res.status(200)
            .json(new ApiResponse(200, userData, SucessMessage.getData));
    })
}
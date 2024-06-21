const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const ApiErrors = require('../utils/apiErrors');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorMessage, SucessMessage } = require('../utils/message');
const { transfer_to } = require('../utils/helper');
const ApiResponse = require('../utils/apiResponse');

module.exports = {
    transferAmount: asyncHandler(async (req, res) => {
        const { amount, username } = req.body;
        const userId = req.user?._id;
        
        if ([userId, username].some((fields) => fields == undefined || fields?.trim() == "")) {
            throw new ApiErrors(400, ErrorMessage.missingFields);
        }
        if (!amount || typeof (amount) == Number) throw new ApiErrors(401, ErrorMessage.emptyFields);
        
        const payTo = await User.findOne({ username });
        if (!payTo) throw new ApiErrors(401, ErrorMessage.noUserFound);

        const transaction = await transfer_to(userId, payTo._id, amount);
        if (!transaction) throw new ApiErrors(401, ErrorMessage.transferFailed);
        
        return res.status(201).json(new ApiResponse(201, transaction, SucessMessage.transactionSuccess));
    })
}
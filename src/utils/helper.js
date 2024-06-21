const ApiErrors = require("./apiErrors");
const asyncHandler = require("./asyncHandler");
const { ErrorMessage } = require("./message");

module.exports = {
    transfer_to: async (userId, transferto, amount) => {

        if (!amount || !transferto || !userId) throw new ApiErrors(400, ErrorMessage.missingFields);

        const payedBy = await User.findById(userId);
        if (!user) throw new ApiErrors(402, ErrorMessage.noUserFound);

        if (payedBy.tokenQuantity < amount) throw new ApiErrors(400, ErrorMessage.noEnoughBalance);

        const payedTo = await User.findById(transferto);
        if (!payedTo) throw new ApiErrors(403, ErrorMessage.noUserFound);

        const transfer = await User.updateOne(payedTo._id, { tokenQuantity: payedTo + amount });
        if (!transfer) throw new ApiErrors(400, ErrorMessage.transferFailed);

        const updatedUser = await User.updateOne(payedBy._id, { tokenQuantity: tokenQuantity - amount });
        if (!updatedUser) throw new ApiErrors(400, ErrorMessage.transferFailed);

        const transaction = await Transaction.create({ transferedBy: payedBy._id, transferedTo: payedTo._id, amount });
        if (!transaction) throw new ApiErrors(400, ErrorMessage.transferFailed);
        return transaction
    }
}

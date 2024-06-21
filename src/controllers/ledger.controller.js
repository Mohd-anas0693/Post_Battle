
const User = require('../models/user.model');
const Ledger = require('../models/ledger.model');
const ApiError = require('../utils/apiErrors');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorMessage, SucessMessage } = require('../utils/message');
const { IntialTokenQuantity } = require('../constants');

module.exports = {
    createLedger: asyncHandler(async (req, res) => {
        const userId = req.user?._id;
        if (!userId) {
            throw new ApiError(400, ErrorMessage.noUserFound);
        }

        const ledger = await Ledger.find({ owner: userId });
        if (ledger) {
            throw new ApiError(401, ErrorMessage.legderAlreadyExist);
        }
        const newLedger = await Ledger.create({ tokenQuantity: IntialTokenQuantity, owner: userId })
        if (!newLedger) {
            throw new ApiError(500, ErrorMessage.somethingWrong);
        }
        return res.status(200).json(new ApiResponse(200, newLedger, SucessMessage.ledgerCreation))
    }),
    getFreeToken: asyncHandler(async (req, res) => {
        const userId = req.user?._id;
        if (!userId) {
            throw new ApiError(400, ErrorMessage.noUserFound);
        }

        const ledger = await Ledger.find({ owner: userId });
        if (!ledger) {
            throw new ApiError(400, ErrorMessage.noLedgerFound);
        }
        
        const updatedledger = await Ledger.updateOne({ tokenQuantity: 100 });
        if (!updatedledger) {
            throw new ApiError(400, ErrorMessage.somethingWrong);
        }
        
        return res.status(200).json(new ApiError(200, SucessMessage.update));
    }),
    
}
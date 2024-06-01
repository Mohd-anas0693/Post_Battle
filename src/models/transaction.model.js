const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    transferedBy: {
        type: Schema.Types.ObjectId,
        refs: "legders",
        required: true,
    },

    transferedTo: {
        type: Schema.Types.ObjectId,
        refs: "legders",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1

    },

}, { timestamps: { createdAt: true } });
const Transaction = model("transaction", transactionSchema);
module.exports = Transaction;
const { Schema, model } = require('mongoose');

const ledgerSchema = new Schema({
    tokenQuantity: {
        type: Number,
        default: 0,
    },
    owner: {
        type: Schema.Types.ObjectId,
        refs: "users",
        unique: true,
        required: true,
    }
}, { timestamps: true });

const Ledger = model("ledger", ledgerSchema);
module.exports = Ledger;
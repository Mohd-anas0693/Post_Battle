const { Schema, model } = require('mongoose');

const ledgerSchema = new Schema({
    tokenQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        refs: "users"
    }
}, { timestamps: true });

const Ledger = model("ledger", ledgerSchema);
module.exports = Ledger;
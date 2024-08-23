const mongoose = require('mongoose')
const { Schema, model } = mongoose

const paymentSchema = new Schema({
    type: {
        type: String,
        enum: ['Credit', 'Debit'],
        default: 'Debit'
    },
    transaction_id: String,
    amount: Number,
    quotation: {
        type: Schema.Types.ObjectId,
    },
    customer: {
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

const Payment = model('Payment', paymentSchema)
module.exports = Payment
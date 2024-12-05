const mongoose = require('mongoose')
const { Schema, model } = mongoose

const paymentSchema = new Schema({
    type: {
        type: String,
        enum: ['credit', 'debit'],
        default: 'debit'
    },
    transactionId: String,
    amount: Number,
    quotation: {
        type: Schema.Types.ObjectId,
        ref: 'Quotation'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

const Payment = model('Payment', paymentSchema)
module.exports = Payment
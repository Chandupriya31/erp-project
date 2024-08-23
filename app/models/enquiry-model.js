const mongoose = require('mongoose')
const { Schema, model } = mongoose

const enquirySchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
    },
    phno: Number,
    customer_id: {
        type: Schema.Types.ObjectId,
    },
    company: {
        type: Schema.Types.ObjectId,
    },
    quantity: Number,
    date: Date
})

const Enquiry = model('Enquiry', enquirySchema)
module.exports = Enquiry
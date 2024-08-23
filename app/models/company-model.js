const mongoose = require('mongoose')
const { Schema, model } = mongoose

const companySchema = new Schema({
    companyname: String,
    GST: String,
    contactdetails: {
        address: {
            name: String,
            lattitude: Number,
            longitude: Number
        },
        phone: Number,
        email: String
    },
    products: [{
        type: Schema.Types.ObjectId,
    }],
    orders: [{
        type: Schema.Types.ObjectId,
    }],
    customers: [{
        type: Schema.Types.ObjectId,
    }],
    categories: [{
        type: Schema.Types.ObjectId,
    }],
    companydetails: Schema.Types.ObjectId,
    is_approval: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
    },
    enquiries: [{
        type: Schema.Types.ObjectId,
    }],
    quotations: [{
        type: Schema.Types.ObjectId,
    }],
    details: {
        vision: String,
        mission: String,
        aboutus: String
    }
}, { timestamps: true })

const Company = model('Company', companySchema)
module.exports = Company
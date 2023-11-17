const mongoose = require('mongoose')
const {Schema,model} = mongoose

const quotationSchema = new Schema({
    enquiry: {
       type: Schema.Types.ObjectId,
       ref: 'Enquiry'
    },
    unitPrice: Number,
    totalCost: Number,
    date: Date,
    quotationExpiry: Date,
    termsandconditions: {
       delivery: String,
       isApproved: Boolean
    },
    pdf: String,
    comments: [{
       title: {
          type: String
       },
       userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
       }
    }]
 }, { timestamps: true })
 
 const Quotation = model('Quotation', quotationSchema)
 module.exports = Quotation
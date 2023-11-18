const mongoose = require('mongoose')
const { Schema, model } = mongoose

const quotationSchema = new Schema({
   enquiry: {
      type: Schema.Types.ObjectId,
      ref: 'Enquiry'
   },
   quantity:Number,
   unitPrice: Number,
   totalCost: Number,
   date: Date,
   quotationExpiry: Date,
   termsandconditions: {
      delivery: String,
      isApproved: Boolean
   },
   pdf: String,
   product:{
      type:Schema.Types.ObjectId,
      ref: 'Product'
   }
}, { timestamps: true })

const Quotation = model('Quotation', quotationSchema)
module.exports = Quotation
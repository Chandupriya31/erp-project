const mongoose = require('mongoose')
const { Schema, model } = mongoose

const quotationSchema = new Schema({
   enquiry: {
      type: Schema.Types.ObjectId,
   },
   customer: {
      type: Schema.Types.ObjectId,
   },
   company: {
      type: Schema.Types.ObjectId,
   },
   quantity: Number,
   unit_price: Number,
   total_cost: Number,
   date: Date,

   quotation_expiry: Date,
   termsandconditions: {
      delivery: String,
      isApproved: {
         type: Boolean,
         default: false
      }
   },
   // pdf: String,
   product: {
      type: Schema.Types.ObjectId,
   },
   comments: [{
      type: Schema.Types.ObjectId,
   }],
   company: {
      type: Schema.Types.ObjectId,
   }
}, { timestamps: true })

const Quotation = model('Quotation', quotationSchema)
module.exports = Quotation
const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
   date: Date,
   quotationId: {
      type: Schema.Types.ObjectId,
   },
   productId: {
      type: Schema.Types.ObjectId,
   },
   transactionId: String,
   customerId: {
      type: Schema.Types.ObjectId,
   },
   delivery: {
      type: String,
      enum: ['pending', 'deliverd'],
      default: 'pending'
   },
   company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
   },
   deliveryDate: Date,
   statusofProduct: String,
})
const OrderAcceptance = model('OrderAcceptance', orderSchema)

module.exports = OrderAcceptance
const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
   date: Date,
   quotationId: {
      type: Schema.Types.ObjectId,
      ref: 'Quotation'
   },
   productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
   },
   paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment'
   },
   customerId: { // New field to store the customer's ID
      type: Schema.Types.ObjectId,
      ref: 'User' // Assuming User model holds customer information
   },
   paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
   },
   orderAcceptance: {
      type: Boolean,
      default: false
   },
   delivery: {
      type: String,
      enum: ['pending', 'deliverd'],
      default: 'pending'
   },
   deliveryDate: Date,
   quality: {
      type: String,
      enum: ['accecpt', 'reject']
   },
   process: {
      statusofProduct: String,
      description: String,
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      }
   }
})
const OrderAcceptance = model('OrderAcceptance', orderSchema)

module.exports = OrderAcceptance
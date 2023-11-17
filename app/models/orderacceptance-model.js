const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
   date: Date,
   quotationId: {
      type: Schema.Types.ObjectId,
      ref: 'Quotation'
   },
   paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment'
   },
   paymentStatus: {
      type: String,
      enum: ['pending', 'completed', '50% paid'],
      default: 'pending'
   },
   balancePayment: Number,
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
   process: [{
      statusofProduct: String,
      description: String,
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      }
   }]
})
const OrderAcceptance = model('OrderAcceptance', orderSchema)

module.exports = OrderAcceptance
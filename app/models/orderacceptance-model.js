const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
   date: Date,
   quotation_id: {
      type: Schema.Types.ObjectId,
   },
   product_id: {
      type: Schema.Types.ObjectId,
   },
   transaction_id: String,
   customer_id: {
      type: Schema.Types.ObjectId,
   },
   delivery: {
      type: String,
      enum: ['pending', 'deliverd'],
      default: 'pending'
   },
   company: {
      type: Schema.Types.ObjectId,
   },
   delivery_date: Date,
   status_of_product: String,
})
const OrderAcceptance = model('OrderAcceptance', orderSchema)

module.exports = OrderAcceptance
const { model, Schema } = require('mongoose')

const productSchema = new Schema({
   productname: String,
   description: String,
   company_id: {
      type: Schema.Types.ObjectId
   },
   perUnitCost: Number,
   image: [{ url: String, key: String }],
   category_id: {
      type: Schema.Types.ObjectId
   },
   best_seller: {
      type: Boolean,
      default: false
   },
   product_warranty: String,
   payment_terms: String,
})

const Product = model('Product', productSchema)

module.exports = Product
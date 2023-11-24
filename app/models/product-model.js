const { model, Schema } = require('mongoose')

const productSchema = new Schema({
   productname: String,
   description: String,
   companyId: [{
      type: Schema.Types.ObjectId,
      ref: 'Company'
   }],
   perUnitCost: Number,
   image: [{ url: String, key: String }],
   categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
   },
   productWarranty: String,
   paymentTerms: String,
})

const Product = model('Product', productSchema)

module.exports = Product
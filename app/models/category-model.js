const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
   name: String,
   companyId: {
      type: Schema.Types.ObjectId,
   }
})

const Category = model('Category', categorySchema)
module.exports = Category
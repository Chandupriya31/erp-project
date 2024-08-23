const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
   name: String,
   company_id: {
      type: Schema.Types.ObjectId,
   }
})

const Category = model('Category', categorySchema)
module.exports = Category
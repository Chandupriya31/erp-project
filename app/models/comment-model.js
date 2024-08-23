const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
   content: String,
   user_id: {
      type: Schema.Types.ObjectId,
   },
   quotation_id: {
      type: Schema.Types.ObjectId,
   }
}, { timestamps: true })

const Comment = model('Comment', commentSchema)

module.exports = Comment
const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
   content: String,
   userId: {
      type: Schema.Types.ObjectId,
   },
   quotationId: {
      type: Schema.Types.ObjectId,
   }
}, { timestamps: true })

const Comment = model('Comment', commentSchema)

module.exports = Comment
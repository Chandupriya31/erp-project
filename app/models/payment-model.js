const mongoose = require('mongoose')
const {Schema,model} = mongoose

const paymentSchema = new Schema({
    type:{
        type:String,
        enum:['Credit','Debit'],
        default:'Debit'
    },
    amount:Number,
    quotationId:{
        type:Schema.Types.ObjectId,
        ref:'Quotation'
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Payment = model('Payment',paymentSchema)
module.exports = Payment
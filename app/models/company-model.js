const mongoose = require('mongoose')
const {Schema,model} = mongoose

const companySchema = new Schema({
    companyname:String,
    GST:String,
    contactdetails:{
        address: String,
        phone:Number,
        email:String
    },
    products:[Schema.Types.ObjectId],
    customers:[Schema.Types.ObjectId],
    categories:[Schema.Types.ObjectId],
    companydetails: Schema.Types.ObjectId,
    isApproval:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    enquiries:[Schema.Types.ObjectId],
    quotations:[Schema.Types.ObjectId],
    details:{
        vision:String,
        mission:String,
        aboutus:String
    }
},{timestamps:true})

const Company = model('Company',companySchema)
module.exports = Company
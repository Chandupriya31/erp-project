const Company = require('../models/company-model')
const Enquiry = require('../models/enquiry-model')
const {validationResult} = require('express-validator')
const User = require('../models/users-model')
const Product = require('../models/product-model')

const enquiryCtlr = {}

enquiryCtlr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = req.body
    const enquiry = new Enquiry(body)
    enquiry.customerId = req.user.id
    enquiry.date = new Date()
    try{
        await enquiry.save()
        await Company.findOneAndUpdate({products:enquiry.productId},{$push:{enquiries: enquiry._id}})
        await User.findOneAndUpdate({_id:enquiry.customerId},{$push:{myenquiries: enquiry._id}})
        res.json(enquiry)
    }catch(e){
        return res.status(500).json(e)
    }
}

enquiryCtlr.list = async(req,res)=>{
    try{
        const enquiries = await Enquiry.find()
        res.json(enquiries)
    }
    catch(e){
        res.status(500).json(e)
    }
}

module.exports = enquiryCtlr
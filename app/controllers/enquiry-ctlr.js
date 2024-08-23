const Company = require('../models/company-model')
const Enquiry = require('../models/enquiry-model')
const { validationResult } = require('express-validator')
const User = require('../models/users-model')
const Product = require('../models/product-model')

const enquiryCtlr = {}

enquiryCtlr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const enquiry = new Enquiry(body)
    enquiry.customer_id = req.user.id
    enquiry.date = new Date()
    try {
        await enquiry.save()
        await Company.findOneAndUpdate({ products: enquiry.product_id }, { $push: { enquiries: enquiry._id } })
        await User.findOneAndUpdate({ _id: enquiry.customer_id }, { $push: { my_enquiries: enquiry._id } })
        res.json(enquiry)
    } catch (e) {
        return res.status(500).json(e)
    }
}

enquiryCtlr.list = async (req, res) => {
    try {
        if (req.user.role === 'companyAdmin') {
            const company = await Company.findOne({ user_id: req.user.id })
            const enquiries = await Enquiry.find({ company: company._id }).populate('company').populate('customer_id').populate('product_id')
            // console.log('enquiries',enquiries)
            res.json(enquiries)
        } else {
            const enquiries = await Enquiry.find({ customer_id: req.user.id })
            // console.log('enquiry',enquiries)
            res.json(enquiries)
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
}

module.exports = enquiryCtlr
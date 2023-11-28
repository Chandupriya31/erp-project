const Quotation = require('../models/quotation-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const User = require('../models/users-model')
const quotationCtlr = {}

quotationCtlr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
    }
    const body = req.body
    const user = await User.findOne({ myenquiries: body.enquiry })
    body.customer = user._id
    const quotation = new Quotation(body)
    quotation.date = new Date()
    try {
        await quotation.save()
        await User.findOneAndUpdate({ myenquiries: quotation.enquiry }, { $push: { myQuotations: quotation._id } })
        res.json(quotation)
    } catch (e) {
        res.status(500).json(e)
    }
}

quotationCtlr.list = async (req, res) => {
    try {
        const quotes = await Quotation.find().populate('enquiry').populate('customer', ['username']).populate('product', ['productname'])
        res.json(quotes)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = quotationCtlr
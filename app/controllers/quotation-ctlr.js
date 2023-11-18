const Quotation = require('../models/quotation-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')

const quotationCtlr = {}

quotationCtlr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
    }
    const body = req.body
    const quotation = new Quotation(body)
    quotation.date = new Date()
    try {
        await quotation.save()
        res.json(quotation)
    } catch (e) {
        res.status(500).json(e)
    }
}

quotationCtlr.list = async (req, res) => {
    try {
        const quotes = await Quotation.find()
        res.json(quotes)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = quotationCtlr
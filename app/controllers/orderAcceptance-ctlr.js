const OrderAcceptance = require('../models/orderacceptance-model')
const { validationResult } = require('express-validator')
const orderAcceptanceCtlr = {}

orderAcceptanceCtlr.create = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   const body = req.body
   const order = new OrderAcceptance(body)
   order.date = new Date()
   try {
      await order.save()
      res.json(order)
   } catch (e) {
      res.status(500).json(e)
   }

}
orderAcceptanceCtlr.list = async (req, res) => {
   try {
      const order = await OrderAcceptance.find()
      res.json(order)
   } catch (e) {
      res.status(500).json(e)
   }
}

module.exports = orderAcceptanceCtlr
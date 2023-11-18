const OrderAcceptance = require('../models/orderacceptance-model')
const User = require('../models/users-model')
const { validationResult } = require('express-validator')
const transporter = require('../config/nodemailer')
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
      if (order.orderAcceptance) {
         const customer = await User.findById(order.customerId)
         if (customer && customer.email) {
            console.log(customer.email)
            const mailOptions = {
               from: process.env.NODE_MAILER_MAIL,
               to: customer.email,
               subject: 'Order Acceptance-onfirmation',
               html: `<p>order is accepted for quotationNum-"${order.quotationId}" 
                  and expected deliver date-"${new Date(order.deliveryDate).toLocaleDateString()}"
               </p>`
            }
            await transporter.sendMail(mailOptions)
         } else {
            console.error('Customer not found or email not available');
         }
      }
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
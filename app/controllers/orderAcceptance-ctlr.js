const OrderAcceptance = require('../models/orderacceptance-model')
const Product = require('../models/product-model')
const User = require('../models/users-model')
const Payment = require('../models/payment-model')
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
         const product = await Product.findById(order.productId)
         console.log(product)
         if (customer && customer.email) {
            console.log(customer.email)
            if (product) {
               const mailOptions = {
                  from: process.env.NODE_MAILER_MAIL,
                  to: customer.email,
                  subject: 'Email Verification',
                  html: `<p>your order for -"${product.productname}" has been accepted<br/>
                     and expected deliver date-"${new Date(order.deliveryDate).toLocaleDateString()}"<br/>
                     payment received -
                  </p>`
               }
               await transporter.sendMail(mailOptions)

            } else {
               console.error('Product not found for order ID:', order.productId);
               return res.status(404).json({ message: 'Product not found' });
            const mailOptions = {
               from: process.env.NODE_MAILER_MAIL,
               to: customer.email,
               subject: 'Order Acceptance-Confirmation',
               html: `<p>order is accepted for quotationNum-"${order.quotationId}" 
                  and expected deliver date-"${new Date(order.deliveryDate).toLocaleDateString()}"
               </p>`
            }
         } else {
            console.error('Customer not found or email not available');
            return res.status(404).json({ message: 'Customer or email not found' });
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
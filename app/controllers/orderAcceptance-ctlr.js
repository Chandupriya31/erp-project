const OrderAcceptance = require('../models/orderacceptance-model')
const Product = require('../models/product-model')
const Payment = require('../models/payment-model')
const User = require('../models/users-model')
const { validationResult } = require('express-validator')
const transporter = require('../config/nodemailer')
const cron = require('node-cron')
const orderAcceptanceCtlr = {}

const sendNotificationToAdmin = async (order) => {
   try {
      // Retrieve admin's email (replace with your admin's email)
      const adminEmail = 'pavanat24official@gmail.com';

      const product = await Product.findById(order.productId)

      const mailOptions = {
         from: process.env.NODE_MAILER_MAIL,
         to: adminEmail,
         subject: 'Notification: Product Delivery',
         html: `<p>The delivery for product "${product.productname}" (ID: ${order.productId}) is scheduled on ${new Date(order.deliveryDate).toLocaleDateString()}.</p>`
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
   } catch (error) {
      console.error('Error sending email:', error);
   }
};

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

      if (!order.orderAcceptance) {
         return res.status(400).json({ message: 'Order not accepted' });
      }
      const customer = await User.findById(order.customerId)
      if (!customer || !customer.email) {
         return res.status(404).json({ message: 'Customer or email not found' });
      }
      const product = await Product.findById(order.productId)
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      const payment = await Payment.findById(order.paymentId)
      if (!payment) {
         return res.status(404).json({ message: 'PaymentId not found' });
      }
      const deliveryDate = new Date(order.deliveryDate)
      const notificationDate = new Date(deliveryDate)
      notificationDate.setDate(deliveryDate.getDate() - 3)

      const cronExpression = `0 18 ${notificationDate.getDate()} ${notificationDate.getMonth() + 1} *`;

      const mailOptions = {
         from: process.env.NODE_MAILER_MAIL,
         to: customer.email,
         subject: 'order acceptance mail',
         html: `<p>Your order for "${product.productname}" has been accepted and the expected delivery date is "${new Date(order.deliveryDate).toLocaleDateString()}". Payment received - Transaction ID: ${payment.transactionId}</p>`
      }
      await transporter.sendMail(mailOptions)
      cron.schedule(cronExpression, async () => {
         await sendNotificationToAdmin(order)
      }, {
         timezone: 'Asia/Kolkata'
      })
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
      res.status(500).json({ message: 'Internal server error' })
   }
}

module.exports = orderAcceptanceCtlr 
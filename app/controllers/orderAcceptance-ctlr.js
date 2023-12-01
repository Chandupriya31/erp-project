const OrderAcceptance = require('../models/orderacceptance-model')
const Product = require('../models/product-model')
const Payment = require('../models/payment-model')
const User = require('../models/users-model')
const { validationResult } = require('express-validator')
const transporter = require('../config/nodemailer')
const cron = require('node-cron')
const Quotation = require('../models/quotation-model')
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
   const quotation = await Quotation.findById(order.quotationId)
   const payment = await Payment.findOne({quotation:order.quotationId})
   // console.log(payment)
   order.paymentId = payment._id
   order.customerId = payment.customer
   order.productId = quotation.product
   order.date = new Date()
   // order.process.userId = req.user.id
   try {
      await order.save()
      if (order.orderAcceptance) {
         const customer = await User.findById(order.customerId)
         const product = await Product.findById(order.productId)
         const payment = await Payment.findById(order.paymentId)
         const deliveryDate = new Date(order.deliveryDate)
         const notificationDate = new Date(deliveryDate)
         notificationDate.setDate(deliveryDate.getDate() - 3)
         const cronExpression = `0 9 ${notificationDate.getDate() - 3} ${notificationDate.getMonth() + 1} *`;
         console.log(cronExpression)
         // console.log(payment)
         if (customer && customer.email) {
            // console.log(customer.email)
            if (product) {
               if (payment) {
                  const mailOptions = {
                     from: process.env.NODE_MAILER_MAIL,
                     to: customer.email,
                     subject: 'Email Verification',
                     html: `<p>
                     Dear ${customer.username}<br/>
                        your order for -"${product.productname}" has been accepted. <br/>
                        your expected deliver date - "${new Date(order.deliveryDate).toLocaleDateString()}" <br/>
                        payment received - <i>transactionId</i> - ${payment.transactionId.slice(8)}<br/><br/><br/>
                        thanks and regards:-<br/>
                        pavan and co.
                     </p > `
                  }
                  await transporter.sendMail(mailOptions)

               } else {
                  console.error('PaymentId not found:');
                  return res.status(404).json({ message: 'PaymentId not found' });
               }
            } else {
               console.error('Product not found for order ID:', order.productId);
               return res.status(404).json({ message: 'Product not found' });
            }
         } else {
            console.error('Customer not found or email not available');
            return res.status(404).json({ message: 'Customer or email not found' });
         }
         cron.schedule(cronExpression, async () => {
            await sendNotificationToAdmin(order)
         }, {
            timezone: 'Asia/Kolkata'
         })
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

// // orderAcceptanceCtlr.notify = async (req, res) => {

// // }
// orderAcceptanceCtlr.notify = async () => {
//   // Set up a cron job to run daily (adjust the timing as needed)
// cron.schedule('0 0 * * *', async () => {
//    try {
//       const today = new Date();

//       // Fetch orders scheduled for delivery today
//       const ordersForToday = await OrderAcceptance.find({
//          deliveryDate: {
//             $gte: today,
//             $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Within the current day
//          }
//       });

//       // Process and send notifications for orders due today
//       ordersForToday.forEach(async (order) => {
//          await sendNotificationToAdmin(order); // Notify admin about the delivery
//          const customer = await User.findById(order.customerId);

//          if (customer && customer.email) {
//             const product = await Product.findById(order.productId);

//             const mailOptions = {
//                from: process.env.NODE_MAILER_MAIL,
//                to: 'pn14016@gmail.com',
//                subject: 'Delivery Today',
//                html: `<p>Your order for "${product.productname}" is scheduled for delivery today. Please expect it soon!</p>`
//             };

//             await transporter.sendMail(mailOptions); // Send notification to customer
//          }
//       });

//       console.log('Delivery notifications sent for today');
//    } catch (error) {
//       console.error('Error sending delivery notifications:', error);
//    }
// }, {
//    timezone: 'Your Timezone' // Set your desired timezone
// });

// };

module.exports = orderAcceptanceCtlr
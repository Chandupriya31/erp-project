const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {validationResult} = require('express-validator')
const Payment = require('../models/payment-model')
const OrderAcceptance = require('../models/orderacceptance-model')
const _ = require('lodash')
const paymentCtlr = {}

paymentCtlr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // const body = _.pick(req.body,['amount','quotation'])
    const body = _.pick(req.body,['amount','quotation'])

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            line_items: [{
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: "Buying product",
                  },
                  unit_amount: body.amount * 100,
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url : 'http://localhost:5432/success',
            cancel_url : 'http://localhost:5432/cancel'
        })
        const payment = new Payment(body)
        payment.customer = req.user.id
        payment.transactionId = session.id
        await payment.save()
        res.json({id:session.id,url:session.url})
    }catch(e){
        res.status(500).json(e)
    }
}

paymentCtlr.update = async(req,res)=>{
    try{
        const updatepayment = await Payment.findOneAndUpdate({ transactionId: id }, { status: "successful" }, {new: true })
        const updateOrderAcceptance = await OrderAcceptance.findByIdAndUpdate(updatepayment.quotation, { paymentStatus: 'completed', paymentId: updatepayment._id,orderAcceptance:true }, { new: true })
        res.json(updateOrderAcceptance)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports = paymentCtlr
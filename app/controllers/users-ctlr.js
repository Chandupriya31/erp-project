const User = require('../models/users-model')
const Company = require('../models/company-model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const transporter = require('../config/nodemailer')
const userCtlr = {}

userCtlr.userRegister = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        const totalDocuments = await User.countDocuments()
        if (totalDocuments == 0) {
            user.role = 'superAdmin'
        }
        const usr = await user.save()
        if (usr) {
            const token = jwt.sign({ id: usr._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            //console.log(token)
            const verificationLink = `http://localhost:7777/api/users/verify/${token}`

            const mailOptions = {
                from: process.env.NODE_MAILER_MAIL, // Sender email
                to: user.email || 'pn14016@gmail.com',  // Newly registered user's email
                subject: 'Email Verification',
                html: `
                    <p>Hello,</p>
                    <p>Thank you for registering! Please click the following link to verify your email:</p>
                    <a href="${verificationLink}">Verify Email</a>
                    <p>Best regards,</p>
                `
            }
            await transporter.sendMail(mailOptions)
            res.json({
                usr: usr,
                msg: `${usr.username}, Please Verify your email send to your email address to access your account`
            })
        }

    } catch (e) {
        res.status(500).json(e)
    }
}

userCtlr.verify = async (req, res) => {
    const token = req.params.token
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        //checking if token user present
        const user = await User.findOne({ _id: verifyToken.id })
        if (user.verified == false) {
            user.verified = !user.verified
            const verified = await user.save()
            if (verified) {
                res.json({ msg: "Your account has been successfully verified" })
            }
        } else {
            res.json({ msg: "Your account has already been verified." })
        }
    } catch (e) {
        res.status(400).json(e)
    }
}



userCtlr.companyRegister = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const user = new User(body)
        const body1 = req.body
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        const totalDocuments = await User.countDocuments()
        if (totalDocuments == 0) {
            user.role = 'superAdmin'
        }
        await user.save()
        const company = new Company(body1)
        if (user.role == 'superAdmin') {
            company.isApproval = true
        }
        company.userId = user._id
        await company.save()
        res.json({ user, company })
    } catch (e) {
        res.status(500).json(e)
    }
}


userCtlr.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['email', 'password'])
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'Invalid email/Password' }] })
        }
        const result = await bcrypt.compare(body.password, user.password)
        if (!result) {
            return res.status(404).json({ errors: [{ msg: 'Invalid Email/Password' }] })
        }
        const tokenData = {
            id: user._id,
            role: user.role
        }
        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        res.json({ token: token })
    } catch (e) {
        res.status(500)
    }
}

userCtlr.getProfile = async (req, res) => {
    try {
        if (req.user.role == 'companyAdmin') {
            const user = await User.findById(req.user.id)
            const company = await Company.findOne({ userId: req.user.id })
            res.json({ user, company })
        } else {
            const customer = await User.findById(req.user.id)
            res.json(customer)
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

userCtlr.list = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json(e)
    }
}

userCtlr.listCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('userId', ['username', 'email'])
        res.json(companies)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = userCtlr
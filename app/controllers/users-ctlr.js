const User = require('../models/users-model')
const Company = require('../models/company-model')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const userCtlr = {}
 
userCtlr.userRegister = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = req.body
    try {
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password,salt)
        const totalDocuments = await User.countDocuments()
        if(totalDocuments == 0){
            user.role = 'superAdmin'
        }
        await user.save()
        res.json(user)
    }catch(e){
        res.status(500).json(e)
    } 
}

userCtlr.companyRegister = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body = req.body
        const user = new User(body)
        const body1 = req.body
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password,salt)
        const totalDocuments = await User.countDocuments()
        if(totalDocuments == 0){
            user.role = 'superAdmin'
        }
        await user.save()
        const company = new Company(body1)
        if(user.role == 'superAdmin'){
            company.isApproval = true
        }
        company.userId = user._id
        await company.save()
        res.json({user,company})
    }catch(e){
        res.status(500).json(e)
    }
}

userCtlr.login = async(req,res)=>{
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['email','password'])
    try{
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:[{msg:'Invalid email/Password'}]})
        }    
        const result = await bcrypt.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({errors:[{msg:'Invalid Email/Password'}]})
        }
        const tokenData = {
            id : user._id,
            role: user.role
        }
        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        res.json({token:token})
    }catch(e){
        res.status(500)
    }
}

userCtlr.getProfile = async(req,res)=>{
    try{
        if(req.user.role == 'companyAdmin'){
            const user = await User.findById(req.user.id)
            const company = await Company.findOne({userId:req.user.id})
            res.json({user,company})
        }else{
            const customer = await User.findById(req.user.id)
            res.json(customer)
        }
    }catch(e){
        res.status(500).json(e)
    }
}

userCtlr.list = async(req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(e){
        res.status(500).json(e)
    }
}

userCtlr.listCompanies = async(req,res)=>{
    try{
        const companies = await Company.find().populate('userId',['username','email'])
        res.json(companies)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports = userCtlr
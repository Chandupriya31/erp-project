const User = require("../models/users-model")

const nameSchema = {
    notEmpty:{
        errorMessage: 'Name cannot be empty'
    },
    isLength:{
        options:{min:4,max:50},
        errorMessage:'Name shouldn\'t be b/w 4-50 characters'
    },
    custom:{
        options:async(value)=>{
            const user = await User.findOne({username:value})
            if(user){
                throw new Error('Username already exists')
            }
            else{
                return true
            }
        }
    }
}

const emailSchema = {
    notEmpty:{
        errorMessage:'Email cannot be empty'
    },
    isEmail:{
        errorMessage:'Email is not valid'
    },
    custom:{
        options:async(value)=>{
            const user = await User.findOne({email:value})
            if(user){
                throw new Error('Email already exists')
            }
            else {
                return true
            }
        }
    }
}

const passwordSchema={
    notEmpty:{
        errorMessage:'Password already exists'
    },
    isStrongPassword:{
        options: {
            min: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
            max:128
        },
        errorMessage:'Entered password is not a strong password'
    }
}

const companynameSchema = {
    notEmpty:{
        errorMessage:'Company name shouldn\'t be empty'
    },
    custom:{
        options:async(value)=>{
            const company = await User.findOne({companyname:value})
            if(company){
                throw new Error('Company name already exists')
            }
            else{
                return true
            }
        }
    }
}

const gstSchema = {
    notEmpty:{
        errorMessage:'GST cannot be empty'
    }
}

const contactEmail = {
    notEmpty:{
        errorMessage:'Company Email can\'t be empty'
    },
    isEmail:{
        errorMessage:'Enter a valid email...'
    }
}

const contact = {
    notEmpty:{
        errorMessage:'Company contact number can\'t be empty'
    },
    isLength:{
        options: {min:10,max:10},
        errorMessage:'Mobile number should be length of 10 values'
    }
}

const contactAddress = {
    notEmpty:{
        errorMessage:'Company address can\'t be empty'
    }
}

const userRegisterSchema = {
    username:nameSchema,
    email: emailSchema,
    password: passwordSchema
}

const loginValidationSchema = {
    email:{
        notEmpty:{
            errorMessage:'Email cannot be empty'
        },
        isEmail:{
            errorMessage:'Email is not valid'
        }
    },
    password:passwordSchema
}

const companyRegisterSchema = {
    username:nameSchema,
    email: emailSchema,
    password: passwordSchema,
    companyname:companynameSchema,
    GST:gstSchema,
    'contactdetails.address':contactAddress,
    'contactdetails.email':contactEmail,
    'contactdetails.phone':contact
}

module.exports = {
    userRegisterSchema,
    companyRegisterSchema,
    loginValidationSchema
}
const enquirySchema = {
    notEmpty:{
        errorMessage:'Enquiry shouldn\'t be empty'
    },
    isMongoId:{
        errorMessage:'Valid mongo id should be given'
    }
}

const priceSchema = {
    notEmpty:{
        errorMessage:'price can\'t be empty'
    },
    isNumeric:{
        errorMessage:'Price should be given in numbers'
    }
}

const expiryValidationSchema = {
    isDate:{
        errorMessage:'Date should be in valid format',
        format: 'YYYY-MM-DD'
    },
    custom:{
        options:(value)=>{
            const today = new Date()
            const year = today.getFullYear(),month = today.getMonth()+1,day = today.getDate()
            if(new Date(value)< new Date(`${year}-${month}-${day}`)){
                throw new Error('created date cannot be less than today')
            } else{
                return true
            }
        }
    }
}

const deliverySchema = {
    notEmpty:{
        errorMessage:'Delivery duration should not be empty'
    }
}

const pdfSchema = {
    notEmpty:{
        errorMessage:'PDF url cannot be empty'
    }
}

const quotationValidationSchema = {
    enquiry:enquirySchema,
    unitPrice:priceSchema,
    totalCost: priceSchema,
    quotationExpiry: expiryValidationSchema,
    'termsandconditions.delivery':deliverySchema,
    pdf:pdfSchema
}

module.exports = quotationValidationSchema
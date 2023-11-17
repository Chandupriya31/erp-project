const paymenttypeSchema = {
    notEmpty:{
        errorMessage:'Payment type should not be empty'
    }
}

const transactionSchema = {
    notEmpty:{
        errorMessage:'Transaction Id should be given'
    }
}

const amountSchema = {
    notEmpty:{
        errorMessage:'Amount should not be empty'
    }
}

const quotationSchema = {
    notEmpty:{
        errorMessage:'Quotation shouldn\'t be empty'
    },
    isMongoId:{
        errorMessage:'Quotation Id should be valid'
    }
}

const customerSchema = {
    notEmpty:{
        errorMessage:'Quotation shouldn\'t be empty'
    },
    isMongoId:{
        errorMessage:'Quotation Id should be valid'
    }
}

const paymentValidation = {
    type:paymenttypeSchema,
    transactionId:transactionSchema,
    amount: amountSchema,
    quotationId:quotationSchema,
    customer:customerSchema
}
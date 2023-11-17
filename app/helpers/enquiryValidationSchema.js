const productSchema = {
    notEmpty:{
        errorMessage: 'Product shouldn\'t be empty'
    },
    isMongoId: {
        errorMessage:'Valid mongo id should be given'
    }
}

const quantitySchema = {
    notEmpty:{
        errorMessage: 'Quantity shouldn\'t be empty'
    },
    isNumeric:{
        errorMessage:'Quantity should be numeric'
    }
}

const enquiryValidationSchema = {
    productId:productSchema,
    quantity:quantitySchema
}

module.exports = enquiryValidationSchema
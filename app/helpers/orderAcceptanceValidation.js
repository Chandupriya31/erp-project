const orderValidation = {
   quotationId: {
      notEmpty: {
         errorMessage: 'quotation should be required'
      },
      isMongoId:{
         errorMessage: 'Quotation Id should be valid'
      }
   }
}

module.exports = orderValidation
const orderValidation = {
   quotationId: {
      notEmpty: {
         errorMessage: 'quotation should be required'
      },
   }
}

module.exports = orderValidation
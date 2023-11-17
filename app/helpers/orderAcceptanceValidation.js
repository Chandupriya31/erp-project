const orderValidation = {
   quotationId: {
      notEmpty: {
         errorMessage: 'quotation should be required'
      },
      isMongoId: {
         errorMessage: 'Quotation Id should be valid'
      }
   },
   paymentStatus: {
      notEmpty: {
         errorMessage: 'payment status shouldnot be empty'
      }
   },
   quality: {
      notEmpty: {
         errorMessage: "provide quality status"
      }
   },
   orderAcceptance: {
      notEmpty: {
         errorMessage: 'order status required'
      }
   },
   delivery: {
      notEmpty: {
         errorMessage: "delivery should not be empty"
      }
   },
   deliveryDate: {
      isDate: {
         errorMessage: 'Date should be in valid format',
         format: 'YYYY-MM-DD'
      }
   },

   'process.statusofProduct': {
      notEmpty: {
         errorMessage: 'process status required'
      }
   },
   'process.description': {
      notEmpty: {
         errorMessage: 'description required'
      }
   },
   'process.userId': {
      isMongoId: {
         errorMessage: 'enter valid id'
      }
   }

}

module.exports = orderValidation
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
      },
      custom: {
         options: (value) => {
            const today = new Date()
            const year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate()
            if (new Date(value) < new Date(`${year}-${month}-${day}`)) {
               throw new Error('created date cannot be less than today')
            } else {
               return true
            }
         }
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
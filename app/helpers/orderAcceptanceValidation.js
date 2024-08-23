const orderValidation = {
   quotation_id: {
      notEmpty: {
         errorMessage: 'quotation should be required'
      },
      isMongoId: {
         errorMessage: 'Quotation Id should be valid'
      }
   },
   delivery_date: {
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

   status_of_product: {
      notEmpty: {
         errorMessage: 'process status required'
      }
   },
   // 'process.description': {
   //    notEmpty: {
   //       errorMessage: 'description required'
   //    }
   // }
   // 'process.user_id': {
   //    isMongoId: {
   //       errorMessage: 'enter valid id'
   //    }
   // }

}

module.exports = orderValidation
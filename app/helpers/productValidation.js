const { isEmpty } = require("lodash");

const productValidation = {
   productname: {
      notEmpty: {
         errorMessage: 'productname required'
      },
      isLength: {
         options: { min: 4 },
         errorMessage: 'minimum 4 characters required for product name..'
      }
   },
   description: {
      notEmpty: {
         errorMessage: 'description should not be empty'
      }
   },
   perUnitCost: {
      isNumeric: {
         errorMessage: 'enter number'
      },
      notEmpty: {
         errorMessage: 'enter cost of product'
      }
   },
   category_id: {
      isMongoId: {
         errorMessage: 'should be a valid mongodb id'
      }
   },
   image: {
      custom: {
         options: (value, { req }) => {
            if (isEmpty(req.files)) {
               throw new Error('image file is required');
            }
            return true;
         }
      }
   },
   product_warranty: {
      notEmpty: {
         errorMessage: 'product warrenty required'
      }
   },
   payment_terms: {
      notEmpty: {
         errorMessage: 'mention payment terms'
      }
   }
}
module.exports = productValidation
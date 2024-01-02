const linkSchema = require('../helpers/yupSchema');

const validate = async (req, res, next) => {
   try {
      await linkSchema.validate(req.body, { abortEarly: false }); // Collect all validation errors
      return next();
   } catch (err) {
      if (err.name === 'ValidationError') {
         const errors = {};

         // Loop through the Yup errors and associate them with specific fields
         err.inner.forEach(error => {
            if (!errors[error.path]) {
               errors[error.path] = [];
            }
            errors[error.path].push(error.message);
         });

         console.log(errors); // Log errors for debugging

         return res.status(400).json({ errors }); // Return errors associated with specific fields
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
   }
};

module.exports = validate;
